import React from "react";
import './ToPay.css'

const ToPay = ({totalData}) => {

    const totalProduct = totalData.map((elm)=> {
        return elm[1]*elm[2]
    })
    

   const totalSum = totalProduct.reduce((prev, curr) => prev+curr, 0)

    return (
        <div className="container">
            <h1 className="totalField"> <p>Total cuenta:</p>{totalSum} €</h1>
        </div>
    )
}



export default ToPay