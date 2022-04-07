import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams } from "react-router-dom";
import productService from "../../services/product.services";
import restaurantService from "../../services/restaurant.services";
import { Form } from "react-bootstrap";
import io from "socket.io-client";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import './Basket.css'

const socket = io()

function Basket(props) {

  const { isLoggedIn } = useContext(AuthContext);
  let { tableId, _id } = useParams();

  const navigate = useNavigate()



  if (_id) {
  } else {
    _id = props._id;
    tableId = props.tableId;

  }

  const [orders, setOrder] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [changes, setChanges] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isSubmittedOrder, setIsSubmittedOrder] = useState(false);
  const [isAcceptedBtn, setIsAcceptedBtn] = useState(false);
  const [qtyProductsArr, setQtyProductsArr] = useState([])

  const joinRoom = () => { // con socket
    socket.emit("join_room", orders);
  };

  socket.on("join_room", function (msg) {
    if (msg === "ACEPTADO") {
      if (!isLoggedIn) {

        setIsOrder(msg);
        setIsOrder(true);
        setIsSubmittedOrder(false)
        setIsAcceptedBtn(true);
      }

    }
  });

  useEffect(() => {  //solo sin socket
  if(isAcceptedBtn) { const refresh = setInterval(() => {

      productService
        .displayOrder(tableId)
        .then((response) => {
          if (!response.data.result.currentOrder.length) {

            setIsOrder(true);
            setIsSubmittedOrder(false)
            setIsAcceptedBtn(true);   

            setTimeout(() => {
              navigate(`/${_id}/${tableId}/panel-cliente`)
            }, 5000);
          }

        })
    }, 1000)
    return () => clearInterval(refresh)
  }
  }, [orders, changes])

  useEffect(() => { ///Renderizado general
    filter(orders);
    calculateTotal();
    qtySum(cuenta)
  }, [orders, changes]);

  const didMount = useRef(false);


  useEffect(() => {
    productService
      .displayOrder(tableId)
      .then((response) => setOrder(response.data.result.currentOrder))
  }, []);

  useEffect(() => {
    if (didMount.current) {

      setOrder([...orders, props.orderForm]);
    } else {
      didMount.current = true;
    }
  }, [props.isOrderSent]);
  const cuenta = {};

  //TODO filter object orders with key-values that are greater than 0

  useEffect(() => {
    if (didMount.current) {
      if (isSubmittedOrder) {

        productService
          .createOrder(...orders, tableId)
          .then(() => setOrder([]))
          .then(() => console.log(orders))
          .catch((err) => console.log(err));
      }

    } else {
      didMount.current = true;
    }
  }, [isSubmittedOrder]);






  useEffect(() => {
    setChanges(true);
  }, [ticket]);

  useEffect(() => {
    qtySum()
  }, [cuenta]);

  let cuentaTotal = null;

// suma el total de productos

  function filter() {
    
    let newArr = [];
    orders.forEach((product) => {
      newArr.push(Object.keys(product).flat());
    });
    const flatArr = newArr.flat();
    const uniqueKeys = [...new Set(flatArr)];
    const filteredArr = uniqueKeys.filter((x) => {
      return x != "id";
    });

    filteredArr.forEach((item) => {
      cuenta[item] = 0;
    });

    filteredArr.forEach((product) => {
      orders.forEach((ord) => {
        for (const property in ord) {
          if (property == product) {
            cuenta[product] += parseInt(ord[property]);
          }
        }
      });
    });
    cuentaTotal = { ...cuenta };


  }

  function calculateTotal() {
    //multiplica por el total

    let menu = [];

    restaurantService
      .getRestaurant({ _id })
      .then((rest) => {
        menu = rest.data.menu;
      })
      .then(() => {
        let keyArr = Object.keys(cuentaTotal);

        keyArr.forEach((key) => {
          menu.forEach((item) => {
            if (item.name === key) {
              cuentaTotal[key] *= item.price;
            }
          });
        });
        setTicket(cuentaTotal);
      });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAcceptedBtn(true);
    setIsSubmittedOrder(true);

    //joinRoom(); //quitar sin socket
  };



  const qtySum = (cuenta) => {
    if (cuenta) {
      const productArr = []
      Object.values(cuenta).map(item => {
        productArr.push(item)
      })
      setQtyProductsArr(productArr)

    }

  }

  useEffect(() => {
    if (props.isTicketModified) {
      setTicket([])
      setOrder([])
      props.toggleTicket()
    }
  }, [props.isTicketModified])

  return (
    <>

      {changes &&
        Object.entries(ticket).map((key, idx) => (

          key[1] > 0 ? (<div className="food">
            <p>
              {key[0]} {key[1]} Euros. Unidades = {qtyProductsArr[idx]}
            </p>

          </div>) : null

        ))}


      {(
        <Form onSubmit={handleSubmit}>
          {!isAcceptedBtn && !isLoggedIn ? (
            <button className="btn btn-primary" type="submit">
              Confirmar Pedido
            </button>
          ) : (
            <button className="btn btn-primary" type="submit">
              <span
                className={isOrder ? null : "spinner-border spinner-border-sm"}
                // class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only">
                {isOrder ? (
                  <span>Orden Lista</span>
                ) : (
                  <span>Esperando confirmación</span>
                )}
              </span>
            </button>
          )}
        </Form>
      )}
      {!isLoggedIn && <Button className="btn-primary" onClick={props.clearOrder}>Modificar Pedido</Button>}


    </>
  );
}
export default Basket;
