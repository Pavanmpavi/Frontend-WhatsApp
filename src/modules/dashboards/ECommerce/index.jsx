import React, { useState,useEffect  } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  IconButton,
  Badge,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  Button,
  Paper,
  Alert,
  List, ListItem, ListItemText,
  Tabs,
  Tab,
  CircularProgress,
  Snackbar
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  AccessTime as PendingIcon,
  CheckCircle as CompletedIcon,
  Cancel as RejectedIcon,
  Restaurant as RestaurantIcon,
  Person as PersonIcon,
  Schedule as ClockIcon,
  LocalFireDepartment as UrgentIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useRestaurantOrders, useUpdateOrderStatus } from '../../../hooks/useOrders';

// Status mapping based on your actual database enum values
const statusMap = {
  'PENDING_PAYMENT': 'pending',
  'CONFIRMED': 'pending',
  'IN_QUEUE': 'preparing',
  'STARTED': 'preparing',
  'COMPLETED': 'completed',
  'CANCELLED': 'cancelled'
};

// Reverse status mapping for API calls
const reverseStatusMap = {
  'pending': 'IN_QUEUE',     // When accepting pending order, move to IN_QUEUE
  'preparing': 'STARTED',    // When starting preparation, move to STARTED
  'ready': 'COMPLETED'       // When order is ready, complete it
};

// Helper function to format order data
const formatOrderData = (apiOrder) => {
  const getAvatarFromName = (name) => {
    if (!name) return '👤';
    const names = name.split(' ');
    if (names.length > 1) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336', '#00bcd4'];
    return colors[Math.abs(hash) % colors.length];
  };

  const customerName = apiOrder.display_name || `Customer ${apiOrder.user_id}`;
  const avatarColor = stringToColor(customerName);

  return {
    id: `#${apiOrder.order_number?.replace('ORD-', '') || apiOrder.id}`,
    orderNumber: apiOrder.id,
    apiOrderId: apiOrder.id,
    date: formatTimeAgo(apiOrder.created_at),
    customer: { 
      name: customerName, 
      avatar: getAvatarFromName(customerName), 
      color: avatarColor 
    },
    items: apiOrder.items?.map(item => ({
      name: item.name,
      desc: item.options || 'Standard order',
      price: item.unit_price / 100,
      qty: item.qty,
      image: getFoodEmoji(item.name)
    })) || [],
    total: apiOrder.total_paise / 100,
    status: statusMap[apiOrder.status] || 'pending',
    preparationTime: estimatePreparationTime(apiOrder.items),
    tableNumber: `T${(apiOrder.id % 20) + 1}`,
    urgency: 'normal',
    originalData: apiOrder,
    originalStatus: apiOrder.status
  };
};

// Helper to get food emoji based on item name
const getFoodEmoji = (itemName) => {
  const name = itemName.toLowerCase();
  if (name.includes('burger')) return '🍔';
  if (name.includes('pizza')) return '🍕';
  if (name.includes('pasta')) return '🍝';
  if (name.includes('salad')) return '🥗';
  if (name.includes('coffee') || name.includes('cola')) return '🥤';
  if (name.includes('ice cream')) return '🍦';
  if (name.includes('cake')) return '🍰';
  if (name.includes('chicken')) return '🍗';
  if (name.includes('fish')) return '🐟';
  if (name.includes('rice')) return '🍚';
  if (name.includes('sushi')) return '🍣';
  if (name.includes('taco')) return '🌮';
  return '🍽️';
};

// Estimate preparation time based on items
const estimatePreparationTime = (items) => {
  if (!items || items.length === 0) return 15;
  
  const baseTime = 10;
  const itemTime = items.reduce((total, item) => {
    return total + (item.qty * 2);
  }, 0);
  
  return Math.min(baseTime + itemTime, 45);
};

// Format time ago from ISO string
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes === 1) return '1 min ago';
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours === 1) return '1 hour ago';
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return '1 day ago';
  return `${diffInDays} days ago`;
};

export default function RestaurantOrderDashboard() {
  const restaurantId = 1;
  const { data: ordersData, isLoading, error, refetch } = useRestaurantOrders(restaurantId);
  const updateOrderStatusMutation = useUpdateOrderStatus();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Format orders from API
  const orders = React.useMemo(() => {
    if (!ordersData?.data) return [];
    
    // Debug: log status mapping
    console.log('Available status mappings:', statusMap);
    console.log('Orders with original status:', ordersData.data.map(order => ({
      id: order.id,
      originalStatus: order.status,
      mappedStatus: statusMap[order.status] || 'pending'
    })));
    
    return ordersData.data.map(formatOrderData);
  }, [ordersData]);

  // Filter orders by search
  const filterOrders = (status) => {
    let filtered = orders.filter(order => order.status === status);
    
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
    }
    
    return filtered;
  };


  // Status update handler using mutation
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const apiStatus = reverseStatusMap[newStatus];
      
      if (!apiStatus) {
        const errorMsg = `Invalid status transition: ${newStatus}. Available transitions: ${JSON.stringify(reverseStatusMap)}`;
        setErrorMessage(errorMsg);
        setShowError(true);
        console.error(errorMsg);
        return;
      }

      console.log(`Updating order ${orderId} from frontend status '${newStatus}' to API status '${apiStatus}'`);

      await updateOrderStatusMutation.mutateAsync({
        orderId: orderId,
        status: apiStatus
      });

      // Refetch orders to get updated data
      refetch();
      
    } catch (error) {
      const errorMsg = `Failed to update order status: ${error.response?.data?.error || error.message}`;
      setErrorMessage(errorMsg);
      setShowError(true);
      console.error('Failed to update order status:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedOrder(null);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  // Right click handler to accept pending orders
  const handleRightClick = (order, event) => {
    event.preventDefault();
    if (order.status === 'pending') {
      updateOrderStatus(order.apiOrderId, 'preparing');
    }
  };

  const pendingOrders = filterOrders('pending');
  const preparingOrders = filterOrders('preparing');
  const completedOrders = filterOrders('completed');

  // Combine pending and preparing orders for "In Progress" tab
  const inProgressOrders = [...pendingOrders, ...preparingOrders].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return new Date(b.originalData.created_at) - new Date(a.originalData.created_at);
  });

  // Status action buttons based on current status
  const StatusActions = ({ order }) => {
    const isUpdating = updateOrderStatusMutation.isPending;

    // Show debug info
    console.log(`Order ${order.id}:`, {
      frontendStatus: order.status,
      originalStatus: order.originalStatus,
      nextAction: reverseStatusMap[order.status]
    });

    switch (order.status) {
      case 'pending':
        return (
          <Box sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<CheckIcon />}
              onClick={(e) => {
                e.stopPropagation();
                updateOrderStatus(order.apiOrderId, 'preparing');
              }}
              disabled={isUpdating}
            >
              {isUpdating ? 'Accepting...' : 'Accept Order'}
            </Button>
           
          </Box>
        );
      case 'preparing':
        return (
          <Box display="flex" gap={1} sx={{ mt: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<CheckIcon />}
              onClick={(e) => {
                e.stopPropagation();
                updateOrderStatus(order.apiOrderId, 'ready');
              }}
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Ready to pickup'}
            </Button>
           
          </Box>
        );
      case 'ready':
        return (
          <Box display="flex" gap={1} sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={(e) => {
                e.stopPropagation();
                updateOrderStatus(order.apiOrderId, 'preparing');
              }}
              disabled={isUpdating}
            >
              Back to Queue
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              startIcon={<CheckIcon />}
              onClick={(e) => {
                e.stopPropagation();
                updateOrderStatus(order.apiOrderId, 'completed');
              }}
              disabled={isUpdating}
            >
              {isUpdating ? 'Completing...' : 'Complete Order'}
            </Button>
            <Typography variant="caption" display="block" sx={{ mt: 0.5, color: 'text.secondary' }}>
              Will move to: COMPLETED
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading orders...
        </Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error loading orders: {error.message}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => refetch()} 
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // Compact Order Card Component
  const OrderCard = ({ order, onClick }) => (
    <Card
      onClick={() => onClick && onClick(order)}
      onContextMenu={(e) => handleRightClick(order, e)}
      sx={{
        mb: 2,
        border: order.status === 'pending' ? '2px solid #ff9800' : '1px solid #e0e0e0',
        borderRadius: 3,
        backgroundColor: order.status === 'pending' ? '#fff3e0' : '#ffffff',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      {/* Order Header */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        p={2}
        sx={{ 
          backgroundColor: order.status === 'pending' ? '#ffecb3' : '#f8f9fa',
          borderBottom: order.status === 'pending' ? '2px solid #ff9800' : '1px solid #e0e0e0'
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h4" fontWeight="bold">
            {order.id}
          </Typography>
          {order.status === 'pending' && (
            <Chip 
              label="NEW" 
              size="small" 
              color="warning"
              sx={{ height: 20, fontSize: '0.65rem' }}
            />
          )}
          {order.status === 'preparing' && (
            <Chip 
              label={order.originalStatus === 'IN_QUEUE' ? 'IN QUEUE' : 'Preparing'} 
              size="small" 
              color="info"
              sx={{ height: 20, fontSize: '0.65rem' }}
            />
          )}
        </Box>
        <Avatar 
          sx={{ 
            width: 36, 
            height: 36,
            bgcolor: order.customer.color,
            fontSize: '1.2rem'
          }}
        >
          {order.customer.avatar}
        </Avatar>
      </Box>

      <Box p={2}>
        {/* Customer Name and Time */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body2" fontWeight="600" color="text.primary">
            {order.customer.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {order.date}
          </Typography>
        </Box>

        {/* Order Items */}
        <Stack spacing={1.5}>
          {order.items.map((item, index) => (
            <Box 
              key={index}
              display="flex" 
              alignItems="center" 
              gap={1.5}
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: '#f8f9fa',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: '#e9ecef',
                }
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  flexShrink: 0
                }}
              >
                {item.image}
              </Box>
              
              <Box flex={1}>
                <Typography variant="h5" fontWeight="600" sx={{ mb: 0.25 }}>
                  {item.name}
                </Typography>
            
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5}>
                  <Typography variant="body2" fontWeight="bold" color="primary">
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Chip 
                    label={`Qty: ${item.qty}`} 
                    size="small" 
                    variant="outlined"
                    sx={{ height: 20, fontSize: '0.65rem' }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>

        {/* Status Actions */}
        <StatusActions order={order} />
      </Box>
    </Card>
  );

  // Order Detail View Component
  const OrderDetailView = ({ order, onBack }) => (
    <Box>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={onBack}
        sx={{ mb: 2 }}
      >
        Back to List
      </Button>
      
      <Card sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" fontWeight="bold">
            {order.id}
          </Typography>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40,
              bgcolor: order.customer.color,
              fontSize: '1.3rem'
            }}
          >
            {order.customer.avatar}
          </Avatar>
        </Box>

        <Box mb={2}>
          <Typography variant="body1" fontWeight="600">
            Customer: {order.customer.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Table: {order.tableNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ordered: {order.date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current Status: {order.originalStatus}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Estimated Prep Time: {order.preparationTime} min
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" fontWeight="bold" mb={2}>
          Order Items
        </Typography>

        <Stack spacing={2}>
          {order.items.map((item, index) => (
            <Box 
              key={index}
              display="flex" 
              alignItems="center" 
              gap={2}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: '#f8f9fa',
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  flexShrink: 0
                }}
              >
                {item.image}
              </Box>
              
              <Box flex={1}>
                <Typography variant="body1" fontWeight="600">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Chip 
                    label={`Quantity: ${item.qty}`} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Total Amount:
          </Typography>
          <Typography variant="h5" fontWeight="bold" color="primary">
            ${order.total.toFixed(2)}
          </Typography>
        </Box>

        {/* Status Actions in Detail View */}
        <Box mt={3} display="flex" justifyContent="center">
          <StatusActions order={order} />
        </Box>
      </Card>
    </Box>
  );

  // Column Component
  const OrderColumn = ({ title, count, orders, icon, color, description, status }) => (
    <Paper sx={{ 
        p: 5, 
        height: '92vh', 
        backgroundColor: 'white'
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center" gap={1}>
          {icon}
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {title}
            </Typography>
          </Box>
        </Box>
        <Chip 
          label={count} 
          size="small"
        />
      </Box>
      
      <Box 
        sx={{ 
          maxHeight: 'calc(100vh - 120px)',
          overflow: 'auto',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: 3 },
          '&::-webkit-scrollbar-thumb': { background: '#c1c1c1', borderRadius: 3 },
          minHeight: 100
        }}
      >
        {orders.length > 0 ? (
          orders.map(order => (
            <OrderCard 
              key={order.apiOrderId} 
              order={order} 
              onClick={isMobile ? handleOrderClick : null}
            />
          ))
        ) : (
          <Box 
            textAlign="center" 
            py={4} 
            color="text.secondary"
            sx={{ 
              border: '2px dashed #e0e0e0',
              borderRadius: 1,
              backgroundColor: '#fafafa'
            }}
          >
            <Typography variant="h3" sx={{ opacity: 0.3, mb: 1 }}>
              {icon}
            </Typography>
            <Typography variant="body2">
              No orders in this status
            </Typography>
            <Typography variant="caption" display="block" mt={1}>
              {description}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );

  // Mobile Tabs View
  const MobileTabsView = () => (
    <Box>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 1 }}
      >
        <Tab 
          label={`In Progress (${inProgressOrders.length})`}
          sx={{ textTransform: 'none' }}
        />
        <Tab 
          label={`Completed (${completedOrders.length})`}
          sx={{ textTransform: 'none' }}
        />
      </Tabs>

      {selectedTab === 0 && (
        <Box>
          {inProgressOrders.length > 0 ? (
            inProgressOrders.map(order => (
              <OrderCard 
                key={order.apiOrderId} 
                order={order} 
                onClick={handleOrderClick}
              />
            ))
          ) : (
            <Box textAlign="center" py={4} color="text.secondary">
              <Typography>No orders in progress</Typography>
            </Box>
          )}
        </Box>
      )}

      {selectedTab === 1 && (
        <Box>
          {completedOrders.length > 0 ? (
            completedOrders.map(order => (
              <OrderCard 
                key={order.apiOrderId} 
                order={order} 
                onClick={handleOrderClick}
              />
            ))
          ) : (
            <Box textAlign="center" py={4} color="text.secondary">
              <Typography>No completed orders</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Box sx={{ maxWidth: 'xl', mx: 'auto' }}>
        {/* Show order detail if an order is selected on mobile */}
        {isMobile && selectedOrder ? (
          <OrderDetailView 
            order={selectedOrder} 
            onBack={handleBackToList}
          />
        ) : (
          <>
            {/* Desktop Kanban Board */}
            {!isMobile && (
              <Grid container spacing={3}>
                {/* In Progress Column */}
                <Grid item xs={12} md={6}>
                  <OrderColumn
                    title="In Progress"
                    count={inProgressOrders.length}
                    orders={inProgressOrders}
                    icon={<ClockIcon color="info" />}
                    color="info"
                    description="New orders and orders being prepared"
                    status="inProgress"
                  />
                </Grid>

                {/* Completed Column */}
                <Grid item xs={12} md={6}>
                  <OrderColumn
                    title="Completed"
                    count={completedOrders.length}
                    orders={completedOrders}
                    icon={<CompletedIcon color="success" />}
                    color="success"
                    description="Orders that have been completed"
                    status="completed"
                  />
                </Grid>
              </Grid>
            )}

            {/* Mobile Tabs View */}
            {isMobile && <MobileTabsView />}
          </>
        )}
      </Box>
    </Box>
  );
} 