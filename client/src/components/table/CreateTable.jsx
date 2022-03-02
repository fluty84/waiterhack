import { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Fab, AddIcon } from "@mui/material";

import { AuthContext } from "../../context/auth.context"; // <== ADD

const CreateTable = () => {
  const value = useContext(AuthContext); // <== ADD




     const [table, setTable] = useState({
     numberOfTables: 1,
     restaurantId: ""
   });

   
 useEffect(() => {
   
     if (value.user != null) {
     setTable( {
       ...table,
       restaurantId: value.user._id
           })
   }
  }, [value.user] );

     


   console.log( table)

  return (
    <>
      <Form>
        <div>
          <Fab color="primary" aria-label="add">
            +
          </Fab>

          <Fab color="primary" aria-label="add">
            -
          </Fab>
        </div>
   <h1>{table.restaurantId}</h1> 
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CreateTable;
