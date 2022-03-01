import { useState, useContext } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../login/login.css"
import TextField from '@mui/material/TextField';


const LoginPage = () => {

   const [loginForm, setLoginForm] = useState({
     restaurant: "",    
    password: ""
       
    })
  

    const {restaurant, password} = loginForm
    const handleInputChange = e => {
        const { name, value } = e.target
        
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    return (
    <div id="login-form">
     
<Form>
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
  {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group> */}
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>  
    )
}

export default LoginPage;





