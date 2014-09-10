require 'httparty'
require 'json'
require 'digest/md5'

get '/' do
	ts = "1079438"
	priv_key = "3b499f11f821c489a4ad0f543337f8f25ac131bd"
	pub_key = "729621b524d6eaef34c62cd78d76dccc"
	md5hash = Digest::MD5.hexdigest(ts + priv_key + pub_key)
	p md5hash
	# route = "http://gateway.marvel.com/v1/characters/1011334?ts=#{ts}&apikey=#{pub_key}&hash=#{md5hash}"
	route = "http://gateway.marvel.com/v1/public/characters/1011334?ts=1079438&apikey=729621b524d6eaef34c62cd78d76dccc&hash=fb7d878efc72203153b22f30942cb305"
	p "* " * 50
	p route
	p "* " * 50
  @marvel_response = HTTParty.get(route)
  p @marvel_response
  erb :index
end

