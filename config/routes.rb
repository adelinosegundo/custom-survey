Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  devise_for :users, :skip => [:registrations]

  mount Ckeditor::Engine => '/ckeditor'

  devise_scope :user do
    unauthenticated do
      root to: "devise/sessions#new"
    end
    authenticated do
      root to: 'surveys#index', as: :authenticated_home
    end
  end

  resources :users, except: [:show] do
    collection do
      get 'invite'
      post 'invite'
    end
  end
  resources :surveys, except: :show do
    collection do
      get 'confirm'
    end
    member do
      get 'invite'
      post 'invite'
      get 'results'
      get 'edit_questions'
      patch 'update_questions'

      resources :deliveries, as: :survey_deliveries, path: :deliver, controller: "surveys/deliveries", only: [:index] do
        collection do
          post :perform
          post :update, as: :update, path: :update
        end
      end
    end
  end

  get ':link_hash', to: 'surveys#new_reply', as: 'new_reply_survey'
  patch ':link_hash', to: 'surveys#create_reply', as: 'create_reply_survey'
end
