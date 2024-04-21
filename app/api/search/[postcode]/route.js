class RestaurantClient {
  constructor (baseURL) {
    this.baseURL = baseURL
  }

  async getRestaurants (postcode) {
    console.log(postcode)
    try {
      const response = await fetch(`${this.baseURL}/discovery/uk/restaurants/enriched/bypostcode/${postcode}`)
      return await response.json()
    } catch (error) {
      console.log('GET request failed')
    }
  }
}

const restaurantClient = new RestaurantClient('https://uk.api.just-eat.io')

// export default async function GET(req, {params}) {
//
// }
export async function GET (request, { params }) {
  const data = await restaurantClient.getRestaurants(params.postcode)
  return new Response(JSON.stringify(data), { status: 200 })
}
