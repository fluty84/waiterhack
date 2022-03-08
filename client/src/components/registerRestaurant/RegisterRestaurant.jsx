import { FormControl, Input, InputLabel, FormHelperText, Container, Grid, TextField, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import restaurantService from '../../services/restaurant.services'
import ('./RegisterRestaurant.css')




const RegisterRestaurant = () => {

const [restaurantData, setRestarantData] = useState(
    {
        restaurant:'', 
        email:'', 
        address:'',
        password:''
    }
)

const {restaurant, email, address, password} = restaurantData

    const handleInputChange = e => {

        const { value, name } = e.target

        setRestarantData({
            ...restaurantData,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        restaurantService
            .saveRestaurant(restaurantData)
            .then(({ data }) => {
                console.log(data)

            })

            .catch(err => console.log(err))
    }

    
return (


<Grid container>
    
    <h2>Registra tu Restaurante </h2>

        <Form onSubmit={handleSubmit} >
        
            <TextField className='textField'
                required
                id="outlined-required"
                label="Nombre del Restaurante"
                name="restaurant"
                type="text"
                value={restaurant}
                onChange={handleInputChange}
            />

            <TextField className='textField'
                required
                id="outlined-required"
                label="password"
                name="password" 
                type="password"
                value={password}
                onChange={handleInputChange}
            />

            <TextField className='textField'
                required
                id="outlined-required"
                label="email"
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
            />

            <TextField className='textField'
                required
                id="outlined-required"
                label="dirección"
                name="address"
                type="text"
                value={address}
                onChange={handleInputChange}
            />
    
            <Button variant="outlined" size="medium" type='submit' >
                Enviar
            </Button>
    </Form>
</Grid>
)

}

export default RegisterRestaurant

