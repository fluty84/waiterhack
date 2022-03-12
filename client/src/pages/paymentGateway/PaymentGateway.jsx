import paymentImg from "./pay.png"
import NavbarClient from "../../components/navbarClient/NavbarClient"
import "./PaymentGateway.css"

const PaymentGateway = () => {






    return (

        <>
            <NavbarClient />
    <img className="payImg" src={paymentImg}></img>
        </>
    )
}

export default PaymentGateway