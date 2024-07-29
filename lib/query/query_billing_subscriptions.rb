# License: AGPL-3.0-or-later WITH Web-Template-Output-Additional-Permission-3.0-or-later
require 'qx'
require 'active_support/core_ext'

module QueryBillingSubscriptions

  def self.days_left_in_trial(np_id)
    sub = Qx.fetch(:billing_subscriptions, {nonprofit_id: np_id}).last
    return 0 if sub.nil?
    return sub['status'] == 'trialing' ? (((sub['created_at'] + 10.days) - Time.current) / 86400).floor : 0
  end

  def self.plan_tier(np_id)
    sub = Qx.fetch(:billing_subscriptions, {nonprofit_id: np_id}).last
    return 2 if sub && sub['status'] != 'inactive'
    return 0
  end

  def self.currently_in_trial?(np_id)
    sub = Qx.fetch(:billing_subscriptions, {nonprofit_id: np_id}).last
    return sub && sub['status'] == 'trialing'
  end
end

