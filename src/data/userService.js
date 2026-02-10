// userService.js
import API from "./api";

// Fetch logged-in user dynamically
export const fetchUser = async () => {
  try {
    const res = await API.get("auth/user/");
    if (res.data.success) {
      return { success: true, user: res.data.data };
    } else {
      return { success: false, user: null };
    }
  } catch (err) {
    console.error("fetchUser error:", err.response?.data || err.message);
    return { success: false, user: null };
  }
};
