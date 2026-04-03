import React, { useMemo } from 'react';
import useStore from '../store/useStore';
import TopCategories from '../components/insights/TopCategories';
import MonthlyComparison from '../components/insights/MonthlyComparison';
import InsightCards from '../components/insights/InsightCards';
import SavingsGoal from '../components/insights/SavingsGoal';
import { formatCurrency } from '../utils/formatters';
import {
  getTotalIncome, getTotalExpenses, getAvgDailySpending, getBalance,
} from '../utils/calculations';

export default function InsightsPage() {
  const transactions = useStore((s) => s.transactions);

  const stats = useMemo(() => ({
    totalTransactions: transactions.length,
    avgDailySpending: getAvgDailySpending(transactions),
    balance: getBalance(transactions),
  }), [transactions]);

  return (
    <div className="animate-fade-in" id="insights-page">
      <div className="page-header">
        <h2 className="page-title">Insights</h2>
        <p className="page-subtitle">Understand your spending patterns and track your financial goals</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-row">
        <div className="stat-card glass-card glass-card-interactive animate-fade-in-up stagger-1">
          <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>
            {stats.totalTransactions}
          </div>
          <div className="stat-label">Total Transactions</div>
        </div>
        <div className="stat-card glass-card glass-card-interactive animate-fade-in-up stagger-2">
          <div className="stat-value" style={{ color: 'var(--color-expense)' }}>
            {formatCurrency(Math.round(stats.avgDailySpending))}
          </div>
          <div className="stat-label">Avg Daily Spending</div>
        </div>
        <div className="stat-card glass-card glass-card-interactive animate-fade-in-up stagger-3">
          <div className="stat-value" style={{ color: 'var(--color-income)' }}>
            {formatCurrency(stats.balance)}
          </div>
          <div className="stat-label">Net Balance</div>
        </div>
      </div>

      {/* Smart Insights */}
      <InsightCards />

      {/* Charts */}
      <div className="charts-grid">
        <TopCategories />
        <SavingsGoal />
      </div>

      <MonthlyComparison />
    </div>
  );
}
