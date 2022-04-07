import ToPay from "../../components/checkout/ToPay/ToPay"
import FinalOrder from "../../components/checkout/FinalOrder/FinalOrder"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "react-bootstrap"

const CheckOut = () => {

    const navigate = useNavigate()

    const [totalData, setTotalData] = useState([])

    const {tableId} = useParams()

    const getDataFromFinalOrder = (data) => {

        setTotalData(data)
    }

    return (

        <>     
       
            <FinalOrder getDataFromFinalOrder={getDataFromFinalOrder} tableId={tableId} />
            <ToPay totalData={totalData} />
            <Button onClick={() => navigate(-1)}>Volver</Button>
        </>
    )
}

export default CheckOut



