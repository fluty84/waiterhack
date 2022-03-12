
import { Grid, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import authService from '../../../services/auth.services'
import { useNavigate, useParams } from 'react-router-dom'

import './registerCustomer.css'

const RegisterCustomer = () => {

    const navigate = useNavigate()
    const {tableId, _id} = useParams()

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

        authService
            .tableLogin(customerData, tableId)
            .then(() => {
                navigate(`/${_id}/${tableId}/panel-cliente`, { replace: true })
            })
        
    }

    return (

        <>
            <Grid container md={8} className='gridForm jusfy-content-center'>

                <h3>Crea un nombre y clave de sesisón para pedir</h3>
                <p>*el nombre y clave se borrarán al pagar la cuenta</p>

                <Form onSubmit={handleSubmit} >

                    <TextField className='textField'
                        required

                        label="Nombre"
                        name="customer"
                        type="text"
                        value={customer}
                        onChange={handleInputChange}
                    />

                    <TextField className='textField'
                        required

                        label="Clave de tu visita"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                    <Button className='login-btn' variant="outlined" size="medium" type='submit' >
                        Enviar
                    </Button>
                </Form>
            </Grid>

        </>

    )
}
export default RegisterCustomer
