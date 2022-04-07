import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import restaurantService from "../../../services/restaurant.services";
import { AuthContext } from "../../../context/auth.context";
import { useContext } from "react";
import productService from "../../../services/product.services";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router'
import "./FinalOrder.css"

const FinalOrder = (props) => {

  let navigate = useNavigate();
  let { tableId, _id } = useParams();

  if (tableId) {
  } else {
    _id = props._id;
    tableId = props.tableId;

  }


  // ARRAY DE OBJETOS DE PRODUCTOS DE MENU: {name: cerveza, price: 1 ....}
  const [menuData, setMenuData] = useState([]);
  // ARRAY DE OBJ: {Cerveza: "3", Oreja: "2"} CANTIDADES DE PEDIDO, VIENEN CON ID
  const [finalOrderData, setFinalOrderData] = useState([]);
  // ARRAY DE OBJ IGUAL QUE FINALORDERDATA PERO SIN IDS
  const [orderDataNoIds, setOrderDataNoIds] = useState([]);
  // ARRAY DE ARRAYS [Cerveza, cantidad, precio]
  const [arrFinalOrder, setArrFinalOrder] = useState([]);
  // ARRAY DE ARRAYS CON PEDIDO MODIFICADO
  const [newOrder, setNewOrder] = useState([])

  const { isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    objToArr(orderDataNoIds);
  }, [orderDataNoIds]);

  useEffect(() => {
    filterOutIds(finalOrderData);
  }, [finalOrderData]);

  useEffect(() => {

    restaurantService
      .checkTable(tableId)
      .then((res) => {
        setMenuData(res.data.restaurantId[0].menu)
        setFinalOrderData(res.data.total.flat())
      })
      .catch((e) => console.log(e));
  }, [arrFinalOrder]);

  useEffect(() => {
    props.getDataFromFinalOrder(arrFinalOrder)

  }, [arrFinalOrder])

  const filterOutIds = (arrOfObjects) => {
    const objectWithoutId = [];
    arrOfObjects.forEach((elm) => {
      const { id, ...rest } = elm;
      objectWithoutId.push(rest);
    });
    setOrderDataNoIds(objectWithoutId);
  };

  const objToArr = (arrOfObjects) => {

    const arrOfOrders = [];

    arrOfObjects.forEach((elm, idx) => {

      arrOfOrders.push(Object.entries(elm))


      menuData.forEach((menuItem) => {

        for (const property in menuItem) {

          arrOfOrders[idx].forEach((item, index) => {

            if (menuItem.name === arrOfOrders[idx][index][0]) {

              arrOfOrders[idx][index].length < 3 &&
                arrOfOrders[idx][index].push(menuItem.price)
            }
          })
        }
      })

    })

    const ordersResume = []

    const flatArrOfOrders = arrOfOrders.flat()
    flatArrOfOrders.forEach(order => {
      if (!ordersResume.includes(order[0])) {
        ordersResume.push(order[0])
      }
    })

    const newArrOrderResume = ordersResume.map((elm) => {
      return [elm]
    })

    let finalSum = 0

    newArrOrderResume.forEach((order, index) => {

      flatArrOfOrders.forEach(eachOrder => {
        if (order[0] === eachOrder[0]) {
          finalSum += parseInt(eachOrder[1])
          newArrOrderResume[index][2] = eachOrder[2]
        }
      })
      newArrOrderResume[index][1] = finalSum
      finalSum = 0
    })

    setArrFinalOrder(newArrOrderResume)
    props.getDataFromFinalOrder((arrOfOrders.flat()))

  }


  const resetTable = () => {
    productService
      .resetTable(tableId)
      .then((x) => navigate("/panel", { replace: true }))
      .catch(e => console.log(e))

  }

  const handleInputChange = e => {

    const { value, name } = e.target

    setNewOrder(
      {
        ...newOrder,
        [name]: value
      }
    )
  }

  const modifyTotal = (e) => {
    e.preventDefault()

    arrFinalOrder.forEach(elm => {
      for (const property in newOrder) {
        if (elm[0] === property) {
          elm[1] = parseInt(newOrder[property])
        }
      }
    })

    restaurantService
      .editFinalOrder({ arrFinalOrder, tableId })
      .catch(err => console.log(err))

  }


  return (
    <>
      <h1>Total a pagar</h1>

      <form
        className="foodList"
        id="formCheckOut"
        method="POST"
        action={isLoggedIn ? `https://waiterhack.herpkuapp.com/api/update-total/${tableId}` : "foo"}
      >


        {arrFinalOrder.map((order) => {
          return (
            <div class="mb-3">
              <div class="input-group">



                {isLoggedIn ?

                  <div className="topayForm" >
                    <span class="input-group-text opacity">{order[0]}</span>
                    <input
                      type="number"
                      className="form-control"
                      id="units"
                      name={order[0]}
                      aria-label="Dollar amount (with dot and two decimal places)"
                      defaultValue={order[1]}
                      min="0"
                      max="100"
                      onChange={handleInputChange}
                    />
                    <span class="input-group-text opacity">{order[2]}€ x ud.</span>
                  </div>
                  :
                  <div className="topayForm">
                    <span class="input-group-text opacity">{order[0]}</span>
                    <input
                      id="productUnits"
                      type="number"
                      class="form-control opacity"
                      name={order[0]}
                      aria-label="Dollar amount (with dot and two decimal places)"
                      defaultValue={order[1]}
                      min="0"
                      max="100"
                      readOnly
                    />

                    <input type="hidden" value={tableId} name="id"></input>

                    <span className="input-group-text opacity" id="productTotal" > {parseInt(order[1]) * order[2]} €  </span>

                  </div>}
              </div>
            </div>
          );
        })}
        {isLoggedIn ? <><Button onClick={modifyTotal}>Actualizar cuenta</Button> </>
          : <Button className="btn-primary" href="/payment-gateway">Proceder a pago</Button>}
      </form>

      {isLoggedIn && <Button onClick={resetTable}>Resetear mesa pagada</Button>}
    </>
  );
};

export default FinalOrder;
