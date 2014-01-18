# initialize classes, open classes, monkey patches from lib dir...
Dir[Rails.root + 'lib/**/*.rb'].each do |file|
  require file
end