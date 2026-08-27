import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Store } from "./Store";

/**
 * Single entry point for cart mutations.
 *
 * Previously every card, category page and detail page re-implemented its own
 * `addToCartHandler`, each one calling `window.alert()` on failure and one of
 * them (category/barger.js) referencing an undefined `food` variable, which
 * threw on every click. This centralises the stock check, the toast feedback
 * and the pending state.
 */
export function useCart() {
  const { state, dispatch } = useContext(Store);
  const [pending, setPending] = useState<string | null>(null);

  const cartItems = state.cart.cartItems;

  const quantityOf = (id: string) =>
    cartItems.find((item: any) => item._id === id)?.quantity ?? 0;

  async function addToCart(food: any, quantity = 1) {
    setPending(`cart-${food._id}`);
    try {
      // Confirm stock against the server rather than the possibly stale copy
      // rendered into the page.
      const { data } = await axios.get(`/api/foods/${food._id}`);
      const inStock = data?.countInStock ?? food.countInStock ?? 0;
      const existing = quantityOf(food._id);
      const next = existing + quantity;

      if (inStock < next) {
        toast.error(
          existing > 0
            ? `Only ${inStock} of ${food.name} left — you already have ${existing} in your basket.`
            : `Sorry, ${food.name} is out of stock right now.`,
        );
        return false;
      }

      dispatch({ type: "CART_ADD_ITEM", payload: { ...food, quantity: next } });
      toast.success(`${food.name} added to your basket.`);
      return true;
    } catch {
      toast.error("We couldn't add that to your basket. Please try again.");
      return false;
    } finally {
      setPending(null);
    }
  }

  async function setQuantity(food: any, quantity: number) {
    if (quantity < 1) return removeFromCart(food);
    setPending(`qty-${food._id}`);
    try {
      const { data } = await axios.get(`/api/foods/${food._id}`);
      const inStock = data?.countInStock ?? food.countInStock ?? 0;
      if (inStock < quantity) {
        toast.error(`Only ${inStock} of ${food.name} available.`);
        return false;
      }
      dispatch({ type: "CART_ADD_ITEM", payload: { ...food, quantity } });
      return true;
    } catch {
      toast.error("We couldn't update your basket. Please try again.");
      return false;
    } finally {
      setPending(null);
    }
  }

  function removeFromCart(food: any) {
    dispatch({ type: "CART_REMOVE_ITEM", payload: food });
    toast.info(`${food.name} removed from your basket.`);
  }

  return { cartItems, addToCart, setQuantity, removeFromCart, quantityOf, pending };
}
