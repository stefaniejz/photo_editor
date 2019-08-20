class UsersController < ApplicationController
    def index
        user = User.all
        render json: user.to_json(except: [:created_at, :updated_at],:include => {:photos => {:only => :url}})
    end
end
