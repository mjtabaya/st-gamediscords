Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :games do
        resources :discords
      end
    end
  end
end
