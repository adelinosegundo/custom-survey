module ApplicationHelper
  def translate_tags user_data, text
    tags = text.scan(/&lt;&lt;([^<>]*)&gt;&gt;/imu).flatten
    # tags = text.scan(/<<([^<>]*)>>/).flatten
    tag_data = ""
    tags.each do |tag|
      tag_data = tag.split(".")
      text["&lt;&lt;#{tag}&gt;&gt;"] = user_data[tag]
      # text["<<#{tag}>>"] = user_data[tag]
    end
    text
  end
end
