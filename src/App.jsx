// import { BrowserRouter } from 'react-router-dom';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppContextProvider from '@crema/context/AppContextProvider';
// import AppThemeProvider from '@crema/context/AppThemeProvider';
// import AppStyleProvider from '@crema/context/AppStyleProvider';
// import AppLocaleProvider from '@crema/context/AppLocaleProvider';
// import InfoViewContextProvider from '@crema/context/AppContextProvider/InfoViewContextProvider';
// import AppAuthProvider from '@crema/core/AppAuthProvider';
// import AuthRoutes from '@crema/components/AuthRoutes';
// import AppLayout from '@crema/core/AppLayout';

// import '@crema/mockapi';
// import './styles/index.css';

// const App = () => {
//   return (
//     <>
//       <AppContextProvider>
//         <AppThemeProvider>
//           <AppStyleProvider>
//             <AppLocaleProvider>
//               <BrowserRouter>
//                 <InfoViewContextProvider>
//                   <AppAuthProvider>
//                     <AuthRoutes>
//                       <CssBaseline />
//                       <AppLayout />
//                     </AuthRoutes>
//                   </AppAuthProvider>
//                 </InfoViewContextProvider>
//               </BrowserRouter>
//             </AppLocaleProvider>
//           </AppStyleProvider>
//         </AppThemeProvider>
//       </AppContextProvider>
//     </>
//   );
// };

// export default App;
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CssBaseline from '@mui/material/CssBaseline';
import AppContextProvider from '@crema/context/AppContextProvider';
import AppThemeProvider from '@crema/context/AppThemeProvider';
import AppStyleProvider from '@crema/context/AppStyleProvider';
import AppLocaleProvider from '@crema/context/AppLocaleProvider';
import InfoViewContextProvider from '@crema/context/AppContextProvider/InfoViewContextProvider';
import AppAuthProvider from '@crema/core/AppAuthProvider';
import AuthRoutes from '@crema/components/AuthRoutes';
import AppLayout from '@crema/core/AppLayout';
import { store } from './redux/store';
import ToastProvider from './components/comman/GloabalToast/ToastProvider';

import '@crema/mockapi';
import './styles/index.css';

// Create QueryClient instance OUTSIDE the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

// Make store available for interceptors
if (typeof window !== 'undefined') {
  window.store = store;
}

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <AppThemeProvider>
            <AppStyleProvider>
              <AppLocaleProvider>
                <BrowserRouter>
                  <InfoViewContextProvider>
                    <AppAuthProvider>
                      <ToastProvider>
                        <AuthRoutes>
                          <CssBaseline />
                          <AppLayout />
                        </AuthRoutes>
                      </ToastProvider>
                    </AppAuthProvider>
                  </InfoViewContextProvider>
                </BrowserRouter>
              </AppLocaleProvider>
            </AppStyleProvider>
          </AppThemeProvider>
        </AppContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;