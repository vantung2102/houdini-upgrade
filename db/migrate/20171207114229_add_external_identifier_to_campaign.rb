# License: AGPL-3.0-or-later WITH Web-Template-Output-Additional-Permission-3.0-or-later
class AddExternalIdentifierToCampaign < ActiveRecord::Migration
  def change
    add_column :campaigns, :external_identifier, :string
  end
end
