source 'https://rubygems.org'

ruby "2.2.4"

gem 'rails', '4.2.5'
gem 'dotenv-rails', :require => 'dotenv/rails-now'
gem 'active_record-acts_as'

gem 'pg', '~> 0.15'
gem 'unicorn'
gem 'sidekiq'
gem 'redis'
gem 'httparty'
gem "figaro"

gem 'devise'

gem 'carrierwave'
gem 'mini_magick'

gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'turbolinks'
gem 'jbuilder', '~> 2.0'
gem 'ckeditor', git: "https://github.com/galetahub/ckeditor.git"

gem "therubyracer"

gem "cocoon"
gem "slim"
gem "slim-rails", :require => false
gem 'jquery-datatables-rails'
gem 'ajax-datatables-rails'


group :development, :test do
  gem 'rspec-rails', '~> 3.0'
  gem 'factory_girl_rails'
  gem 'capybara'
  gem 'capybara-screenshot'
  gem 'launchy'
  gem 'database_cleaner'
end

group :test do
  gem 'shoulda-matchers', '~> 3.1'
end

group :development do
  gem 'web-console', '~> 2.0'
  gem 'spring'
  gem 'annotate'
  gem "letter_opener"
end

group :development, :test do
  gem 'jazz_hands', github: 'nixme/jazz_hands', branch: 'bring-your-own-debugger'
  gem 'pry-byebug'
end

group :production do
  gem 'unicorn'
  gem 'mina'
  gem 'mina-data_sync', :require => false
  gem 'mina-sidekiq', :require => false
  gem 'mina-unicorn', :require => false
end

gem 'sdoc', '~> 0.4.0', group: :doc
