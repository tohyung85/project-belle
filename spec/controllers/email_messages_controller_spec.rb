require 'rails_helper'

RSpec.describe EmailMessagesController, type: :controller do
  let(:user) { FactoryGirl.create(:user) }
  describe '#create' do
    render_views
    context 'user signed_in' do
      before do
        sign_in user
      end
      it 'should allow user to create email' do
        expect do
          post :create, email_message: {
            receipient: 'tantohyung@gmail.com',
            subject: 'hello',
            content: 'testing 123'
          }
        end.to change { EmailMessage.count }.by 1

        expect(response).to redirect_to root_path
      end
    end

    context 'user not signed in' do
      it 'should redirect user to sign in' do
        expect do
          post :create, email_message: {
            receipient: 'tantohyung@gmail.com',
            subject: 'hello',
            content: 'testing 123'
          }
        end.not_to change { EmailMessage.count }

        expect(response).to redirect_to new_user_session_path
      end
    end
  end
end
