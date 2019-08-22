require 'base64'
require 'stringio'

class PhotosController < ApplicationController
    def create
        type = photo_params[:image][/data:image\/(.*);/, 1]
        base64_image = photo_params[:image].sub(/^data:.*,/, '')
        decoded_image = Base64.decode64(base64_image)
        image = {io: StringIO.new(decoded_image), filename: "#{photo_params[:user_id]}-#{Time.current.to_i.to_s}.#{type}"}

        @photo = Photo.new(user_id: photo_params[:user_id])
        @photo.image.attach(image);
        if @photo.save
          render json: @photo 
        else
          render json: @photo.errors, status: :unprocessable_entity
        end
    end

    private
    def photo_params
        params.require(:photo).permit(:user_id, :image)
    end
    

end
