Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session
  namespace :api, defaults: {format: :json} do
    get 'bills/unseen_tagged_bills'
    resources :bills, except: [:new, :edit]
    resources :roommates, only: [:create, :update, :destroy]
    resources :follows, only: [:update, :destroy, :show]
  end
end
