class MessageMailer < ActionMailer::Base
  default from: "tantohyung@gmail.com"

  def email_receipient(message_id)
    @email = EmailMessage.find(message_id)
    @sender = @email.user
    mail(to: @email.receipient, subject: @email.subject)
  end
end
