// import React from "react";
// import ReactDOM from "react-dom/client";
// const redux = require("redux");
// const createStore = redux.createStore;

// const BUY_CAKE = "BUY_CAKE";
// const BUY_ICECREAMS = "BUY_ICECREAMS";
// function buyCake() {
//   return {
//     type: BUY_CAKE,
//     info: "FirstAction",
//   };
// }
// function buyIceCream() {
//   return {
//     type: BUY_ICECREAMS,
//     info: "SecondAction",
//   };
// }
// const initialState = {
//   numberOfCakes: 10,
//   numberOfIceCreams: 20,
// };
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state,
//         numberOfCakes: state.numberOfCakes - 1,
//       };
//     case BUY_ICECREAMS:
//       return {
//         ...state,
//         numberOfIceCreams: state.numberOfIceCreams - 1,
//       };
//     default:
//       return state;
//   }
// };
// const store = createStore(reducer);
// console.log("initialstate", store.getState());
// const unSubscribe = store.subscribe(() => {
//   console.log("updated state", store.getState());
// });
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyIceCream());
// console.log("afterbuyingCake", store.getState());
// unSubscribe();
// console.log("unsubscribe", store.getState());
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//Now in the next approach make the separate reduces for the ice cream and the cakes and also make the separate
//initial state for both of them
import React from "react";
import ReactDOM from "react-dom/client";
const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const reduxLogger = require("redux-logger");
const applyMiddleware = redux.applyMiddleware;
const Logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAMS = "BUY_ICECREAMS";
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "FirstAction",
  };
}
function buyIceCream() {
  return {
    type: BUY_ICECREAMS,
    info: "SecondAction",
  };
}
const initialStateOfIceCreams = {
  numberOfIceCreams: 10,
};
const initialStateofCakes = {
  numberOfCakes: 10,
};
const cakeReducer = (state = initialStateofCakes, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };

    default:
      return state;
  }
};
const iceCreamReducer = (state = initialStateOfIceCreams, action) => {
  switch (action.type) {
    case BUY_ICECREAMS:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams - 1,
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
//create store always take one parameter for the reducer
const store = createStore(rootReducer, applyMiddleware(Logger));
console.log("initialstate", store.getState());
const unSubscribe = store.subscribe(() => {
  //after adding the middleware
  //  console.log("updated state", store.getState());
});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
console.log("afterbuyingCake", store.getState());
unSubscribe();
console.log("unsubscribe", store.getState());
