class UsersController < ApplicationController
    def index
        user = User.all
        render json: user.to_json(except: [:created_at, :updated_at],:include => {:photos => {:only => :url}})
    end
    
    def create
        user = User.new(name:params[:user][:name], photos:[])
        if user.save
          session[:user_id] = user.id
          render 
        else
          flash[:message] = user.errors.full_messages.first
          redirect_to register_path
        end
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
        params.require(:user).permit(:name)
    end
end
