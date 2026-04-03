import { parseISO, getMonth, getYear } from 'date-fns';

// Calculate total income
export function getTotalIncome(transactions) {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
}

// Calculate total expenses
export function getTotalExpenses(transactions) {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
}

// Calculate balance
export function getBalance(transactions) {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
}

// Calculate savings rate
export function getSavingsRate(transactions) {
  const income = getTotalIncome(transactions);
  if (income === 0) return 0;
  const expenses = getTotalExpenses(transactions);
  return ((income - expenses) / income) * 100;
}

// Get spending by category
export function getSpendingByCategory(transactions) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const categoryMap = {};

  expenses.forEach(t => {
    if (!categoryMap[t.category]) {
      categoryMap[t.category] = 0;
    }
    categoryMap[t.category] += t.amount;
  });

  return Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

// Get monthly data (income vs expenses)
export function getMonthlyData(transactions) {
  const monthMap = {};

  transactions.forEach(t => {
    const date = parseISO(t.date);
    const key = `${getYear(date)}-${String(getMonth(date) + 1).padStart(2, '0')}`;

    if (!monthMap[key]) {
      monthMap[key] = { month: key, income: 0, expenses: 0, balance: 0 };
    }

    if (t.type === 'income') {
      monthMap[key].income += t.amount;
    } else {
      monthMap[key].expenses += t.amount;
    }
  });

  // Calculate balance for each month
  const sortedMonths = Object.keys(monthMap).sort();
  let runningBalance = 0;
  sortedMonths.forEach(key => {
    runningBalance += monthMap[key].income - monthMap[key].expenses;
    monthMap[key].balance = runningBalance;
  });

  return sortedMonths.map(key => {
    const [year, month] = key.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      ...monthMap[key],
      label: `${monthNames[parseInt(month) - 1]} ${year}`,
    };
  });
}

// Get top spending category
export function getTopCategory(transactions) {
  const categories = getSpendingByCategory(transactions);
  return categories.length > 0 ? categories[0] : null;
}

// Get month-over-month change
export function getMonthlyChange(transactions) {
  const monthly = getMonthlyData(transactions);
  if (monthly.length < 2) return { income: 0, expenses: 0 };

  const current = monthly[monthly.length - 1];
  const previous = monthly[monthly.length - 2];

  return {
    income: previous.income ? ((current.income - previous.income) / previous.income) * 100 : 0,
    expenses: previous.expenses ? ((current.expenses - previous.expenses) / previous.expenses) * 100 : 0,
  };
}

// Get average daily spending
export function getAvgDailySpending(transactions) {
  const expenses = transactions.filter(t => t.type === 'expense');
  if (expenses.length === 0) return 0;

  const dates = expenses.map(t => parseISO(t.date));
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  const daysDiff = Math.max(1, Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)));

  const total = getTotalExpenses(transactions);
  return total / daysDiff;
}

// Generate smart insights
export function generateInsights(transactions) {
  const insights = [];
  const categories = getSpendingByCategory(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const totalIncome = getTotalIncome(transactions);
  const savingsRate = getSavingsRate(transactions);
  const monthlyChange = getMonthlyChange(transactions);
  const monthlyData = getMonthlyData(transactions);

  if (categories.length > 0) {
    const top = categories[0];
    const percent = ((top.value / totalExpenses) * 100).toFixed(0);
    insights.push({
      type: 'warning',
      title: 'Top Spending Category',
      description: `${top.name} accounts for ${percent}% of your total expenses at ₹${top.value.toLocaleString('en-IN')}.`,
      icon: 'trending-up',
    });
  }

  if (savingsRate > 0) {
    insights.push({
      type: savingsRate > 20 ? 'success' : 'info',
      title: 'Savings Rate',
      description: `You're saving ${savingsRate.toFixed(1)}% of your income. ${savingsRate > 20 ? 'Great job! 🎉' : 'Try to aim for at least 20%.'}`,
      icon: 'piggy-bank',
    });
  }

  if (monthlyChange.expenses !== 0) {
    const direction = monthlyChange.expenses > 0 ? 'increased' : 'decreased';
    insights.push({
      type: monthlyChange.expenses > 0 ? 'danger' : 'success',
      title: 'Monthly Expenses Trend',
      description: `Your expenses ${direction} by ${Math.abs(monthlyChange.expenses).toFixed(1)}% compared to last month.`,
      icon: monthlyChange.expenses > 0 ? 'arrow-up-right' : 'arrow-down-right',
    });
  }

  if (monthlyData.length >= 2) {
    const current = monthlyData[monthlyData.length - 1];
    const prev = monthlyData[monthlyData.length - 2];
    if (current.income > prev.income) {
      insights.push({
        type: 'success',
        title: 'Income Growth',
        description: `Your income grew from ₹${prev.income.toLocaleString('en-IN')} to ₹${current.income.toLocaleString('en-IN')} this month.`,
        icon: 'trending-up',
      });
    }
  }

  const avgDaily = getAvgDailySpending(transactions);
  if (avgDaily > 0) {
    insights.push({
      type: 'info',
      title: 'Daily Average Spending',
      description: `You spend an average of ₹${Math.round(avgDaily).toLocaleString('en-IN')} per day.`,
      icon: 'calculator',
    });
  }

  return insights;
}

// Category color mapping
export const CATEGORY_COLORS = {
  'Food & Dining': 'hsl(25, 95%, 53%)',
  'Transport': 'hsl(199, 89%, 48%)',
  'Shopping': 'hsl(280, 67%, 55%)',
  'Entertainment': 'hsl(340, 82%, 52%)',
  'Bills & Utilities': 'hsl(45, 93%, 47%)',
  'Health': 'hsl(152, 69%, 45%)',
  'Education': 'hsl(210, 79%, 46%)',
  'Salary': 'hsl(152, 69%, 55%)',
  'Freelance': 'hsl(170, 70%, 45%)',
  'Investments': 'hsl(258, 90%, 66%)',
  'Rent': 'hsl(15, 80%, 50%)',
  'Groceries': 'hsl(80, 60%, 45%)',
  'Travel': 'hsl(200, 70%, 50%)',
  'Subscriptions': 'hsl(300, 60%, 50%)',
  'Gifts': 'hsl(330, 70%, 55%)',
};

export const CATEGORY_LIST = Object.keys(CATEGORY_COLORS);
