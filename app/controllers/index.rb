require 'httparty'
require 'json'
require 'digest/md5'

get '/' do # experiment
	# ts = "1079438"
	# priv_key = "3b499f11f821c489a4ad0f543337f8f25ac131bd"
	# pub_key = "729621b524d6eaef34c62cd78d76dccc"
	# md5hash = Digest::MD5.hexdigest(ts + priv_key + pub_key)
	# route = "http://gateway.marvel.com/v1/public/characters?&limit=1&ts=#{ts}&apikey=#{pub_key}&hash=#{md5hash}"
	#  HARD CODED: http://gateway.marvel.com/v1/public/characters/1011334?ts=1079438&apikey=729621b524d6eaef34c62cd78d76dccc&hash=fb7d878efc72203153b22f30942cb305
 #  @marvel_response = HTTParty.get(route)
 #  p @marvel_response
  erb :index
end

get '/characters' do
  p "* " *50
	p params["char_name"]
  p "* " *50

  character_name = params["char_name"]
  # now want to do httparty to hit api end point, can either send json obj to js land
  # and append via jquery. OR can parse here and send to erb.

 	ts = "1079438"
	priv_key = "3b499f11f821c489a4ad0f543337f8f25ac131bd"
	pub_key = "729621b524d6eaef34c62cd78d76dccc"
	md5hash = Digest::MD5.hexdigest(ts + priv_key + pub_key)
	# route = "http://gateway.marvel.com/v1/public/characters/#{character_id}?&limit=1&ts=#{ts}&apikey=#{pub_key}&hash=#{md5hash}"
	route = "http://gateway.marvel.com/v1/public/characters?name=#{character_name}&ts=#{ts}&apikey=#{pub_key}&hash=#{md5hash}"
  @marvel_response = HTTParty.get(route)
  marvel_json = @marvel_response
  marvel_json.parsed_response.keys
  # p marvel_json.parsed_response["data"]["results"][0]["name"]
  p marvel_json.parsed_response["data"]["results"][0]["thumbnail"]["path"]

  # p marvel_json.parsed_response["data"]["results"]["series"]["items"][0]["name"]

end

