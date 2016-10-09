class StaticPagesController < ApplicationController
  def landing
    @email = EmailMessage.new
  end
end
