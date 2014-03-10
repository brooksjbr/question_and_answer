source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.0'

# Use sqlite3 as the database for Active Record
#gem 'sqlite3'

# Use postgre
gem 'pg'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Question and Answer Engine
gem 'questionable', '0.0.7', git: "https://github.com/brooksjbr/questionable"

# Gem dependency for questionable, can't add to gemspec for inclusion.
# Updated act_as_seo_friendly gem for rails 4 add-seo-friendly-urls
gem 'acts_as_seo_friendly', :git => 'https://github.com/brooksjbr/acts_as_seo_friendly'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
	gem 'sdoc', require: false
end

# To compile and deliver mustache template via js
gem 'handlebars_assets'

# Twitter bootstrap
gem "therubyracer"
gem "less-rails"
gem 'twitter-bootstrap-rails'

# Use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
group :development, :test do
	gem 'debugger'
	gem 'bullet'
end

group :test do
	gem "rspec-rails"
	gem "capybara"
end

group :production do
	gem 'rails_serve_static_assets'
end

