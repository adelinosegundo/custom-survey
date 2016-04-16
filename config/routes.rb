Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  get 'data_mining/index'
  get 'data_mining/mine_users'
  get 'data_mining/destroy_all'

  root to: 'forms#index'

  resources :forms do 
    collection do
      get 'new_reply'
    end
    member do
      patch 'create_reply'
    end
    resources :mail_messages do
      member do
        get 'answers_as'
        post 'deliver'
      end
    end      
  end
end
