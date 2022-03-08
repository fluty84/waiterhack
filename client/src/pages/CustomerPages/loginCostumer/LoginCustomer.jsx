
import { Grid, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'








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
    }

    const handleSubmit = e => {
        e.preventDefault()

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




