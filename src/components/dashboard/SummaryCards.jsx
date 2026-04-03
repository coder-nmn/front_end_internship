import React, { useMemo } from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import useStore from '../../store/useStore';
import { formatCurrency } from '../../utils/formatters';
import { getBalance, getTotalIncome, getTotalExpenses, getSavingsRate, getMonthlyChange } from '../../utils/calculations';

export default function SummaryCards() {
  const transactions = useStore((s) => s.transactions);

  const stats = useMemo(() => {
    const balance = getBalance(transactions);
    const income = getTotalIncome(transactions);
    const expenses = getTotalExpenses(transactions);
    const savingsRate = getSavingsRate(transactions);
    const change = getMonthlyChange(transactions);

    return { balance, income, expenses, savingsRate, change };
  }, [transactions]);

  const cards = [
    {
      id: 'balance',
      label: 'Total Balance',
      value: formatCurrency(stats.balance),
      icon: Wallet,
      className: 'balance',
      trend: null,
    },
    {
      id: 'income',
      label: 'Total Income',
      value: formatCurrency(stats.income),
      icon: TrendingUp,
      className: 'income',
      trend: stats.change.income,
      trendLabel: 'vs last month',
    },
    {
      id: 'expenses',
      label: 'Total Expenses',
      value: formatCurrency(stats.expenses),
      icon: TrendingDown,
      className: 'expenses',
      trend: stats.change.expenses,
      trendLabel: 'vs last month',
      invertTrend: true,
    },
    {
      id: 'savings',
      label: 'Savings Rate',
      value: `${stats.savingsRate.toFixed(1)}%`,
      icon: PiggyBank,
      className: 'savings',
      trend: null,
    },
  ];

  return (
    <div className="summary-grid" id="summary-cards">
      {cards.map((card, i) => (
        <div
          key={card.id}
          className={`summary-card glass-card glass-card-interactive ${card.className} animate-fade-in-up stagger-${i + 1}`}
          id={`card-${card.id}`}
        >
          <div className="summary-card-header">
            <span className="summary-card-label">{card.label}</span>
            <div className="summary-card-icon">
              <card.icon size={20} />
            </div>
          </div>
          <div className="summary-card-value">{card.value}</div>
          {card.trend !== null && card.trend !== 0 && (
            <div className={`summary-card-trend ${card.invertTrend ? (card.trend > 0 ? 'down' : 'up') : (card.trend > 0 ? 'up' : 'down')}`}>
              {card.trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{Math.abs(card.trend).toFixed(1)}%</span>
              <span style={{ color: 'var(--text-tertiary)', marginLeft: '4px' }}>{card.trendLabel}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
