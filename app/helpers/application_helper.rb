module ApplicationHelper
  def translate_tags user_data, text, reply_link=nil
    tags = text.scan(/&lt;&lt;(.*?)&gt;&gt;/imu).flatten
    # tags = text.scan(/<<(.*?)>>/).flatten
    tags.each do |tag|
      tag = tag.strip
      text = text.sub(/&lt;&lt;#{tag}&gt;&gt;/, user_data[tag])
      # text["<<#{tag}>>"] = user_data[tag]
    end
    # text = text.sub(/reply_link/, reply_link) if reply_link
    text
  end
end
