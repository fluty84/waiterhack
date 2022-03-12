import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import restaurantService from "../../../services/restaurant.services"
import RegisterCustomer from "../registerCustomer/RegisterCustomer"
import LoginCustomer from "../loginCostumer/LoginCustomer"

import './Landing-Costumer.css'

const LandingCustomer = () => {

    const [table, setTable] = useState()
    const [isTable, setIsTable] = useState(false)


    const { tableId } = useParams()


    useEffect(() => {
        if (tableId != undefined) { getTable()
}
       
    }, [isTable])


    const getTable = () => {

        restaurantService
            .checkTable(tableId)
            .then(response => setTable(response.data))
            .then(() => setIsTable(true))
            .catch(err => console.log(err))
    }

    return (

        <div className="login-table">


            {isTable && table.password ? 
            <div>
                <h1>Esta es la mesa de {table.customer}</h1>
                <p> <LoginCustomer tablePassword={table.password}></LoginCustomer></p>
            </div>
            : <RegisterCustomer></RegisterCustomer>}

        </div>
    )
}

export default LandingCustomer