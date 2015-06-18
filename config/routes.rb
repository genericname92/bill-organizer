Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session
  namespace :api, defaults: {format: :json} do
    resources :bills, except: [:new, :edit] do
      post 'mail_to_people'
    end
    resources :roommates, only: [:create, :update, :destroy]
    resources :follows, only: [:update, :destroy, :show]
  end
end
