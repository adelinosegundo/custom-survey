workers Integer(ENV['WEB_CONCURRENCY'] || 1)
threads_count = Integer(ENV['MAX_THREADS'] || 20)
threads threads_count, threads_count

preload_app!

rackup      DefaultRackup
port        ENV['PORT']     || 3000
environment ENV['RACK_ENV'] || 'development'
puts 'A'
if ENV.fetch('SSL', nil) && ENV.fetch('RAILS_ENV', nil) == 'development'
puts 'A'
  ssl_bind '127.0.0.1', '3000',
        key: Rails.root.join('ssl', 'server.key'),
        cert: Rails.root.join('ssl', 'server.crt'),
        verify_mode: 'none'
end

on_worker_boot do
  # Worker specific setup for Rails 4.1+
  # See: https://devcenter.heroku.com/articles/deploying-rails-applications-with-the-puma-web-server#on-worker-boot
  ActiveRecord::Base.establish_connection
end
