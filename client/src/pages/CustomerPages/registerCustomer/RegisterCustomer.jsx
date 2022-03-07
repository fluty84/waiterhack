
import { FormControl, Input, InputLabel, FormHelperText, Container, Grid, TextField, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import restaurantService from '../../../services/restaurant.services'
import authService from '../../../services/auth.services'
import { useParams } from 'react-router-dom'




const RegisterCustomer = () => {

    const {tableId} = useParams()
console.log(tableId)
    const [customerData, setCustomerData] = useState(
        {
            customer: "",
            password: ""
        }
    )



    const { customer, password } = customerData


    const handleInputChange = e => {

        const { value, name } = e.target

        setCustomerData({
            ...customerData,
            [name]: value
        })
        
    }

    const handleSubmit = e => {
        e.preventDefault()

        console.log(tableId, "this is tableID")

        authService
            .tableLogin(customerData, tableId)
            .then((response) => {
               console.log(response)
            })

    }

    return (


        <>
            <Grid container>

                <h2>Indica un username y un password para registrarte</h2>

                <Form onSubmit={handleSubmit} >

                    <TextField className='textField'
                        required

                        label="Customer"
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
export default RegisterCustomer