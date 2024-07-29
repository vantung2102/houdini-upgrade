# License: AGPL-3.0-or-later WITH Web-Template-Output-Additional-Permission-3.0-or-later
require 'rails_helper'
require 'controllers/support/shared_user_context'

describe BillingSubscriptionsController, :type => :controller do
  describe 'authorization' do
    include_context :shared_user_context
    describe 'create_trial' do
        include_context :open_to_np_admin, :post, :create_trial, nonprofit_id: :__our_np
    end

    describe 'create' do
        include_context :open_to_np_admin, :post, :create, nonprofit_id: :__our_np
    end

    describe 'cancel' do
        include_context :open_to_np_admin, :post, :cancel, nonprofit_id: :__our_np
    end

    describe 'cancellation' do
        include_context :open_to_np_admin, :get, :cancellation, nonprofit_id: :__our_np
    end
  end
end