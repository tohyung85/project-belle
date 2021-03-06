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
            content: 'Joshua subject test email content testing 123'
          }
        end.to change { EmailMessage.count }.by 1

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['status']).to eq 200
      end

      it 'should return a 404 status code if user not found' do
        expect do
          post :create, email_message: {
            content: 'Bumblebee subject testing content transformers'
          }
        end.not_to change { EmailMessage.count }

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['status']).to eq 404
      end

      it 'should return a 500 status code if missing key words or other errors' do
        expect do
          post :create, email_message: {
            content: 'Bumblebe testing content transformers'
          }
        end.not_to change { EmailMessage.count }

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['status']).to eq 500
      end
    end

    context 'user not signed in' do
      it 'should redirect user to sign in' do
        expect do
          post :create, email_message: {
            content: 'Joshua subject test email content testing 123'
          }
        end.not_to change { EmailMessage.count }

        expect(response).to redirect_to new_user_session_path
      end
    end
  end
end
