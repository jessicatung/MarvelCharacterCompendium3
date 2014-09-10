require 'httparty'
require 'json'
require 'digest/md5'

get '/' do # experiment
	# ts = "1079438"
	# priv_key = "3b499f11f821c489a4ad0f543337f8f25ac131bd"
	# pub_key = "729621b524d6eaef34c62cd78d76dccc"
	# md5hash = Digest::MD5.hexdigest(ts + priv_key + pub_key)
	# route = "http://gateway.marvel.com/v1/public/characters?&limit=1&ts=#{ts}&apikey=#{pub_key}&hash=#{md5hash}"
 #  @marvel_response = HTTParty.get(route)
 #  p @marvel_response
  erb :index
end

get '/characters' do
  p "* " *50
	p params["char_id"]
  p "* " *50
  # now want to do httparty to hit api end point, can either send json obj to js land
  # and append via jquery. OR can parse here and send to erb.
end

