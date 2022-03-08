import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import restaurantService from "../../../services/restaurant.services";
import { AuthContext } from "../../../context/auth.context";
import { useContext } from "react";

const FinalOrder = () => {
  const { id, tableId } = useParams();
  const [finalOrderData, setFinalOrderData] = useState([]);
  const [orderDataNoIds, setOrderDataNoIds] = useState([]);
  const [arrFinalOrder, setArrFinalOrder] = useState([]);
  const [menuData, setMenuData] = useState([]);

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
      .then((res) => setFinalOrderData(res.data.total.flat()))
      .catch((e) => console.log(e));
  }, []);

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
    restaurantService
      .getRestaurant({ _id: id })
      .then((res) => setMenuData(res.data.menu))
      .then(() => {
        arrOfObjects.forEach((elm, index) => {
          arrOfOrders.push(Object.entries(elm));
          menuData.forEach((menuItem) => {
            for (const property in menuItem) {
              if (menuItem.name === arrOfOrders[index][0][0]) {
                arrOfOrders[index][0].length < 3 &&
                  arrOfOrders[index][0].push(menuItem.price);
              }
            }
          });
        });
      })
      .then(() => setArrFinalOrder(arrOfOrders.flat()));
  };

  return (
    <>
      <h1>FINAL ORDER: PAGA CABRON</h1>

      <form
        className="foodList"
        method="POST"
        action="http://localhost:5005/api/update-total"
      >
        {arrFinalOrder.map((order) => {
          return (
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text">{order[0]}</span>
                <input
                  type="number"
                  class="form-control"
                  name={order[0]}
                  aria-label="Dollar amount (with dot and two decimal places)"
                  defaultValue={order[1]}
                  min="0"
                  max="100"
                />
                <input type="hidden" value={tableId} name="id"></input>
                <span class="input-group-text">€</span>
                <span class="input-group-text">
                  {parseInt(order[1]) * order[2]}
                </span>
              </div>
            </div>
          );
        })}
        {isLoggedIn ? <button>Acutualizar cuenta</button> : "boton del cliente"}
      </form>
    </>
  );
};

export default FinalOrder;
