class AddDonationIdIndexToCampaignGifts < ActiveRecord::Migration
  def change
    add_index :campaign_gifts, :donation_id
  end
end
