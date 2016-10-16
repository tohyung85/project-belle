class EmailMessagesController < ApplicationController
  before_action :authenticate_user!
  def create
    @name_avail = { joshua: 'tantohyung@gmail.com' }
    email_fields = prepare_email_fields(email_params[:content])
    current_user.email_messages.create(email_fields)
    render json: { status: 'success', name: email_fields[:receipient], subject: email_fields[:subject], content: email_fields[:content] }
  end

  private

  def email_params
    params.require(:email_message).permit(:content)
  end

  def prepare_email_fields(content_string)
    email_fields = {}
    contents_arr = content_string.split('content')
    email_fields[:receipient] = @name_avail[contents_arr[0].split('subject')[0].parameterize.to_sym]
    email_fields[:subject] = contents_arr[0].split('subject')[1]
    email_fields[:content] = contents_arr[1]

    email_fields
  end
end
