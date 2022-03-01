import { useState, useContext } from "react"
import { Form, Button } from 'react-bootstrap'
import authService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { MessageContext } from './../../context/userMessage.context'
import { AuthContext } from './../../context/auth.context'



function LoginForm() {

    const [loginForm, setLoginForm] = useState({
        password: "",
        restaurant: ""
    })

    const navigate = useNavigate()

    const { setShowMessage, setMessageInfo } = useContext(MessageContext)
    const { storeToken, authenticateUser } = useContext(AuthContext)


    const handleInputChange = e => {
        const { name, value } = e.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    function handleSubmit(e) {

        e.preventDefault()

        authService
            .login(loginForm)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                setShowMessage(true)
                setMessageInfo({ title: 'Éxito', desc: 'Sesión iniciada correctamente' })
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>Nombre de Restaurante</Form.Label>
                <Form.Control type="text" name="restaurante" value={loginForm.restaurant} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="password" value={loginForm.password} onChange={handleInputChange} />
            </Form.Group>

            <Button variant="dark" type="submit" style={{ width: '100%' }}>Iniciar sesión</Button>

        </Form>
    )
}

export default LoginForm