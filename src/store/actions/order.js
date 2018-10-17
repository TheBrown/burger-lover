import * as actionType from "./actionTypes";
import axios from "../../axios-orders";
export const purchageBurgerSuccess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionType.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionType.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(res => {
        console.log(res.data);
        dispatch(purchageBurgerSuccess(res.data.name, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionType.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionType.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionType.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionType.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json?auth=" + token)
      .then(res => {
        const fetchedOrder = [];
        for (let key in res.data) {
          fetchedOrder.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedOrder));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  }
}
