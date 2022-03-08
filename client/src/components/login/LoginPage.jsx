import { useState, useContext } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import TextField from "@mui/material/TextField"
import authService from "../../services/auth.services"
import { AuthContext } from "../../context/auth.context"
import { Link, useNavigate } from "react-router-dom"

import ("./LoginPage.css")

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
    <div id="login-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <TextField
            id="outlined-required-input"
            label="Restaurant"
            name="restaurant"
            type="text"
            onChange={handleInputChange}
            value={restaurant}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <TextField
            id="outlined-password-input"
            label="Password"
            name="password"
            type="password"
            onChange={handleInputChange}
            value={password}
          />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>

        <Link to={'/restaurante/registro'}> ¿No tienes usuario? ¡Regístrate!</Link>
      </Form>
    </div>
  )
}

export default LoginPage
