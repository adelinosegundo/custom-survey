module PolicyHelper
  def authorize_namespace args
    unless controller_policy(args).send "#{action_name}?"
      raise Pundit::NotAuthorizedError, "Not authorized"
    end
  end

  def policy *args
    if args.length == 2
      (args[0].map { |x| x.to_s.camelize }.join("::")+"Policy").constantize.new pundit_user, args[1]
    else
      super args[0]
    end
  end

  def controller_policy args
    policy controller_policy_path, args
  end

  def controller_policy_path
    path_array = self.class.to_s.gsub('Controller', '').split('::')
    path_array.map.with_index do |path, index|
      unless (index+1) == path_array.length
        path.underscore.to_sym
      else
        path.singularize.underscore.to_sym
      end
    end
  end
end
