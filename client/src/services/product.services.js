import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"


class ProductService {

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


    saveProduct = product => {
        return this.api.post('/create-product', product)
    }

    getAll = () => {

        const { user } = useContext(AuthContext)

        return this.api.post('/restaurant/:id', user)
    }

    verify(token) {
        return this.api.get('/verify', { headers: { Authorization: `Bearer ${token}` } })
    }
}

const productService = new ProductService()

export default productService