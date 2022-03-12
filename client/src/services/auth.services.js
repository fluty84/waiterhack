import axios from "axios"

class AuthService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5005/api'
        })

            this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {

                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
            
            })
    }

   verify(token) {
        return this.api.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
    }
    
    login = user => {
        return this.api.post('/auth/loginRestaurant', user)
    }


    tableLogin(costumerData, tableId) {

        const {password, customer} = costumerData

        return this.api.post(`/auth/new-customer/${tableId}`, {password, customer})
    }


  
}

const authService = new AuthService()

export default authService