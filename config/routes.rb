Rails.application.routes.draw do
  devise_for :users
  mount Ckeditor::Engine => '/ckeditor'

  get 'data_mining/index'
  get 'data_mining/mine_users'
  get 'data_mining/destroy_all'

  root to: 'surveys#index'

  resources :surveys do
    collection do
      get 'new_reply'
    end
    member do
      patch 'create_reply'
    end
  end
  resources :mail_messages do
    member do
      get 'recipients'
      get 'answers_as'
      post 'deliver'
    end
  end
end
