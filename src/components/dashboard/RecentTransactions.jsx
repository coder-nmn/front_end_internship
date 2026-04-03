import React, { useMemo } from 'react';
import useStore from '../../store/useStore';
import { formatCurrency, formatDateShort } from '../../utils/formatters';
import { getCategoryColor } from '../../utils/theme';

export default function RecentTransactions() {
  const transactions = useStore((s) => s.transactions);
  const theme = useStore((s) => s.theme);

  const recent = useMemo(() => {
    return [...transactions]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5);
  }, [transactions]);

  // Resolve category colors from CSS vars
  const catColors = useMemo(() => {
    const map = {};
    recent.forEach((t) => { map[t.category] = getCategoryColor(t.category); });
    return map;
  }, [recent, theme]);

  return (
    <div className="chart-card glass-card animate-fade-in-up stagger-5" id="recent-transactions" style={{ gridColumn: '1 / -1' }}>
      <div className="chart-card-header">
        <div>
          <div className="chart-card-title">Recent Transactions</div>
          <div className="chart-card-subtitle">Your latest 5 transactions</div>
        </div>
      </div>
      <div className="recent-list">
        {recent.map((t) => (
          <div className="recent-item" key={t.id}>
            <div className="recent-item-left">
              <span
                className="recent-item-dot"
                style={{ background: catColors[t.category] }}
              />
              <div className="recent-item-info">
                <h4>{t.description}</h4>
                <span>{formatDateShort(t.date)} • {t.category}</span>
              </div>
            </div>
            <span className={`recent-item-amount ${t.type}`}>
              {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
