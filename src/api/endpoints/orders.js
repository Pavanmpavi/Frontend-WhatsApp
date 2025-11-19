import axiosClient from '../axios/axiosClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

const orderAPI = {

  // Create new order
  createOrder: (orderData) => {
    return axiosClient.post(ENDPOINTS.ORDERS, orderData);
  },

  // Get orders for a restaurant (optionally by status)
  getOrdersByRestaurant: (restaurantId, status) => {
    let url = `${ENDPOINTS.ORDERS}/restaurant/${restaurantId}`;
    if (status) {
      url += `?status=${status}`;
    }
    return axiosClient.get(url);
  },

  // Update order status
  updateOrderStatus: (orderId, status) => {
    return axiosClient.patch(`${ENDPOINTS.ORDERS}/${orderId}/status`, { status });
  },

  // Get order by ID
  getOrderById: (orderId) => {
    return axiosClient.get(`${ENDPOINTS.ORDERS}/${orderId}`);
  },

  // (Optional) Delete order (only if you decide later)
  deleteOrder: (orderId) => {
    return axiosClient.delete(`${ENDPOINTS.ORDERS}/${orderId}`);
  },

};

export default orderAPI;
