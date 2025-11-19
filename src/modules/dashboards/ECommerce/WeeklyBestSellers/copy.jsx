import React, { useState } from 'react';
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
  Tab
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

// Updated dummy data with more realistic timestamps and urgency
const dummyOrders = [
  {
    id: '#346',
    orderNumber: 346,
    date: '2 min ago',
    customer: { name: 'John Doe', avatar: '👨', color: '#4caf50' },
    items: [
      { name: 'Vegetable Mixups', desc: 'Vegetable Fritters with Egg', price: 5.30, qty: 1, image: '🥗' },
      { name: 'Prawn Mix Salad', desc: 'Fresh Prawn mix salad', price: 5.30, qty: 1, image: '🍤' }
    ],
    total: 10.60,
    status: 'pending',
    preparationTime: 15,
    tableNumber: 'T12',
    urgency: 'normal'
  },
  {
    id: '#347',
    orderNumber: 347,
    date: 'Just now',
    customer: { name: 'Sarah Smith', avatar: '👩', color: '#2196f3' },
    items: [
      { name: 'Vegetable Mixups', desc: 'Vegetable Fritters with Egg', price: 6.30, qty: 1, image: '🥗' }
    ],
    total: 6.30,
    status: 'preparing',
    preparationTime: 8,
    tableNumber: 'T05',
    urgency: 'high'
  },
  {
    id: '#348',
    orderNumber: 348,
    date: '5 min ago',
    customer: { name: 'Mike Johnson', avatar: '👨', color: '#ff9800' },
    items: [
      { name: 'Fresh Meat', desc: 'Fresh Meat with salad', price: 25.30, qty: 1, image: '🍖' },
      { name: 'Vegetable Mixups', desc: 'Vegetable Fritters with Egg', price: 6.30, qty: 1, image: '🥗' }
    ],
    total: 31.60,
    status: 'preparing',
    preparationTime: 25,
    tableNumber: 'T08',
    urgency: 'normal'
  },
  {
    id: '#349',
    orderNumber: 349,
    date: '8 min ago',
    customer: { name: 'Emma Wilson', avatar: '👩', color: '#9c27b0' },
    items: [
      { name: 'Vegetable Mixups', desc: 'Vegetable Fritters with Egg', price: 5.30, qty: 1, image: '🥗' },
      { name: 'Prawn Mix Salad', desc: 'Fresh Prawn mix salad', price: 5.30, qty: 1, image: '🍤' }
    ],
    total: 10.60,
    status: 'ready',
    preparationTime: 12,
    tableNumber: 'T03',
    urgency: 'normal'
  },
  {
    id: '#350',
    orderNumber: 350,
    date: '10 min ago',
    customer: { name: 'David Brown', avatar: '👨', color: '#f44336' },
    items: [
      { name: 'Fresh Meat', desc: 'Fresh Meat with salad', price: 25.30, qty: 1, image: '🍖' }
    ],
    total: 25.30,
    status: 'preparing',
    preparationTime: 20,
    tableNumber: 'T15',
    urgency: 'high'
  }
];

export default function RestaurantOrderDashboard() {
  const [orders, setOrders] = useState(dummyOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  // Status update handlers
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedOrder(null); // Reset selected order when changing tabs
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  // Right click handler to accept pending orders
  const handleRightClick = (order, event) => {
    event.preventDefault();
    if (order.status === 'pending') {
      updateOrderStatus(order.id, 'preparing');
    }
  };

  const pendingOrders = filterOrders('pending');
  const preparingOrders = filterOrders('preparing');
  const readyOrders = filterOrders('ready');

  // Combine pending and preparing orders for "In Progress" tab
  const inProgressOrders = [...pendingOrders, ...preparingOrders].sort((a, b) => {
    // Sort by status (pending first) then by date (newest first)
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return new Date(b.date) - new Date(a.date);
  });

  // Status action buttons based on current status
  const StatusActions = ({ order }) => {
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
                updateOrderStatus(order.id, 'preparing');
              }}
            >
              Accept Order
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
                updateOrderStatus(order.id, 'ready');
              }}
            >
              Mark as Ready
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
                updateOrderStatus(order.id, 'preparing');
              }}
            >
              Back to Progress
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              startIcon={<CheckIcon />}
              onClick={(e) => {
                e.stopPropagation();
                // In a real app, this would complete the order
                alert(`Order ${order.id} completed!`);
              }}
            >
              Complete Order
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  // Compact Order Card Component with status buttons
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
      {/* Order Header with Customer Avatar */}
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
            Order {order.id}
          </Typography>
          {order.status === 'pending' && (
            <Chip 
              label="NEW" 
              size="small" 
              color="warning"
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

       

        {/* Order Items with Images */}
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
              {/* Food Image */}
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
              
              {/* Item Details */}
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

        {/* Total Amount */}
        {/* <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={1}>
          <Typography variant="body1" fontWeight="bold">
            Total:
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="primary">
            ${order.total.toFixed(2)}
          </Typography>
        </Box> */}

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
            Order {order.id}
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
            Status: {order.status === 'pending' ? 'New Order' : order.status}
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
              key={order.id} 
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
          label={`Ready (${readyOrders.length})`}
          sx={{ textTransform: 'none' }}
        />
      </Tabs>

      {selectedTab === 0 && (
        <Box>
          {inProgressOrders.length > 0 ? (
            inProgressOrders.map(order => (
              <OrderCard 
                key={order.id} 
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
          {readyOrders.length > 0 ? (
            readyOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onClick={handleOrderClick}
              />
            ))
          ) : (
            <Box textAlign="center" py={4} color="text.secondary">
              <Typography>No orders ready</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
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
                {/* In Progress Column (includes pending orders) */}
                <Grid item xs={12} md={6}>
                  <OrderColumn
                    title="In Progress"
                    count={inProgressOrders.length}
                    orders={inProgressOrders}
                    icon={<ClockIcon color="info" />}
                    color="info"
                    description="Right click new orders to accept"
                    status="inProgress"
                  />
                </Grid>

                {/* Ready for Pickup Column */}
                <Grid item xs={12} md={6}>
                  <OrderColumn
                    title="Ready"
                    count={readyOrders.length}
                    orders={readyOrders}
                    icon={<CompletedIcon color="success" />}
                    color="success"
                    description="Complete when served to customer"
                    status="ready"
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