// services/addressService.js
import API from "./api";

// ---------------- GET addresses ----------------
export const fetchUserAddresses = async () => {
  try {
    const res = await API.get("auth/address/");
    if (res.data.success) {
      return { success: true, addresses: res.data.data };
    }
    return { success: false, addresses: [] };
  } catch (err) {
    console.error("fetchUserAddresses error:", err.response?.data || err.message);
    return { success: false, addresses: [] };
  }
};

// ---------------- POST address ----------------
export const addUserAddress = async (addressData) => {
  try {
    const res = await API.post("auth/address/", addressData);
    if (res.data.success) {
      return { success: true, address: res.data.data };
    }
    return { success: false, address: null };
  } catch (err) {
    console.error("addUserAddress error:", err.response?.data || err.message);
    return { success: false, address: null };
  }
};

// ---------------- PATCH address ----------------
export const updateUserAddress = async (id, addressData) => {
  try {
    const res = await API.patch(`auth/address/${id}/`, addressData);
    if (res.data.success) {
      return { success: true, address: res.data.data };
    }
    return { success: false, address: null };
  } catch (err) {
    console.error("updateUserAddress error:", err.response?.data || err.message);
    return { success: false, address: null };
  }
};

// ---------------- DELETE address ----------------
export const deleteUserAddress = async (id) => {
  try {
    const res = await API.delete(`auth/address/${id}/`);
    if (res.data.success) {
      return { success: true, message: res.data.message };
    }
    return { success: false, message: "Failed to delete address" };
  } catch (err) {
    console.error("deleteUserAddress error:", err.response?.data || err.message);
    return { success: false, message: "Failed to delete address" };
  }
};