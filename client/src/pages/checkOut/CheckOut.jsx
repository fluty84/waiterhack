import ToPay from "../../components/checkout/ToPay/ToPay"
import FinalOrder from "../../components/checkout/FinalOrder/FinalOrder"
import { useState } from "react"
import { useParams } from "react-router-dom"

const CheckOut = () => {

    const [totalData, setTotalData] = useState([])

    const {tableId} = useParams()

    const getDataFromFinalOrder = (data) => {

        setTotalData(data)
    }

    return (

        <>     
       
            <FinalOrder getDataFromFinalOrder={getDataFromFinalOrder} tableId={tableId} />
            <ToPay totalData={totalData} />

        </>
    )
}

export default CheckOut



