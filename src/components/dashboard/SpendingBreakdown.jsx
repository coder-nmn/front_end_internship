import React, { useMemo } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from 'recharts';
import useStore from '../../store/useStore';
import { getSpendingByCategory } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { getCategoryColor } from '../../utils/theme';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="custom-tooltip">
      <div className="label">{item.name}</div>
      <div className="value">{formatCurrency(item.value)}</div>
    </div>
  );
}

export default function SpendingBreakdown() {
  const transactions = useStore((s) => s.transactions);
  const theme = useStore((s) => s.theme);

  const data = useMemo(() => getSpendingByCategory(transactions), [transactions]);
  const totalExpenses = useMemo(
    () => data.reduce((s, d) => s + d.value, 0),
    [data]
  );

  // Re-resolve colors on theme change
  const categoryColors = useMemo(() => {
    const map = {};
    data.forEach((d) => { map[d.name] = getCategoryColor(d.name); });
    return map;
  }, [data, theme]);

  return (
    <div className="chart-card glass-card animate-fade-in-up stagger-4" id="spending-breakdown-chart">
      <div className="chart-card-header">
        <div>
          <div className="chart-card-title">Spending Breakdown</div>
          <div className="chart-card-subtitle">Expenses by category</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ResponsiveContainer width="50%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={categoryColors[entry.name]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {data.slice(0, 6).map((entry) => {
            const pct = ((entry.value / totalExpenses) * 100).toFixed(0);
            return (
              <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: categoryColors[entry.name],
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{entry.name}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
