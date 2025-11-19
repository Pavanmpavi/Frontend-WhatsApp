import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import orderAPI from '../api/endpoints/orders';
import { API_MESSAGES } from '../api/constants/apiMessages';
import { useToast } from '../components/comman/GloabalToast/UseToast';

// 1️⃣ Fetch orders for a restaurant (optionally by status)
export const useRestaurantOrders = (restaurantId) => {
  const toast = useToast();

  return useQuery({
    queryKey: ['orders', restaurantId],
    queryFn: () => orderAPI.getOrdersByRestaurant(restaurantId),
    enabled: !!restaurantId,
    onError: (error) => {
      toast.error(error.response?.data?.message || API_MESSAGES.ERROR.NETWORK_ERROR);
    },
  });
};

// 2️⃣ Fetch order by ID
export const useOrderDetails = (orderId) => {
  const toast = useToast();

  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderAPI.getOrderById(orderId),
    enabled: !!orderId,
    onError: (error) => {
      toast.error(error.response?.data?.message || API_MESSAGES.ERROR.NETWORK_ERROR);
    },
  });
};

// 3️⃣ Create new order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (orderData) => orderAPI.createOrder(orderData),

    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      toast.success('Order created successfully');
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || API_MESSAGES.ERROR.VALIDATION_ERROR);
    },
  });
};

// 4️⃣ Update order status
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ orderId, status }) =>
      orderAPI.updateOrderStatus(orderId, status),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['order', variables.orderId]);
      queryClient.invalidateQueries(['orders']);
      toast.success(`Order status updated to ${variables.status}`);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || API_MESSAGES.ERROR.VALIDATION_ERROR);
    },
  });
};

// 5️⃣ Optional delete order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (orderId) => orderAPI.deleteOrder(orderId),

    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      toast.success('Order deleted');
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || API_MESSAGES.ERROR.NETWORK_ERROR);
    },
  });
};

export default {
  useRestaurantOrders,
  useOrderDetails,
  useCreateOrder,
  useUpdateOrderStatus,
  useDeleteOrder,
};
