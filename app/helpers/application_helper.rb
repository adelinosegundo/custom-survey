module ApplicationHelper
  def translate_tags user_data, text

    # Scan html tags
    tags = text.scan(/&lt;&lt;(.*?)&gt;&gt;/imu).flatten
    tags.each do |tag|
      tag_striped = tag.strip.gsub("&nbsp;", "")
      tag = escape_characters_in_string tag
      begin
        text = text.sub(/&lt;&lt;#{tag}&gt;&gt;/, user_data[tag_striped])
      rescue
        text = text.sub(/&lt;&lt;#{tag}&gt;&gt;/, "")
      end
    end

    # Scan ASCII tags
    tags = text.scan(/<<(.*?)>>/imu).flatten
    tags.each do |tag|
      tag_striped = tag.strip
      begin
        text["<<#{tag}>>"] = user_data[tag_striped]
      rescue
        text["<<#{tag}>>"] = ""
      end
    end


    text
  end

  def escape_characters_in_string string
    pattern = /(\'|\"|\.|\*|\/|\-|\\|\)|\$|\+|\(|\^|\?|\!|\~|\`)/
    string.gsub(pattern){|match|"\\"  + match}
  end

  def build_reply_link_for_recipient recipient
    "<a href='#{new_reply_survey_url(recipient.link_hash)}'>#{recipient.survey.title}</a>"
  end
end
