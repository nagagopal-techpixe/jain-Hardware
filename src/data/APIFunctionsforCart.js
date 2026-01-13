import API from "./api";

// Fetch full cart
export const getCart = async () => {
  try {
    const res = await API.get("order/cart/");
    return res.data;
  } catch (err) {
    console.error("getCart error:", err.response?.data || err.message);
    return { success: false, data: null };
  }
};

// Add product to cart
export const addToCart = async (product_type_id, quantity = 1) => {
  try {
    const res = await API.post("order/cart/", {
      product_type_id: Number(product_type_id),
      quantity: Number(quantity),
    });
    return res.data;
  } catch (err) {
    console.error("addToCart error:", err.response?.data || err.message);
    return { success: false, message: "Failed to add to cart" };
  }
};

// Update cart item quantity
export const updateCartItem = async (id, data) => {
  try {
    const res = await API.patch(`order/cart/${id}/`, {
      quantity: Number(data.quantity),
    });
    return res.data;
  } catch (err) {
    console.error("updateCartItem error:", err.response?.data || err.message);
    return { success: false, message: "Failed to update item" };
  }
};

// Delete cart item
export const deleteCartItem = async (id) => {
  try {
    const res = await API.delete(`order/cart/${id}/`);
    return res.data;
  } catch (err) {
    console.error("deleteCartItem error:", err.response?.data || err.message);
    return { success: false, message: "Failed to delete item" };
  }
};

// Place order (FIXED)
export const placeOrder = async (orderData) => {
  try {
    const res = await API.post("order/order/", orderData);
    return res.data;
  } catch (err) {
    console.error("placeOrder error:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.message || "Order failed",
    };
  }
};


// Fetch user's orders
export const fetchOrders = async () => {
  try {
    const res = await API.get("order/order/");
    console.log(res.data)
    return res.data;
  } catch (err) {
    console.error("fetchOrders error:", err.response?.data || err.message);
    return { success: false, orders: [] };
  }
};

