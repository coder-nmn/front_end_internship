import React from 'react';
import useStore from '../store/useStore';
import TransactionList from '../components/transactions/TransactionList';

export default function TransactionsPage() {
  const role = useStore((s) => s.role);

  return (
    <div className="animate-fade-in" id="transactions-page">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 className="page-title">Transactions</h2>
          {role === 'viewer' && (
            <span className="badge badge-accent" style={{ fontSize: '11px' }}>View Only</span>
          )}
        </div>
        <p className="page-subtitle">
          {role === 'admin'
            ? 'Manage, filter, and export your transactions'
            : 'Browse and filter your transaction history'}
        </p>
      </div>

      <TransactionList />
    </div>
  );
}
