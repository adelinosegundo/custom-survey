Rails.application.routes.draw do
  devise_for :users
  mount Ckeditor::Engine => '/ckeditor'

  get 'data_mining/index'
  get 'data_mining/mine_users'
  get 'data_mining/destroy_all'

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
      get 'new_reply'
    end
    member do
      patch 'create_reply'
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
