import { FormControl, Input, InputLabel, FormHelperText } from '@mui/material'
import "../registerPage/RegisterPage.css"


const RegisterPage = () => {

    return (
        <form action="">
            <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
        </form>

    )
}

export default RegisterPage;
