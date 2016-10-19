class EmailMessagesController < ApplicationController
  before_action :authenticate_user!
  def create
    @name_avail = { joshua: 'tantohyung@gmail.com' }
    email_fields = prepare_email_fields(email_params[:content])

    status = validate_email_fields(email_fields)
    if status == 200
      current_user.email_messages.create(email_fields)
      render json: { status: status, name: email_fields[:receipient], subject: email_fields[:subject], content: email_fields[:content] }
    else
      render json: { status: status }
    end
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

  def validate_email_fields(email_fields)
    return 500 if email_fields[:subject].nil? || email_fields[:content].nil?
    return 404 if email_fields[:receipient].nil?

    200
  end
end
