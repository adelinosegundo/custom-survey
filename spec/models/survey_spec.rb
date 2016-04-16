require 'rails_helper'

RSpec.describe Survey, type: :model do
  it { should have_many(:items) }
  it { should have_many(:mail_messages) }

  it { should validate_presence_of :name }
  it { should validate_presence_of :title }
end
