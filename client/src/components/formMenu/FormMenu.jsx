import { InputLabel, TextField, Button, Select, MenuItem } from '@mui/material'
import { useContext, useState } from 'react'
import { Form, Option } from 'react-bootstrap'
import { AuthContext } from '../../context/auth.context'
import productService from '../../services/product.services'
import uploadService from '../../services/upload.service'
import MenuList from '../menuList/MenuList'
import('./FormMenu.css')

const FormMenu = () => {

const { isLoggedIn } = useContext(AuthContext)

const { user } = useContext(AuthContext)

const [productData, setproductData] = useState(
    {
        name: '',
        price: '',
        category: '',
        allergens: '',
        restaurantId: user._id,
        imageUrl: ''
    }
)

const [loadingImage, setLoadingImage] = useState(false)

const [newProduct, setNewProduct] = useState(false)

const { name, price, category, allergens} = productData

const handleInputChange = e => {

    const { value, name } = e.target
    
    setproductData({
        ...productData,
        [name]: value
    })
}

const toggleNew = () => !newProduct ? setNewProduct(true) : setNewProduct(false)

const handleSubmit = e => {
    e.preventDefault()
    setproductData({ ...productData, restaurantId: user._id })
    productService
        .saveProduct(productData)
        .then(({ data }) => {
            toggleNew()
        })
        .catch(err => console.log(err))
}

const uploadProductImage = e => {

    setLoadingImage(true)

    const uploadData = new FormData()
    uploadData.append('imageData', e.target.files[0])

    uploadService
        .uploadImage(uploadData)
        .then(({ data }) => {
            setLoadingImage(false)
            setproductData({ ...productData, imageUrl: data.cloudinary_url })
        })
        .catch(err => console.log(err))
}





    return (

        <>
            <MenuList newProduct={newProduct}></MenuList>

            <h4>Nuevo producto </h4>
            <Form onSubmit={handleSubmit} >
                <Form.Group>
                <Form.Label>Nombre del Producto</Form.Label>
                
                    <Form.Control className='textField' id="input"
                    required
                    //className="outlined-required"
                    label="Nombre del producto"
                    name="name"
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label> Precio (€) </Form.Label>
                <Form.Control className='textField' id="input"
                    required
                    //className="outlined-required"
                    label="Precio"
                    name="price"
                    type="number"
                    value={price}
                    onChange={handleInputChange}
                />
                   
                </Form.Group>
                <Form.Group>
                <Form.Control className='uploadFile'

                    //className="outlined-required"
                    label="Imagen"
                    name="restaurantId"
                    type="file"

                    onChange={uploadProductImage}
                    />
                </Form.Group>
                <div id="selectors">
                <Form.Group>
                    
                <Form.Label id="categorySelect">Categoria</Form.Label>
                <Form.Select
                    size='small'
                    
                    id="categorySelect"
                    name='category'
                    value={category}
                    label="category"
                    onChange={handleInputChange}
                    >
              
                    <option value={'comida'}>Comida</option>
                            <option value={'bebida'}>Bebida</option>
                     
                </Form.Select>
                </Form.Group>
        <Form.Group>
                <Form.Label id="categorySelect">Alérgenos</Form.Label>

                <Form.Select
                    size='small'
                   
                    id="allegensSelect"
                    name='allergens'
                    value={allergens}
                    label="allergens"
                    onChange={handleInputChange}
                >
                    <option value={'frutos secos'}>Frutos Secos</option>
                    <option value={'pescado'}>Pescado</option>
                    <option value={'cruzcampo'}>Cruz-Campo</option>

                </Form.Select>
                </Form.Group>
                </div>
                <Button variant="outlined" size="small" className= "btn-primary" type='submit' disabled={loadingImage}  >{loadingImage ? 'Cargando imagen' : 'Añadir producto'}

                </Button>
            </Form>
        </>
    )
}

export default FormMenu