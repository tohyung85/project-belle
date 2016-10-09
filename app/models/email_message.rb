class EmailMessage < ActiveRecord::Base
  belongs_to :user
  after_create :send_email

  private
  
  def send_email
    MessageMailer.email_receipient(id).deliver
  end
end
