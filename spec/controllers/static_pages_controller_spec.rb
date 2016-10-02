require 'rails_helper'

RSpec.describe StaticPagesController, type: :controller do
  describe '#landing' do
    context 'user accesses page' do
      render_views
      it 'should return success' do
        get :landing
        expect(response).to have_http_status(:success)
      end
    end
  end
end
