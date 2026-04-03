import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import useStore from '../../store/useStore';
import { getSpendingByCategory } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { getCategoryColor, getChartColors } from '../../utils/theme';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{payload[0].payload.name}</div>
      <div className="value">{formatCurrency(payload[0].value)}</div>
    </div>
  );
}

export default function TopCategories() {
  const transactions = useStore((s) => s.transactions);
  const theme = useStore((s) => s.theme);

  const data = useMemo(
    () => getSpendingByCategory(transactions).slice(0, 8),
    [transactions]
  );

  const colors = useMemo(() => getChartColors(), [theme]);
  const categoryColors = useMemo(() => {
    const map = {};
    data.forEach((d) => { map[d.name] = getCategoryColor(d.name); });
    return map;
  }, [data, theme]);

  return (
    <div className="chart-card glass-card animate-fade-in-up stagger-1" id="top-categories-chart">
      <div className="chart-card-header">
        <div>
          <div className="chart-card-title">Top Spending Categories</div>
          <div className="chart-card-subtitle">Where your money goes</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.borderPrimary} horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: colors.textTertiary, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            tick={{ fill: colors.textTertiary, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: colors.borderPrimary, opacity: 0.3 }} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={categoryColors[entry.name]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
