
import { Grid, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'


const LoginCustomer = ({ tablePassword }) => {

    const navigate = useNavigate()

    const { tableId, _id } = useParams()

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

        if (customerData.password === tablePassword) {
            navigate(`/${_id}/${tableId}/panel-cliente`, { replace: true })
        }
    }

    return (

        <>
            <Grid container className='gridForm jusfy-content-center'>

                <h3>Indtroduce el nombre y clave de sesión</h3>
                <p>*pregunta a tus compañeros de mesa con cual se registraron</p>

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
                    <Button className='login-btn' variant="outlined" size="medium" type='submit' >
                        Enviar
                    </Button>
                </Form>
            </Grid>

        </>

    )
}
export default LoginCustomer




