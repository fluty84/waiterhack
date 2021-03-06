import axios from "axios";

class RestaurantService {
  constructor() {
    this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5005/api'
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  getRestaurant = (user) => {
    return this.api.get(`/restaurant/${user._id}`);
  };

  saveRestaurant = (restaurant) => {
    return this.api.post("/create", restaurant);
  };

  createTable = () => {
    return this.api.post("/create-table");
  };

  acceptOrder = (id) => {
    return this.api.post("/accept-order", id);
  };

  cancelOrder = (id) => {
    return this.api.post("/delete-order", id);
  };

  checkTable = (tableId) => {
    return this.api.get(`/table/${tableId}`);
  };

  editFinalOrder = (order) => {
    return this.api.post('/update-total', order)
  }

  deleteTable = (tableId) => {
    return this.api.post('/delete-table', {tableId})
  }

  verify(token) {
    return this.api.get("/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

const restaurantService = new RestaurantService();

export default restaurantService;
