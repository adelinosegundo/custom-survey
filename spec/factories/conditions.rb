FactoryGirl.define do
  factory :condition do
    reference_type "MyString"
    reference "MyString"
    comparator "MyString"
    value "MyString"
    conditionable_id 1
    conditionable_type "MyString"
  end
end
