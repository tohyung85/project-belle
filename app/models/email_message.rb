class EmailMessage < ActiveRecord::Base
  belongs_to :user
  after_create :send_email

  private

  def send_email
    MessageMailer.delay.email_receipient(id)
  end
end
