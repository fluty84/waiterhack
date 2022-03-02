import axios from "axios"

class RestaurantService {

    constructor() {
        this.api = axios.create({

            baseURL: 'http://localhost:5005/api'

        })

            this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config

            })
    }

    
    saveRestaurant = restaurant => {
        return this.api.post('/create', restaurant)
    }

    verify(token) {
        return this.api.get('/verify', { headers: { Authorization: `Bearer ${token}` } })
    }
}

const restaurantService = new RestaurantService()

export default restaurantService