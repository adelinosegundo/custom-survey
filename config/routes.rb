Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
  
  devise_for :users, :skip => [:registrations] 
  as :user do
    get 'users/edit' => 'devise/registrations#edit', :as => 'edit_user_registration'
    put 'users' => 'devise/registrations#update', :as => 'user_registration'
  end
  mount Ckeditor::Engine => '/ckeditor'

  devise_scope :user do
    unauthenticated do
      root to: "devise/sessions#new"
    end
    authenticated do
      root to: 'surveys#index', as: :authenticated_home
    end
  end


  get ':link_hash', to: 'surveys#new_reply', as: 'new_reply_survey'
  patch ':link_hash', to: 'surveys#create_reply', as: 'create_reply_survey'

  resources :surveys do
    collection do
      get 'confirm'
    end
    member do
      get 'edit_questions'
      patch 'update_questions'
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
