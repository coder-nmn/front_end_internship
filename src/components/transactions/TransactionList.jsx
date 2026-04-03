import React, { useState, useMemo, useCallback } from 'react';
import {
  Search, SlidersHorizontal, Plus, ArrowUpDown, ArrowUp, ArrowDown,
  Pencil, Trash2, Download, FileJson, FileSpreadsheet, X, Package,
} from 'lucide-react';
import useStore from '../../store/useStore';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { getCategoryColor } from '../../utils/theme';
import { ALL_CATEGORIES } from '../../data/mockData';
import TransactionForm from './TransactionForm';

export default function TransactionList() {
  const role = useStore((s) => s.role);
  const searchQuery = useStore((s) => s.searchQuery);
  const setSearchQuery = useStore((s) => s.setSearchQuery);
  const filters = useStore((s) => s.filters);
  const setFilters = useStore((s) => s.setFilters);
  const resetFilters = useStore((s) => s.resetFilters);
  const sortConfig = useStore((s) => s.sortConfig);
  const setSortConfig = useStore((s) => s.setSortConfig);
  const getFilteredTransactions = useStore((s) => s.getFilteredTransactions);
  const addTransaction = useStore((s) => s.addTransaction);
  const editTransaction = useStore((s) => s.editTransaction);
  const deleteTransaction = useStore((s) => s.deleteTransaction);

  const [showForm, setShowForm] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);

  const filtered = useMemo(() => getFilteredTransactions(), [
    searchQuery, filters, sortConfig, useStore((s) => s.transactions)
  ]);

  const isAdmin = role === 'admin';

  const hasActiveFilters = searchQuery || filters.category !== 'all' || filters.type !== 'all' || filters.dateFrom || filters.dateTo;

  function handleAddSubmit(data) {
    addTransaction(data);
    setShowForm(false);
  }

  function handleEditSubmit(data) {
    editTransaction(editingTxn.id, data);
    setEditingTxn(null);
  }

  function handleDelete(id) {
    if (window.confirm('Delete this transaction?')) {
      deleteTransaction(id);
    }
  }

  function exportCSV() {
    const headers = ['Date', 'Description', 'Amount', 'Category', 'Type'];
    const rows = filtered.map(t => [t.date, t.description, t.amount, t.category, t.type]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    downloadFile(csv, 'transactions.csv', 'text/csv');
  }

  function exportJSON() {
    const json = JSON.stringify(filtered, null, 2);
    downloadFile(json, 'transactions.json', 'application/json');
  }

  function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function SortIcon({ column }) {
    if (sortConfig.key !== column) return <ArrowUpDown size={12} style={{ opacity: 0.3 }} />;
    return sortConfig.direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  }

  return (
    <div id="transactions-list">
      {/* Controls */}
      <div className="transactions-controls">
        <div className="search-input-wrapper">
          <Search />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="search-transactions"
          />
        </div>

        <div className="filter-group">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ category: e.target.value })}
            id="filter-category"
          >
            <option value="all">All Categories</option>
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters({ type: e.target.value })}
            id="filter-type"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ dateFrom: e.target.value })}
            placeholder="From"
            style={{ minWidth: '140px' }}
            id="filter-date-from"
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ dateTo: e.target.value })}
            placeholder="To"
            style={{ minWidth: '140px' }}
            id="filter-date-to"
          />

          {hasActiveFilters && (
            <button className="btn btn-ghost btn-sm" onClick={resetFilters} id="clear-filters">
              <X size={14} /> Clear
            </button>
          )}
        </div>

        <div className="export-group">
          <button className="btn btn-secondary btn-sm" onClick={exportCSV} id="export-csv-btn">
            <FileSpreadsheet size={14} /> CSV
          </button>
          <button className="btn btn-secondary btn-sm" onClick={exportJSON} id="export-json-btn">
            <FileJson size={14} /> JSON
          </button>
        </div>

        {isAdmin && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)} id="add-transaction-btn">
            <Plus size={16} /> Add Transaction
          </button>
        )}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="empty-state glass-card">
          <Package size={64} />
          <h3>No transactions found</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <>
          <div className="transactions-table-wrapper">
            <table className="transactions-table" id="transactions-table">
              <thead>
                <tr>
                  <th onClick={() => setSortConfig('date')} className={sortConfig.key === 'date' ? 'sorted' : ''}>
                    Date <span className="sort-icon"><SortIcon column="date" /></span>
                  </th>
                  <th>Description</th>
                  <th onClick={() => setSortConfig('amount')} className={sortConfig.key === 'amount' ? 'sorted' : ''}>
                    Amount <span className="sort-icon"><SortIcon column="amount" /></span>
                  </th>
                  <th onClick={() => setSortConfig('category')} className={sortConfig.key === 'category' ? 'sorted' : ''}>
                    Category <span className="sort-icon"><SortIcon column="category" /></span>
                  </th>
                  <th>Type</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id}>
                    <td>{formatDate(t.date)}</td>
                    <td>
                      <div className="transaction-description">
                        <span
                          className="transaction-cat-dot"
                          style={{ background: getCategoryColor(t.category) }}
                        />
                        {t.description}
                      </div>
                    </td>
                    <td className={`transaction-amount ${t.type}`}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                    <td>{t.category}</td>
                    <td>
                      <span className={`badge badge-${t.type}`}>{t.type}</span>
                    </td>
                    {isAdmin && (
                      <td>
                        <div className="transaction-actions">
                          <button
                            className="btn btn-ghost btn-icon btn-sm"
                            onClick={() => setEditingTxn(t)}
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            className="btn btn-ghost btn-icon btn-sm"
                            onClick={() => handleDelete(t.id)}
                            title="Delete"
                            style={{ color: 'var(--color-expense)' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <span className="table-footer-info">
              Showing {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </>
      )}

      {/* Add Modal */}
      {showForm && (
        <TransactionForm
          onSubmit={handleAddSubmit}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Edit Modal */}
      {editingTxn && (
        <TransactionForm
          initialData={editingTxn}
          onSubmit={handleEditSubmit}
          onClose={() => setEditingTxn(null)}
        />
      )}
    </div>
  );
}
