
const clientId = 'Fn3yNj9x3TeI8mbR1H6pUvwrYkGeo6tJIjKhjHhK81Y7O6QfhZ'
const clientSecret = 'MuCuL3EIUZR6XvplrjDW6VKQd8bYO9owxnP8RZX0'

export default async (req, res) => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials")
  params.append("client_id", clientId)
  params.append("client_secret", clientSecret)
  const petFinderRes = await fetch(
    'https://api.petfinder.com/v2/oauth2/token',
    {
      method: 'POST',
      body: params
    }
  );
  const data = await petFinderRes.json()
  res.send(data)
}