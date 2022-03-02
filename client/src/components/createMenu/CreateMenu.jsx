import { FormControl, Input, InputLabel, FormHelperText, Container, Grid, TextField, Button, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import productService from '../../services/product.services'
import('./CreateMenu.css')






const CreateMenu = () => {

    const [productData, setproductData] = useState(
        {
            name: '',
            price: '',
            category: '',
            allergens: '',
            restaurantId: '',
            img: ''
        }
    )

    const { name, price, category, allergens, restaurantId, img } = productData

    const handleInputChange = e => {

        const { value, name } = e.target

        console.log(name)
        console.log(value)

        setproductData({
            ...productData,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        console.log(productData)

        productService
            .saveProduct(productData)
            .then(({ data }) => {
                console.log(data)

            })

            .catch(err => console.log(err))
    }


    return (


        <Container maxWidth='sm'>

            <h4>Nuevo producto </h4>

            <Form onSubmit={handleSubmit} >

                <TextField className='textField'
                    required
                    className="outlined-required"
                    label="Nombre del producto"
                    name="name"
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                />
                <TextField className='textField'
                    required
                    className="outlined-required"
                    label="Precio"
                    name="price"
                    type="number"
                    value={price}
                    onChange={handleInputChange}
                />

                <TextField className='textField'
                    required
                    className="outlined-required"
                    label="id"
                    name="restaurantId"
                    type="text"
                    value={restaurantId}
                    onChange={handleInputChange}
                />

                <TextField className='uploadFile'
                    
                    className="outlined-required"
                    label="Imagen"
                    name="restaurantId"
                    type="file"
                    value={img}
                    onChange={handleInputChange}
                />

                <InputLabel id="categorySelect">Categoria</InputLabel>
                <Select
                    size='small'
                    labelId="categorySelect"
                    id="categorySelect"
                    name='category'
                    value={category}
                    label="category"
                    onChange={handleInputChange}
                >
                    <MenuItem value={'comida'}>Comida</MenuItem>
                    <MenuItem value={'bebida'}>Bebida</MenuItem>
                </Select>

                <InputLabel id="categorySelect">Alérgenos</InputLabel>

                <Select
                    size='small'
                    labelId="allegensSelect"
                    id="allegensSelect"
                    name='allergens'
                    value={allergens}
                    label="allergens"
                    onChange={handleInputChange}
                >
                    <MenuItem value={'frutos secos'}>Frutos Secos</MenuItem>
                    <MenuItem value={'pescado'}>Pescado</MenuItem>
                    <MenuItem value={'cruzcampo'}>Cruz-Campo</MenuItem>

                </Select>


                <Button variant="outlined" size="small" type='submit' >
                    Añadir
                </Button>
            </Form>
        </Container>
    )

}

export default CreateMenu

