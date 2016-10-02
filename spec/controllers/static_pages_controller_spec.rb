require 'rails_helper'

RSpec.describe StaticPagesController, type: :controller do
  describe '#landing' do
    context 'user accesses page' do
      it 'should return success' do
        expect(response).to have_http_status(:success)
      end
    end
  end
end
