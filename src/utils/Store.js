import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();

// Cookies are only readable in the browser. During SSR every slice starts
// empty and is filled in on the client, which is what `useMounted` guards.
function readCookie(key, fallback) {
  if (typeof window === "undefined") return fallback;
  const raw = Cookies.get(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    // A corrupt cookie used to throw during module evaluation and take the
    // whole app down with it.
    Cookies.remove(key);
    return fallback;
  }
}

const initialState = {
  cart: {
    cartItems: readCookie("cartItems", []),
    shippingAddress: readCookie("shippingAddress", {}),
  },
  billingAddress: readCookie("billingAddress", null),
  paymentInfo: readCookie("paymentInfo", null),
  userInfo: readCookie("userInfo", null),
};

function persist(key, value) {
  Cookies.set(key, JSON.stringify(value), { expires: 30, sameSite: "lax" });
}

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id,
      );
      // Matching on `_id` rather than the old `item.name === existItem.name`,
      // which replaced every item sharing a name.
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item,
          )
        : [...state.cart.cartItems, newItem];
      persist("cartItems", cartItems);
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id,
      );
      persist("cartItems", cartItems);
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_CLEAR": {
      Cookies.remove("cartItems");
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    case "SAVE_SHIPPING_ADDRESS": {
      persist("shippingAddress", action.payload);
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    }

    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };

    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
        billingAddress: null,
        paymentInfo: null,
        cart: { cartItems: [], shippingAddress: {} },
      };

    case "BILLING_ADDRESS":
      return { ...state, billingAddress: action.payload };

    case "PAYMENT_DETAILS":
      return { ...state, paymentInfo: action.payload };

    // The old default arm was a bare `state;` expression with no `return`, so
    // any unrecognised action wiped the entire store to `undefined`.
    default:
      return state;
  }
}

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
