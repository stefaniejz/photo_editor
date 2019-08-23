class UsersController < ApplicationController
    def index
        user = User.all
        render json: user.to_json(except: [:created_at, :updated_at],:include => {:photos => {:only => :url}})
    end
    
    def create
        user = User.create_or_find_by(user_params)
        render json: user.to_json(except: [:created_at, :updated_at],:include => {:photos => {:only => :url}})
    end

    def show  
        user = User.find_by(id: params[:id])
        render json: user.to_json(except: [:created_at, :updated_at],:include => {:photos => {:only => :url}})
    end

    def login
        
        user = User.find_by(user_params)
        render json: user.to_json(except: [:created_at, :updated_at])

    end

    private
    def user_params
        params.require(:user).permit(:name,:photos)
    end
end
