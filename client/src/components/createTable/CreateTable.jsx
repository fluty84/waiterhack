import { useState, useContext, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Fab } from "@mui/material"
import { AuthContext } from "../../context/auth.context"
import restaurantService from "../../services/restaurant.services"
import("./CreateTable.css")

const CreateTable = ({ handleClose }) => {
  const close = handleClose
  const value = useContext(AuthContext)

  const [table, setTable] = useState({
    numberOfTables: 1,
    restaurantId: 0,
  })

  useEffect(() => {
    if (value.user != null) {
      setTable({
        ...table,
        restaurantId: value.user._id,
      })
    }
  }, [value.user])

  const handleClick = (arg) => {
    if (table.numberOfTables === 0 && arg === -1) {
      arg = 0
    }

    if (table.numberOfTables === 50 && arg === 1) {
      arg = 50
    }
    setTable({
      ...table,
      numberOfTables: parseInt(table.numberOfTables) + parseInt(arg),
    })
  }

  const handleChange = (arg) => {
    if (arg.target.value < 0 || arg.target.value > 50) {
      arg.target.value = 0
    }
    setTable({
      ...table,
      numberOfTables: arg.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    for (let i = 0; i < table.numberOfTables; i++) {
      restaurantService
        .createTable()
        .then(() => close())
        .then((err) => console.log(err))
    }
  }

  return (
    <>
      <div id="createTableContainer">
        <Form id="createTableForm" onSubmit={handleSubmit}>
          <div>
            <h2> Indica el número de Mesas </h2>
            <Fab 
              className="operator"
              color="primary"
              aria-label="add"
              onClick={() => {
                handleClick(-1)
              }}
            >
              -
            </Fab>
            <input
            className="newTableInput"
              type="number"
              onChange={handleChange}
              name="value"
              value={table.numberOfTables}
            />
            <Fab
              className="operator"
              color="primary"
              aria-label="add"
              onClick={() => {
                handleClick(1)
              }}
            >
              +
            </Fab>
           
          </div>

          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </div>
    </>
  )
}

export default CreateTable
