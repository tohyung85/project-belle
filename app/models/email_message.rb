class EmailMessage < ActiveRecord::Base
  belongs_to :user

  def send_email
    MessageMailer.email_receipient(id).deliver
  end
end
