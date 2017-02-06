Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
  
  devise_for :users
  mount Ckeditor::Engine => '/ckeditor'

  devise_scope :user do
    unauthenticated do
      root to: "devise/sessions#new"
    end
    authenticated do
      root to: 'surveys#index', as: :authenticated_home
    end
  end



  resources :surveys do
    collection do
      get 'confirm'
    end
    member do
      get 'edit_questions'
      patch 'update_questions'
      get 'new_reply/:link_hash', to: 'surveys#new_reply', as: 'new_reply'
      patch 'create_reply/:link_hash', to: 'surveys#create_reply', as: 'create_reply'
    end
    resources :mail_messages do
      member do
        get 'recipients'
        get 'answers_as'
        post 'deliver'
      end
    end
  end
end
