
import { FormControl, Input, InputLabel, FormHelperText, Container, Grid, TextField, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import restaurantService from '../../../services/restaurant.services'
import authService from '../../../services/auth.services'
import { useNavigate, useParams } from 'react-router-dom'
import { Redirect } from 'react-router';








const LoginCustomer = ({tablePassword}) => {

    const navigate = useNavigate()

    const {tableId, _id} = useParams()

    const [customerData, setCustomerData] = useState(
        {
           customer: "",
            password: ""
        }
    )


        const {customer, password} = customerData

    const handleInputChange = e => {

        const { value, name } = e.target

        setCustomerData({
            ...customerData,
            [name]: value
        })
        console.log(customerData)
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(customerData.password === tablePassword)

     if(customerData.password === tablePassword ) {
         navigate (`/${_id}/${tableId}/customer-order`, {replace:true})
     } 
    

    }

    return (
    
    
    <>
    <Grid container>
    
    <h2>Indica un username y un password para poder realizar tu pedido</h2>

    <h1>COMPONENTE LOGINCUSTOMER.JSX</h1>

        <Form onSubmit={handleSubmit} >
        
            <TextField className='textField'
                required
            
                label="Customer Name"
                name="customer"
                type="text"
                value={customer}
                onChange={handleInputChange}
            />

            <TextField className='textField'
                required
              
                label="password"
                name="password" 
                type="password"
                value={password}
                onChange={handleInputChange}
            />
            <Button variant="outlined" size="medium" type='submit' >
                Enviar
            </Button>
    </Form>
</Grid>

            


    </>

    )
}
export default LoginCustomer


// import { FormControl, Input, InputLabel, FormHelperText, Container, Grid, TextField, Button } from '@mui/material'
// import { useEffect, useState } from 'react'
// import { Form } from 'react-bootstrap'
// import restaurantService from '../../services/restaurant.services'
// import ('./RegisterRestaurant.css')




// const RegisterRestaurant = () => {

// const [restaurantData, setRestarantData] = useState(
//     {
//         restaurant:'', 
//         email:'', 
//         address:'',
//         password:''
//     }
// )

// const {restaurant, email, address, password} = restaurantData

//     const handleInputChange = e => {

//         const { value, name } = e.target

//         setRestarantData({
//             ...restaurantData,
//             [name]: value
//         })
//     }

//     const handleSubmit = e => {
//         e.preventDefault()

//         console.log(restaurantData)

//         restaurantService
//             .saveRestaurant(restaurantData)
//             .then(({ data }) => {
//                 console.log(data)

//             })

//             .catch(err => console.log(err))
//     }

    
// return (


// <Grid container>
    
//     <h2>Registra tu Restaurante </h2>

//         <Form onSubmit={handleSubmit} >
        
//             <TextField className='textField'
//                 required
//                 id="outlined-required"
//                 label="Nombre del Restaurante"
//                 name="restaurant"
//                 type="text"
//                 value={restaurant}
//                 onChange={handleInputChange}
//             />

//             <TextField className='textField'
//                 required
//                 id="outlined-required"
//                 label="password"
//                 name="password" 
//                 type="password"
//                 value={password}
//                 onChange={handleInputChange}
//             />

//             <TextField className='textField'
//                 required
//                 id="outlined-required"
//                 label="email"
//                 name="email"
//                 type="email"
//                 value={email}
//                 onChange={handleInputChange}
//             />

//             <TextField className='textField'
//                 required
//                 id="outlined-required"
//                 label="dirección"
//                 name="address"
//                 type="text"
//                 value={address}
//                 onChange={handleInputChange}
//             />
    
//             <Button variant="outlined" size="medium" type='submit' >
//                 Enviar
//             </Button>
//     </Form>
// </Grid>
// )

// }

// export default RegisterRestaurant
