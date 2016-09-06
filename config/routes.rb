Rails.application.routes.draw do
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
    member do
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
