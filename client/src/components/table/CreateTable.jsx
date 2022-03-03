import { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Fab, AddIcon } from "@mui/material";
import { AuthContext } from "../../context/auth.context"; // <== AD
import restaurantService from "../../services/restaurant.services";
import("./CreateTable.css");

const CreateTable = (props) => {
  const value = useContext(AuthContext); // <== ADD

  const [table, setTable] = useState({
    numberOfTables: 1,
    restaurantId: 0,
  });

  useEffect(() => {
    if (value.user != null) {
      setTable({
        ...table,
        restaurantId: value.user._id,
      });
    }
  }, [value.user]);

  const handleClick = (arg) => {
    setTable({
      ...table,
      numberOfTables: parseInt(table.numberOfTables) + parseInt(arg),
    });
  };

  const handleChange = (arg) => {
    console.log(arg.target);
    setTable({
      ...table,
      numberOfTables: arg.target.value,
    });

    console.log(table.numberOfTables);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let promises = [];

    // for(let i = 0; i < table.numberOfTables; i++) {
    //   promises.push( restaurantService.createTable(table.restaurantId))
    // }

    // Promise.all(promises).then((x) => console.log(x))

    for (let i = 0; i < table.numberOfTables; i++) {
      restaurantService
        .createTable(table.restaurantId)
        .then((x) => console.log(x));
    }
  };

  return (
    <>
      <div id="createTableContainer">
        <Form id="createTableForm" onSubmit={handleSubmit}>
          <div>
            <p> Indica el número de Mesas </p>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => {
                handleClick(-1);
              }}
            >
              -
            </Fab>
            <input
              type="number"
              onChange={handleChange}
              name="value"
              value={table.numberOfTables}
            />
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => {
                handleClick(1);
              }}
            >
              +
            </Fab>
            <div>Current Number of tables: {console.log(value)}</div>
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateTable;
