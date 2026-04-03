import React, { useMemo } from 'react';
import useStore from '../../store/useStore';
import { getBalance, getTotalIncome, getTotalExpenses, getSavingsRate } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { getChartColors } from '../../utils/theme';

export default function SavingsGoal() {
  const transactions = useStore((s) => s.transactions);
  const theme = useStore((s) => s.theme);

  const stats = useMemo(() => {
    const income = getTotalIncome(transactions);
    const expenses = getTotalExpenses(transactions);
    const savings = income - expenses;
    const rate = getSavingsRate(transactions);
    return { income, expenses, savings, rate };
  }, [transactions]);

  const colors = useMemo(() => getChartColors(), [theme]);

  // Savings goal: 30% of income
  const goal = stats.income * 0.3;
  const progress = goal > 0 ? Math.min((stats.savings / goal) * 100, 100) : 0;

  // SVG ring
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="savings-goal-card glass-card animate-fade-in-up stagger-4" id="savings-goal">
      <div className="chart-card-header">
        <div>
          <div className="chart-card-title">Savings Goal</div>
          <div className="chart-card-subtitle">Target: 30% of income ({formatCurrency(goal)})</div>
        </div>
      </div>

      <div className="savings-progress-ring">
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.borderPrimary}
            strokeWidth={strokeWidth}
          />
          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#savings-gradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
          <defs>
            <linearGradient id="savings-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={colors.accent} />
              <stop offset="100%" stopColor={colors.income} />
            </linearGradient>
          </defs>
        </svg>
        <div
          className="savings-progress-text"
          style={{
            position: 'absolute',
          }}
        >
          <div className="savings-progress-value">{progress.toFixed(0)}%</div>
          <div className="savings-progress-label">of goal</div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--color-income)', marginBottom: '4px' }}>
          {formatCurrency(stats.savings)}
        </div>
        <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
          saved out of {formatCurrency(goal)} goal
        </div>
      </div>
    </div>
  );
}
