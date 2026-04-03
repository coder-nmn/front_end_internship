import React, { useMemo } from 'react';
import {
  TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownRight,
  Calculator, AlertTriangle,
} from 'lucide-react';
import useStore from '../../store/useStore';
import { generateInsights } from '../../utils/calculations';

const iconMap = {
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  'piggy-bank': PiggyBank,
  'arrow-up-right': ArrowUpRight,
  'arrow-down-right': ArrowDownRight,
  'calculator': Calculator,
  'alert': AlertTriangle,
};

export default function InsightCards() {
  const transactions = useStore((s) => s.transactions);

  const insights = useMemo(() => generateInsights(transactions), [transactions]);

  if (insights.length === 0) return null;

  return (
    <div className="insights-grid" id="insight-cards">
      {insights.map((insight, i) => {
        const Icon = iconMap[insight.icon] || TrendingUp;
        return (
          <div
            key={i}
            className={`insight-card glass-card glass-card-interactive animate-fade-in-up stagger-${i + 1}`}
          >
            <div className={`insight-icon ${insight.type}`}>
              <Icon size={22} />
            </div>
            <div className="insight-content">
              <h3>{insight.title}</h3>
              <p>{insight.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
