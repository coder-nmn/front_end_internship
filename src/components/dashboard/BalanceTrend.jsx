import React, { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import useStore from '../../store/useStore';
import { getMonthlyData } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { getChartColors } from '../../utils/theme';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      {payload.map((p, idx) => (
        <div className="value" key={idx} style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </div>
      ))}
    </div>
  );
}

export default function BalanceTrend() {
  const transactions = useStore((s) => s.transactions);
  const theme = useStore((s) => s.theme);

  const data = useMemo(() => getMonthlyData(transactions), [transactions]);

  // Re-resolve colors whenever theme changes
  const colors = useMemo(() => getChartColors(), [theme]);

  return (
    <div className="chart-card glass-card animate-fade-in-up stagger-3" id="balance-trend-chart">
      <div className="chart-card-header">
        <div>
          <div className="chart-card-title">Balance Trend</div>
          <div className="chart-card-subtitle">Monthly income vs expenses overview</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="gradientIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.income} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colors.income} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradientExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.expense} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colors.expense} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.borderPrimary} />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.textTertiary, fontSize: 12 }}
            axisLine={{ stroke: colors.borderPrimary }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: colors.textTertiary, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            name="Income"
            stroke={colors.income}
            strokeWidth={2.5}
            fill="url(#gradientIncome)"
            dot={{ fill: colors.income, strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 2, stroke: colors.income }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke={colors.expense}
            strokeWidth={2.5}
            fill="url(#gradientExpense)"
            dot={{ fill: colors.expense, strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 2, stroke: colors.expense }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
