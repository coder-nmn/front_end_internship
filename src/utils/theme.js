// Helper to read CSS custom property values at runtime (for Recharts which needs raw strings)
export function getCSSVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Return an object with all chart-relevant colors resolved from CSS variables
export function getChartColors() {
  return {
    income: getCSSVar('--color-income'),
    expense: getCSSVar('--color-expense'),
    accent: getCSSVar('--accent-primary'),
    warning: getCSSVar('--color-warning'),
    info: getCSSVar('--color-info'),
    chart1: getCSSVar('--chart-1'),
    chart2: getCSSVar('--chart-2'),
    chart3: getCSSVar('--chart-3'),
    chart4: getCSSVar('--chart-4'),
    chart5: getCSSVar('--chart-5'),
    chart6: getCSSVar('--chart-6'),
    textSecondary: getCSSVar('--text-secondary'),
    textTertiary: getCSSVar('--text-tertiary'),
    borderPrimary: getCSSVar('--border-primary'),
    bgCardSolid: getCSSVar('--bg-card-solid'),
  };
}

// Category colors resolved from CSS variables
export function getCategoryColor(category) {
  const map = {
    'Food & Dining': getCSSVar('--cat-food'),
    'Transport': getCSSVar('--cat-transport'),
    'Shopping': getCSSVar('--cat-shopping'),
    'Entertainment': getCSSVar('--cat-entertainment'),
    'Bills & Utilities': getCSSVar('--cat-bills'),
    'Health': getCSSVar('--cat-health'),
    'Education': getCSSVar('--cat-education'),
    'Salary': getCSSVar('--cat-salary'),
    'Freelance': getCSSVar('--cat-freelance'),
    'Investments': getCSSVar('--cat-investments'),
    'Rent': getCSSVar('--cat-rent'),
    'Groceries': getCSSVar('--cat-groceries'),
    'Travel': getCSSVar('--cat-travel'),
    'Subscriptions': getCSSVar('--cat-subscriptions'),
    'Gifts': getCSSVar('--cat-gifts'),
  };
  return map[category] || getCSSVar('--chart-1');
}
