// services/addressService.js
import API from "./api";

// GET addresses
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

// POST address
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