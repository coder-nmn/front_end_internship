import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockData';

const useStore = create(
  persist(
    (set, get) => ({
      // ---- Data ----
      transactions: mockTransactions,

      // ---- UI State ----
      role: 'admin', // 'admin' | 'viewer'
      theme: 'dark', // 'dark' | 'light'
      searchQuery: '',
      filters: {
        category: 'all',
        type: 'all', // 'all' | 'income' | 'expense'
        dateFrom: '',
        dateTo: '',
      },
      sortConfig: {
        key: 'date',      // 'date' | 'amount' | 'category'
        direction: 'desc', // 'asc' | 'desc'
      },
      sidebarOpen: true,

      // ---- Actions ----
      setRole: (role) => set({ role }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),

      setSearchQuery: (searchQuery) => set({ searchQuery }),

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      resetFilters: () =>
        set({
          searchQuery: '',
          filters: {
            category: 'all',
            type: 'all',
            dateFrom: '',
            dateTo: '',
          },
        }),

      setSortConfig: (key) =>
        set((state) => ({
          sortConfig: {
            key,
            direction:
              state.sortConfig.key === key && state.sortConfig.direction === 'asc'
                ? 'desc'
                : 'asc',
          },
        })),

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // ---- CRUD ----
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            { ...transaction, id: `t${Date.now()}` },
            ...state.transactions,
          ],
        })),

      editTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      // ---- Derived (Selectors) ----
      getFilteredTransactions: () => {
        const { transactions, searchQuery, filters, sortConfig } = get();
        let filtered = [...transactions];

        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q)
          );
        }

        // Category filter
        if (filters.category !== 'all') {
          filtered = filtered.filter((t) => t.category === filters.category);
        }

        // Type filter
        if (filters.type !== 'all') {
          filtered = filtered.filter((t) => t.type === filters.type);
        }

        // Date range filter
        if (filters.dateFrom) {
          filtered = filtered.filter((t) => t.date >= filters.dateFrom);
        }
        if (filters.dateTo) {
          filtered = filtered.filter((t) => t.date <= filters.dateTo);
        }

        // Sort
        filtered.sort((a, b) => {
          let comparison = 0;
          if (sortConfig.key === 'date') {
            comparison = a.date.localeCompare(b.date);
          } else if (sortConfig.key === 'amount') {
            comparison = a.amount - b.amount;
          } else if (sortConfig.key === 'category') {
            comparison = a.category.localeCompare(b.category);
          }
          return sortConfig.direction === 'asc' ? comparison : -comparison;
        });

        return filtered;
      },
    }),
    {
      name: 'findash-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        theme: state.theme,
      }),
    }
  )
);

export default useStore;
