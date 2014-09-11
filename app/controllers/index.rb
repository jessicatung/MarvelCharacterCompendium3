require 'httparty'
require 'json'
require 'digest/md5'

get '/' do 

  erb :index
end

get '/characters' do
  p "* " *50
	p params["char_name"]
  p "* " *50

  # URL encode so that user can use spaces when input character name
  character_name = CGI::escape(params["char_name"])

 	ts = "1079438"
	priv_key = "3b499f11f821c489a4ad0f543337f8f25ac131bd"
	pub_key = "729621b524d6eaef34c62cd78d76dccc"
	md5hash = Digest::MD5.hexdigest(ts + priv_key + pub_key)
	route = "http://gateway.marvel.com/v1/public/characters?nameStartsWith=#{character_name}&ts=#{ts}&apikey=#{pub_key}&hash=#{md5hash}"
  @marvel_response = HTTParty.get(route)
  marvel_json = @marvel_response
  
# Name parse
  name = marvel_json.parsed_response["data"]["results"][0]["name"]
 
# Thumbnail parse
  thumbnail_link = marvel_json.parsed_response["data"]["results"][0]["thumbnail"]["path"]

# Description parse
  description = marvel_json.parsed_response["data"]["results"][0]["description"]
  # p description

# Series parse

    # p marvel_json.parsed_response["data"]["results"][0]["series"]["items"][0]["name"]

# Gets total num of series character appears in.
  series_avail = marvel_json.parsed_response["data"]["results"][0]["series"]["available"]
  # p series_avail

  series = []

# if char appears in 11+ series, return sample of 10 random series
  if series_avail > 10
    until series.length >= 10 do
      series_item = marvel_json.parsed_response["data"]["results"][0]["series"]["items"].sample["name"]
      unless series.include?(series_item)
        series << series_item
      end
    end
# otherwise, just return the < 10 series char appears in. prevents infinite loop!
  else
    series_avail.times do |i|
      series_item = marvel_json.parsed_response["data"]["results"][0]["series"]["items"][i]["name"]
      series << series_item
    end
  end

  content_type :json
  {name: name, thumbnail: thumbnail_link, description: description, series_num: series_avail.to_s, series: series}.to_json

end

