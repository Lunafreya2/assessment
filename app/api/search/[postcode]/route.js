class RestaurantClient {
  constructor (baseURL) {
    this.baseURL = baseURL
  }
  /**
   * Asynchronous function to fetch restaurant data based on a given postcode.
   * @param {string} postcode - The postcode to fetch restaurant data for.
   * @returns {Promise<Object>} A promise that resolves to the JSON response from the fetch request.
   *
   * The function first logs the provided postcode to the console.
   *
   * It then makes a fetch request to the `/discovery/uk/restaurants/enriched/bypostcode/${postcode}` endpoint of the base URL.
   *
   * If the fetch request is successful, the function returns a promise that resolves to the JSON response from the fetch request.
   *
   * If the fetch request fails, the function logs 'GET request failed' to the console and the promise is rejected.
   */
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

export async function GET (request, { params }) {
  const data = await restaurantClient.getRestaurants(params.postcode)
  return new Response(JSON.stringify(data), { status: 200 })
}
