Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '', to: 'site#index'
  get '/new', to: 'site#index'
  get '/:id/edit', to: 'site#index'

  namespace :api do
    namespace :v1 do
      delete '/todos/destroy_all', to: 'todos#destroy_all'
      resources :todos, only: %i[index show create update destroy]
    end
  end
end
