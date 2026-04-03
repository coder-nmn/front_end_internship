import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
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
      {payload.map((p, i) => (
        <div className="value" key={i} style={{ color: p.fill }}>
          {p.name}: {formatCurrency(p.value)}
        </div>
      ))}
    </div>
  );
}

export default function MonthlyComparison() {
  const transactions = useStore((s) => s.transactions);
  const theme = useStore((s) => s.theme);

  const data = useMemo(() => getMonthlyData(transactions), [transactions]);
  const colors = useMemo(() => getChartColors(), [theme]);

  return (
    <div className="chart-card glass-card animate-fade-in-up stagger-2" id="monthly-comparison-chart">
      <div className="chart-card-header">
        <div>
          <div className="chart-card-title">Monthly Comparison</div>
          <div className="chart-card-subtitle">Income vs Expenses by month</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: colors.borderPrimary, opacity: 0.3 }} />
          <Legend
            wrapperStyle={{ fontSize: '13px', color: 'var(--text-secondary)' }}
            iconType="circle"
            iconSize={8}
          />
          <Bar
            dataKey="income"
            name="Income"
            fill={colors.income}
            radius={[6, 6, 0, 0]}
            barSize={28}
          />
          <Bar
            dataKey="expenses"
            name="Expenses"
            fill={colors.expense}
            radius={[6, 6, 0, 0]}
            barSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
