// import React from 'react';
// import { Grid } from '@mui/material';
// import AppGridContainer from '@crema/components/AppGridContainer';
// import AppAnimate from '@crema/components/AppAnimate';
// import { useGetDataApi } from '@crema/hooks/APIHooks';
// import TicketsSupport from './TicketsSupport';
// import InfoWidget from './InfoWidget';
// import PageVisits from './PageVisits';
// import OrderNTransaction from './OrderNTransaction';
// import TrafficSource from './TrafficSource';
// import TopSelling from './TopSelling';
// import VisitorPageView from './VisitorPageView';
// import SalesState from './SalesState';
// import StateCard from './StateCards';
// import WelcomeCard from './WelcomeCard';
// import ActiveVisitors from './ActiveVisitors';
// import AppLoader from '@crema/components/AppLoader';

// const Analytics = () => {
//   const [{ apiData: analyticsData, loading }] = useGetDataApi('/dashboard/analytics');

//   return (
//     <>
//       {loading ? (
//         <AppLoader />
//       ) : (
//         <AppAnimate animation="transition.slideUpIn" delay={200}>
//           <AppGridContainer>
//             <Grid item xs={12} lg={6}>
//               <WelcomeCard data={analyticsData.welcomeCard} />

//               <AppGridContainer>
//                 <Grid item xs={12} sm={6}>
//                   <StateCard data={analyticsData.revenueCards[0]} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <StateCard data={analyticsData.revenueCards[1]} />
//                 </Grid>
//               </AppGridContainer>
//             </Grid>
//             <Grid item xs={12} lg={6}>
//               <SalesState salesState={analyticsData.salesState} chartData={analyticsData.salesChartData} />
//             </Grid>
//             <Grid item xs={12} md={8} xl={9}>
//               <VisitorPageView data={analyticsData.visitorsPageView} />
//             </Grid>
//             <Grid item xs={12} md={4} xl={3}>
//               <ActiveVisitors data={analyticsData.activeVisitors} />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TicketsSupport tickets={analyticsData.tickets} />

//               <AppGridContainer>
//                 {analyticsData.infoWidgets.map((data, index) => (
//                   <Grid item xs={12} md={4} key={'grid-' + index}>
//                     <InfoWidget data={data} />
//                   </Grid>
//                 ))}
//               </AppGridContainer>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <PageVisits pageVisits={analyticsData.pageVisits} />
//             </Grid>
//             <Grid item xs={12} md={9}>
//               <OrderNTransaction transactionData={analyticsData.transactionData} />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TrafficSource trafficData={analyticsData.trafficData} />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TopSelling products={analyticsData.topSellingProduct} />
//             </Grid>
//           </AppGridContainer>
//         </AppAnimate>
//       )}
//     </>
//   );
// };

// export default Analytics;
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Restaurant as RestaurantIcon,
  AttachMoney as MoneyIcon,
  ShoppingCart as OrderIcon,
  People as PeopleIcon,
  LocalDining as DiningIcon,
  Star as StarIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  DateRange as DateRangeIcon,
  CheckCircle as CompletedIcon,
  AccessTime as TimeIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';

// Dummy completed orders data
const completedOrdersData = [
  {
    id: '#346',
    orderNumber: 346,
    date: '2024-11-13',
    time: '14:30',
    customer: { name: 'John Doe', avatar: '👨', color: '#4caf50' },
    items: 3,
    total: 45.60,
    paymentMethod: 'Card',
    tableNumber: 'T12',
    rating: 5,
    duration: '25 min'
  },
  {
    id: '#345',
    orderNumber: 345,
    date: '2024-11-13',
    time: '14:15',
    customer: { name: 'Sarah Smith', avatar: '👩', color: '#2196f3' },
    items: 2,
    total: 32.50,
    paymentMethod: 'Cash',
    tableNumber: 'T05',
    rating: 4,
    duration: '20 min'
  },
  {
    id: '#344',
    orderNumber: 344,
    date: '2024-11-13',
    time: '14:00',
    customer: { name: 'Mike Johnson', avatar: '👨', color: '#ff9800' },
    items: 5,
    total: 78.90,
    paymentMethod: 'Card',
    tableNumber: 'T08',
    rating: 5,
    duration: '30 min'
  },
  {
    id: '#343',
    orderNumber: 343,
    date: '2024-11-13',
    time: '13:45',
    customer: { name: 'Emma Wilson', avatar: '👩', color: '#9c27b0' },
    items: 2,
    total: 28.40,
    paymentMethod: 'Card',
    tableNumber: 'T03',
    rating: 5,
    duration: '18 min'
  },
  {
    id: '#342',
    orderNumber: 342,
    date: '2024-11-13',
    time: '13:30',
    customer: { name: 'David Brown', avatar: '👨', color: '#f44336' },
    items: 4,
    total: 56.20,
    paymentMethod: 'Cash',
    tableNumber: 'T15',
    rating: 4,
    duration: '28 min'
  },
  {
    id: '#341',
    orderNumber: 341,
    date: '2024-11-13',
    time: '13:15',
    customer: { name: 'Lisa Anderson', avatar: '👩', color: '#00bcd4' },
    items: 3,
    total: 42.80,
    paymentMethod: 'Card',
    tableNumber: 'T07',
    rating: 5,
    duration: '22 min'
  },
  {
    id: '#340',
    orderNumber: 340,
    date: '2024-11-13',
    time: '13:00',
    customer: { name: 'Robert Taylor', avatar: '👨', color: '#8bc34a' },
    items: 2,
    total: 35.60,
    paymentMethod: 'Cash',
    tableNumber: 'T11',
    rating: 3,
    duration: '25 min'
  },
  {
    id: '#339',
    orderNumber: 339,
    date: '2024-11-13',
    time: '12:45',
    customer: { name: 'Jennifer Lee', avatar: '👩', color: '#ff5722' },
    items: 4,
    total: 64.30,
    paymentMethod: 'Card',
    tableNumber: 'T02',
    rating: 5,
    duration: '27 min'
  }
];

export default function RestaurantAnalyticsDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('today');

  // Analytics Stats Component
  const StatCard = ({ title, value, change, icon, color, subtitle }) => (
    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
            <Box display="flex" alignItems="center" gap={0.5} mt={1}>
              {change >= 0 ? (
                <TrendingUpIcon sx={{ fontSize: 16, color: '#4caf50' }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: 16, color: '#f44336' }} />
              )}
              <Typography 
                variant="caption" 
                sx={{ 
                  color: change >= 0 ? '#4caf50' : '#f44336',
                  fontWeight: 600
                }}
              >
                {change >= 0 ? '+' : ''}{change}% from yesterday
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `${color}15`,
              color: color
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  // Popular Items Component
  const PopularItemCard = ({ name, orders, revenue, image, trend }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: '#f8f9fa',
        mb: 1.5,
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: '#e9ecef',
          transform: 'translateX(4px)'
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
        {image}
      </Box>
      <Box flex={1}>
        <Typography variant="body2" fontWeight="600">
          {name}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mt={0.5}>
          <Typography variant="caption" color="text.secondary">
            {orders} orders
          </Typography>
          <Typography variant="caption" color="text.secondary">
            •
          </Typography>
          <Typography variant="caption" fontWeight="600" color="primary">
            ${revenue}
          </Typography>
        </Box>
      </Box>
      <Chip 
        label={`${trend >= 0 ? '+' : ''}${trend}%`}
        size="small"
        sx={{
          backgroundColor: trend >= 0 ? '#e8f5e9' : '#ffebee',
          color: trend >= 0 ? '#4caf50' : '#f44336',
          fontWeight: 600
        }}
      />
    </Box>
  );

  // Filter completed orders
  const filteredOrders = completedOrdersData.filter(order => {
    if (!searchQuery) return true;
    return (
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* Header */}
        <Box mb={4}>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <RestaurantIcon sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h4" fontWeight="bold">
              Restaurant Analytics
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Monitor your restaurant performance and completed orders
          </Typography>
        </Box>

        {/* Analytics Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Revenue"
              value="$12,458"
              change={12.5}
              icon={<MoneyIcon sx={{ fontSize: 28 }} />}
              color="#4caf50"
              subtitle="Today's earnings"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Orders"
              value="156"
              change={8.2}
              icon={<OrderIcon sx={{ fontSize: 28 }} />}
              color="#2196f3"
              subtitle="Completed today"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Avg Order Value"
              value="$79.86"
              change={5.4}
              icon={<ReceiptIcon sx={{ fontSize: 28 }} />}
              color="#ff9800"
              subtitle="Per order"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Customer Rating"
              value="4.8"
              change={2.1}
              icon={<StarIcon sx={{ fontSize: 28 }} />}
              color="#ffc107"
              subtitle="Average rating"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Popular Items */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={3}>
                  <DiningIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    Popular Items
                  </Typography>
                </Box>
                <Stack spacing={0}>
                  <PopularItemCard
                    name="Fresh Meat Special"
                    orders={45}
                    revenue="1,234"
                    image="🍖"
                    trend={15}
                  />
                  <PopularItemCard
                    name="Vegetable Mixups"
                    orders={38}
                    revenue="856"
                    image="🥗"
                    trend={8}
                  />
                  <PopularItemCard
                    name="Prawn Mix Salad"
                    orders={32}
                    revenue="742"
                    image="🍤"
                    trend={-3}
                  />
                  <PopularItemCard
                    name="Grilled Salmon"
                    orders={28}
                    revenue="658"
                    image="🐟"
                    trend={12}
                  />
                  <PopularItemCard
                    name="Caesar Salad"
                    orders={24}
                    revenue="489"
                    image="🥙"
                    trend={5}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Performance Metrics */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={3}>
                  <TrendingUpIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    Performance Metrics
                  </Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 3 }}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          Order Completion Rate
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          94%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={94} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#4caf50'
                          }
                        }} 
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          Table Occupancy
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          78%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={78} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#2196f3'
                          }
                        }} 
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          Kitchen Efficiency
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          88%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={88} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#ff9800'
                          }
                        }} 
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 3 }}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          Customer Satisfaction
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          96%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={96} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#ffc107'
                          }
                        }} 
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          Staff Performance
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          85%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={85} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#9c27b0'
                          }
                        }} 
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          Online Orders
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          65%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={65} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#00bcd4'
                          }
                        }} 
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Quick Stats */}
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h5" fontWeight="bold" color="primary">
                        23 min
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Avg Prep Time
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h5" fontWeight="bold" color="primary">
                        1,234
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Items Sold
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h5" fontWeight="bold" color="primary">
                        18
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Active Tables
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h5" fontWeight="bold" color="primary">
                        456
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Customers
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Completed Orders Table */}
        <Card sx={{ mt: 3, borderRadius: 2, boxShadow: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <CompletedIcon color="success" />
                <Typography variant="h6" fontWeight="bold">
                  Completed Orders
                </Typography>
                <Chip 
                  label={`${completedOrdersData.length} orders`}
                  size="small"
                  color="success"
                />
              </Box>
              
              <Box display="flex" gap={2} alignItems="center">
                <TextField
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="small"
                  sx={{ minWidth: 250 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={filterPeriod}
                    onChange={(e) => setFilterPeriod(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <DateRangeIcon fontSize="small" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="week">This Week</MenuItem>
                    <MenuItem value="month">This Month</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                    <TableCell><strong>Order ID</strong></TableCell>
                    <TableCell><strong>Customer</strong></TableCell>
                    <TableCell><strong>Date & Time</strong></TableCell>
                    <TableCell align="center"><strong>Items</strong></TableCell>
                    <TableCell align="center"><strong>Table</strong></TableCell>
                    <TableCell><strong>Payment</strong></TableCell>
                    <TableCell align="center"><strong>Duration</strong></TableCell>
                    <TableCell align="center"><strong>Rating</strong></TableCell>
                    <TableCell align="right"><strong>Total</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow 
                      key={order.id}
                      sx={{ 
                        '&:hover': { backgroundColor: '#f8f9fa' },
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight="600" color="primary">
                          {order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32,
                              bgcolor: order.customer.color,
                              fontSize: '1rem'
                            }}
                          >
                            {order.customer.avatar}
                          </Avatar>
                          <Typography variant="body2">
                            {order.customer.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {order.date}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.time}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={order.items}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={order.tableNumber}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order.paymentMethod}
                          size="small"
                          color={order.paymentMethod === 'Card' ? 'primary' : 'default'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                          <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {order.duration}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                          <StarIcon sx={{ fontSize: 16, color: '#ffc107' }} />
                          <Typography variant="body2" fontWeight="600">
                            {order.rating.toFixed(1)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="bold" color="primary">
                          ${order.total.toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box mt={3} pt={2} borderTop="1px solid #e0e0e0">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Total Orders:
                    </Typography>
                    <Typography variant="body2" fontWeight="600">
                      {filteredOrders.length}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Total Items:
                    </Typography>
                    <Typography variant="body2" fontWeight="600">
                      {filteredOrders.reduce((sum, order) => sum + order.items, 0)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Total Revenue:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary">
                      ${filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}