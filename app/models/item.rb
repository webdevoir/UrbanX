# == Schema Information
#
# Table name: items
#
#  id          :bigint(8)        not null, primary key
#  category    :string
#  condition   :string
#  date_posted :datetime
#  description :text
#  name        :string
#  picture     :string
#  quantity    :integer
#  status      :string
#  value       :float
#  user_id     :integer
#

class Item < ApplicationRecord
  validates :name, :category, :quantity, :condition, presence: true
  validates :quantity, numericality: { only_integer: true }

  belongs_to :user, class_name: :User, foreign_key: :user_id
  has_many :item_reviews, dependent: :destroy
  has_many :transactions

  has_many_attached :images
  validate :image_type


  def thumbnail input
  		return self.images[input].variant(resize: '300x300!').processed
  end 


  private 
  def image_type
    if images.attached?
      images.each do |image|
        if !image.content_type.in?(%('image/jpeg image/png image/jpg'))
          errors.add(:images, 'needs to be JPEG/JPG/PNG')

        elsif image.blob.byte_size > 1000000
          errors.add(:images, 'file size too big')
		    end


      end
    end
  end
end
