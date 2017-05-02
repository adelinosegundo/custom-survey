require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
# require 'mina/rbenv'
require 'mina_sidekiq/tasks'
require 'mina/unicorn'
require 'mina/rvm'
require 'mina/data_sync'

deploy_to = '/home/rails/application'

set :domain, '104.236.97.231'
set :deploy_to, '/home/rails/application'
set :repository, 'git@github.com:adelinosegundo/custom-survey.git'
set :branch, 'master'
set :user, 'root'
set :forward_agent, true
set :port, '22'
set :unicorn_pid, "#{deploy_to}/shared/pids/unicorn.pid"

set :shared_dirs, fetch(:shared_dirs, []).push('pids', 'log', 'public/uploads', 'sockets')
set :shared_files, fetch(:shared_files, []).push('config/database.yml', 'config/secrets.yml', 'config/application.yml')


set :rvm_use_path, "/usr/local/rvm/scripts/rvm"

task :environment do
  invoke :'rvm:use', '2.2.4'
end

task console: :environment do
  set :execution_mode, :exec
  in_path fetch(:current_path).to_s do
    command %{#{fetch(:rails)} console}
  end
end


task :setup do
  command %{mkdir -p "#{deploy_to}/shared/log"}
  command %{chmod g+rx,u+rwx "#{deploy_to}/shared/log"}

  command %{mkdir -p "#{deploy_to}/shared/public/uploads"}
  command %{chmod g+rx,u+rwx "#{deploy_to}/shared/public/uploads"}

  command %{mkdir -p "#{deploy_to}/shared/config"}
  command %{chmod g+rx,u+rwx "#{deploy_to}/shared/config"}

  command %{mkdir -p "#{deploy_to}/shared/sockets"}
  command %{chmod g+rx,u+rwx "#{deploy_to}/shared/sockets"}

  command %{mkdir -p "#{deploy_to}/shared/pids/"}
  command %{chmod g+rx,u+rwx "#{deploy_to}/shared/pids"}

  command %{touch "#{deploy_to}/shared/config/database.yml"}
  command %{touch "#{deploy_to}/shared/config/secrets.yml"}
  command %{touch "#{deploy_to}/shared/config/application.yml"}
end

desc "Deploys the current version to the server."
task :deploy do
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:db_migrate'
    invoke :'rails:assets_precompile'
    invoke :'deploy:cleanup'

    on :launch do
      in_path(fetch(:current_path)) do
        invoke :'sidekiq:restart'
        invoke :'unicorn:restart'
      end
    end
  end
end
