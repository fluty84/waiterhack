import CreateMenu from "../createMenu/CreateMenu";
import CreateTable from "../createTable/CreateTable";
import { AuthContext } from "../../context/auth.context";
import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RestaurantPanel = () => {
  const value = useContext(AuthContext);
  const { _id } = value.user;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h1>Mi Restaurante</h1>
        </Col>
        <Row className="justify-content-md-center mt-5">
          <Col className="modifyMenuBtn" md={6}>
            <Link to={`/restaurante/${_id}/menu`}>
              <Button variant="outlined">Modificar Menú</Button>
            </Link>
          </Col>
          <Col className="newTableModal" md={6}>
            <Button onClick={handleOpen}>Añadir Mesas</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                </Typography>
                <CreateTable
                  tableNumbers={value}
                  handleClose={handleClose}
                ></CreateTable>
              </Box>
            </Modal>
          </Col>
          <Col>
            <Link to={`/panel`}>
              <Button variant="outlined">Jornada</Button>
            </Link>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default RestaurantPanel;
