import { useContext, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import restaurantService from "../../services/restaurant.services";
import mesaOn from "./mesa-on.png";
import mesaOff from "./mesa-off.png";
import TableDetails from "../../components/TableDetails/TableDetails";
import io from "socket.io-client";
import { Box, Button, Modal, Typography } from "@mui/material";

const socket = io.connect("http://localhost:3001");

import("./DayPanel.css");

const DayPanel = () => {
  const { user } = useContext(AuthContext);
  const [tables, setTables] = useState();
  const [isOrder, setIsOrder] = useState(false);
  const [tableNumber, setTableNumber] = useState(0)

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  socket.on("join_room", function (msg) {
    console.log(msg, "en dayPanel");
    console.log("this has been reached bitch");
    setIsOrder(msg);
  });

  useEffect(() => {
    loadTables();
  }, [user]);

  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      console.log("OIDO COCINA");
      loadTables();
    } else {
      didMount.current = true;
    }
  }, [isOrder]);

  const loadTables = () => {
    !user && console.log("el puto id", user);
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
          return (
            <Col md={3} className="mesa" key={idx}>
              <p>Mesa número {idx+1}</p>
              <input
                type="image"
                alt="mesa"
                onClick={() => {
                  setModalData(table);
                  setTableNumber(idx+1)
                  handleOpen();
                }}
                src={!table.currentOrder.length ? mesaOff : mesaOn}
              ></input>
            </Col>
          );
        })}
      </Row>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          ></Typography>
          <TableDetails
            order={modalData}
            number={tableNumber}
            handleClose={handleClose}
          ></TableDetails>
        </Box>
      </Modal>
    </>
  );
};

export default DayPanel;
