import { useState, useContext } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import TextField from "@mui/material/TextField"
import authService from "../../services/auth.services"
import { AuthContext } from "../../context/auth.context"
import { Link, useNavigate} from "react-router-dom"
import { Container, FormGroup } from "react-bootstrap"


import("./LoginPage.css")

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    restaurant: "",
    password: "",
  })

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate()
  
  const { restaurant, password } = loginForm
  
  const handleInputChange = (e) => {
    const { name, value } = e.target

    setLoginForm({
      ...loginForm,
      [name]: value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    authService
      .login(loginForm)
      .then(({ data }) => {
        storeToken(data.authToken)
        authenticateUser()
        navigate("/")
      })
      .catch((err) => console.log(err))
  }

  return (
     
    <Container >
      <h1>WaiterHack</h1>
      <div id="login-form">
        <Form onSubmit={handleSubmit} id="login">
          <FormGroup className="mb-3" controlId="formBasicEmail" variant="filled">
            <TextField
            
              className='loginForm'
              id="outlined-required-input"
              label="Restaurant"
              name="restaurant"
              type="text"
              onChange={handleInputChange}
              value={restaurant}
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="formBasicPassword" color="white">
            <TextField
      
              id="outlined-password-input"
              label="Password"
              name="password"
              type="password"
              onChange={handleInputChange}
              value={password}
            />
          </FormGroup>
      <Button variant="primary" type="submit" id='login' className="login-btn">
        Enviar
      </Button>
          
        </Form>

        
      <Link className="button-block" to={'/restaurante/registro'}> ¿No tienes usuario? ¡Regístrate!</Link>
      </div>

    </Container>
  )
}

export default LoginPage
