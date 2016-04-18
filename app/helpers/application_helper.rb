module ApplicationHelper
  def translate_tags user, text
    user ||= GithubUser.new(name: "TestUser")
    tags = text.scan(/&lt;&lt;([^<>]*)&gt;&gt;/imu).flatten
    tag_data = ""
    tags.each do |tag|
      tag_data = tag.split(".")
      text["&lt;&lt;#{tag}&gt;&gt;"] = user.send(tag_data[0])
    end
    text
  end
end
