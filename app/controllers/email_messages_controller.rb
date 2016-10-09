class EmailMessagesController < ApplicationController
  def create
    current_user.email_messages.create(email_params)
    redirect_to root_path
  end

  private
  def email_params
    params.require(:email_message).permit(:receipient, :subject, :content)
  end
end
