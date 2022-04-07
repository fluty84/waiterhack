import { useEffect, useState } from "react"
import { useContext } from "react"
import restaurantService from "../../services/restaurant.services"
import { Form, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

import "./CreateOrder.css"


const CreateOrder = (props) => {

  const [products, setProducts] = useState([])
  const [orderForm, setOrderForm] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    loadMenu()

    products.map((product) => {
      const { name } = product
      setOrderForm({
        ...orderForm,
        [name]: 0
      })
    })

  }, [])

  const { _id, tableId } = useParams()

  const loadMenu = () => {
    restaurantService
      .getRestaurant({ _id })
      .then((response) => setProducts(response.data.menu))
      .catch((err) => console.log(err))
  }

  const handleInputChange = (arg) => {
    if (arg.target.value < 0 || arg.target.value > 50) {
      arg.target.value = 0
    }
    const { name, value } = arg.target

    setOrderForm({
      ...orderForm,
      [name]: value,
      id: tableId, //TABLE ID
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    props.orderSent()
    props.receiveOrder(orderForm)
    setOrderForm(prevState => {
      Object.keys(prevState).forEach(el => (prevState = { ...prevState, [el]: 0 }))
      return prevState
    })
  }

  return (
    <>
      
      <p id="titleMenu">   Lista de productos</p>
      <Form className="createForm" onSubmit={handleSubmit}>
     
      
    
        {products.map((product) => {
          return (

       

              <li className="create-order-list" key={product._id}>
                <label htmlFor={product._id}>
                
                    <p>{product.name}   {product.price}€
                    </p>
           
                 <div>
                    <input 
                      className="unit"
                      id={product._id}
                      type="number"
                      name={product.name}
                      value={orderForm[product.name]}
                      onChange={handleInputChange}
                  ></input> <span> Unidades</span> 
                </div>  
                    <input
                      type="hidden"
                      name="id"
                      value="621f984c745ab17740b49361" //
                    ></input>
              
                </label>
              <hr></hr>
              </li>
    
          )
        })}
          <Button type="submit" size="sm" variant="primary" className="shadow p-3">Enviar orden</Button>
          <Button onClick={() => navigate(-1)}>Volver</Button>
      </Form>
      
    </>
  )
}

export default CreateOrder
