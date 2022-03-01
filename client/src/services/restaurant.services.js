import axios from "axios"

class RestaurantService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5005/api'
        })
    }

    sayHi = () => {
        console.log('hi')
    }

    saveRestaurant = restaurant => {
        return this.api.post('/create', restaurant)
    }
}

const restaurantService = new RestaurantService()

export default restaurantService