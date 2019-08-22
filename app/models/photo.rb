class Photo < ApplicationRecord
  has_one_attached :image
  belongs_to :user

  def url 
    image_path = Rails.application.routes.url_helpers.rails_blob_path(self.image, only_path: true) 
    "http://localhost:3000#{image_path}" 
  end
end
