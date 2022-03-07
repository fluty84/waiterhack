import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import restaurantService from "../../../services/restaurant.services"
import MenuList from "../../../components/menuList/MenuList"
import RegisterCustomer from "../registerCustomer/RegisterCustomer"
import LoginCustomer from "../loginCostumer/LoginCustomer"




const LandingCustomer = () => {

    const [table, setTable] = useState()
    const [isTable, setIsTable] =useState(false)


    const { tableId } = useParams()


    useEffect(() => {
        getTable()
        console.log(table)
    }, [isTable])


    const getTable = () => {

        console.log(tableId, ' es el id de la mesa')

        restaurantService
            .checkTable(tableId)
            .then(response => setTable(response.data))
            .then( () => setIsTable(true))
            .catch(err => console.log(err))

    }


    return (

        <>
            <h1>Bienvenido a la web LANDING COMPONENT</h1>

           {isTable && table.password ? <p> <LoginCustomer tablePassword={table.password}></LoginCustomer></p> : <RegisterCustomer></RegisterCustomer>}


            



        </>
    )
}

export default LandingCustomer