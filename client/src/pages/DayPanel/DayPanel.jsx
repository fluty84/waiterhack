import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import restaurantService from "../../services/restaurant.services";
import mesaOn from "./mesa-on.png";
import mesaOff from "./mesa-off.png";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

import("./DayPanel.css");


socket.on("join_room", function (msg) {
  console.log("chat");
  console.log(msg, 'en dayPanel');
});


const DayPanel = () => {
 
  const { user } = useContext(AuthContext);
  const [tables, setTables] = useState();
  const [isOrder, setIsOrder] = useState(false);
  

socket.on("Popinoei", (arg) => {

console.log(arg, 'mensajeee')

})

  useEffect(() => {
    loadTables()
  }, [])

  //   useEffect(() => {
  //     setIsUser(true);
  //   }, [user]);

  const loadTables = () => {
    !user&&console.log("el puto id", user);
    restaurantService
      .getRestaurant(user)
      .then((response) => setTables(response.data.tables))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Jornada </h1>
      <Row className="justify-content-md-center">
        {tables?.map((table, idx) => {
          console.log(table);
          return (
            <Col md={3} className="mesa">
              <h1>Mesa {idx + 1}</h1>
              <Link to={`/restaurante/${user._id}/panel/${table}`}>
                {" "}
                <img src={isOrder ? mesaOn : mesaOff} alt="" />{" "}
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default DayPanel;
