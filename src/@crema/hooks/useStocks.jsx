// src/hooks/useStocks.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Real-time stock prices (WebSocket alternative)
export const useLiveStockPrices = (symbols, refetchInterval = 2000) => {
  return useQuery({
    queryKey: ['stocks', 'live', symbols],
    queryFn: () => fetchStockPrices(symbols),
    refetchInterval, // Auto-refresh every 2 seconds
    staleTime: 1000, // Data becomes stale after 1 second
    refetchOnMount: true,
  });
};

// Historical chart data
export const useHistoricalData = (symbol, period = '1D') => {
  return useQuery({
    queryKey: ['stocks', 'historical', symbol, period],
    queryFn: () => fetchHistoricalData(symbol, period),
    staleTime: 30 * 1000, // 30 seconds for chart data
  });
};

// Company fundamentals
export const useCompanyInfo = (symbol) => {
  return useQuery({
    queryKey: ['stocks', 'company', symbol],
    queryFn: () => fetchCompanyInfo(symbol),
    staleTime: 5 * 60 * 1000, // 5 minutes for company data
  });
};