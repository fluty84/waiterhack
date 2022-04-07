import { useContext, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";
import restaurantService from "../../services/restaurant.services";
import mesaOn from "./mesa-on.png";
import mesaOff from "./mesa-off.png";
import mesaOpen from "./mesa-open.png"
import TableDetails from "../../components/TableDetails/TableDetails";
import io from "socket.io-client";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";


const socket = io()


import("./DayPanel.css");



const DayPanel = () => {
  const { user } = useContext(AuthContext);
  const [tables, setTables] = useState();
  const [isOrder, setIsOrder] = useState(false);
  const [tableNumber, setTableNumber] = useState(0)
  const [tableIdModal, setTableIdModal] = useState()

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isLoggedIn, isLoading } = useContext(AuthContext)
  const navigate = useNavigate()

  socket.on("join_room", function (msg) {
    setIsOrder(msg);
  });

  function PrivateRoute() {

    

    if (isLoading) {
      return "cargando"
    }

    if (!isLoggedIn) {
      console.log('intruso')
      return <Navigate to="/" />
    }

  }

  useEffect(() => { 
    loadTables();
  }, [user]);

  useEffect(() => {
    const refresh = setInterval(() => {
      loadTables()
    }, 1000)

    return () => clearInterval(refresh)
  }, [user])


  const didMount = useRef(false);


  // useEffect(() => {
  //   if (didMount.current) {
  //     loadTables();
  //   } else {
  //     didMount.current = true;
  //   }
  // }, [isOrder]);

  const loadTables = () => {

    if (!isLoggedIn) {
      navigate("/")
    }

    restaurantService
      .getRestaurant(user)
      .then((response) => setTables(response.data.tables))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Jornada </h1>
      <Row className="justify-content-center mb-5">
        {tables?.map((table, idx) => {
          return (
            <Col md={3} className="mesa" key={idx}>
              <h3 className="h3-white">Mesa número {idx + 1}</h3>
              <input
                type="image"
                alt="mesa"
                onClick={() => {
                  setModalData(table);
                  setTableNumber(idx + 1)
                  setTableIdModal(table._id)
                  handleOpen();
                }}
                src={!table.currentOrder.length && table.total.length ? mesaOpen :
                   table.currentOrder.length ? mesaOn : mesaOff }
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
            tableIdModal={tableIdModal}
          ></TableDetails>
        </Box>
      </Modal>

      <Link to="/" className='link' ><Button className="btn-primary btn-back">Volver</Button></Link>
    </>
  );
};

export default DayPanel;
