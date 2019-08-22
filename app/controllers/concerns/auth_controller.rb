class AuthController < ApplicationController
    def login
    end
  
  
    def logout
        session.clear
        redirect_to login_path
    end

private
    def auth_params
        params.permit(:username, :password)
    end
  end