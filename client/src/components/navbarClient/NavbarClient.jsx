import { BottomNavigation, BottomNavigationAction} from "@mui/material";
import { useState, useEffect } from "react";

import { ReactComponent as Basket } from './basket.svg';
import { ReactComponent as Credit } from './credit-card.svg';
import { ReactComponent as Egg } from './egg-fried.svg';
import { useNavigate, useParams } from "react-router-dom";

import "./NavbarClient.css"

 

const NavbarClient = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState(0);
    const { tableId, _id } = useParams()

    useEffect(() => {

      
        if (value) {
            navigate(`/payment-gateway`, { replace: true });
            // } `/${_id}/${tableId}/panel-cliente`
        }
        }, [value])
    


return (
    
    <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        showLabels
        
    >
        <BottomNavigationAction label="Pago" icon={  <Credit />} />
        <BottomNavigationAction label="Menu" icon={<Egg />} />
        <BottomNavigationAction label="Cesta" icon={<Basket />} />
    </BottomNavigation> 
                   
)
    }
export default NavbarClient