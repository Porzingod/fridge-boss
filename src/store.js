import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'

// const routerMiddleware = (history) => () => (next) => ({type, payload}) => {
//   switch (type) {
//     case "ROUTER_PUSH":
//       history.historyPush(payload);
//       break;
//     case "ROUTER_REPLACE":
//       history.historyReplace(payload);
//       break;
//     case "ROUTER_GO":
//       history.historyGo(payload);
//       break;
//     case "ROUTER_GO_BACK":
//       history.historyGoBack();
//       break;
//     case "ROUTER_GO_FORWARD":
//       history.historyGoForward();
//       break;
//     default:
//       return next(action);
//   }
// };

const middleware = applyMiddleware(thunk)

const store = createStore(
  reducer,
  // compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f)
  compose(middleware)
)
export default store
