import React from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrend from '../components/dashboard/BalanceTrend';
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown';
import RecentTransactions from '../components/dashboard/RecentTransactions';

export default function DashboardPage() {
  return (
    <div className="animate-fade-in" id="dashboard-page">
      <div className="page-header">
        <h2 className="page-title">Financial Overview</h2>
        <p className="page-subtitle">Track your income, expenses, and savings at a glance</p>
      </div>

      <SummaryCards />

      <div className="charts-grid">
        <BalanceTrend />
        <SpendingBreakdown />
      </div>

      <RecentTransactions />
    </div>
  );
}
