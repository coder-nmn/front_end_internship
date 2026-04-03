// 55 realistic transactions in INR spanning Oct 2025 – Mar 2026
export const mockTransactions = [
  // --- October 2025 ---
  { id: 't001', date: '2025-10-01', description: 'Monthly Salary – TCS', amount: 85000, category: 'Salary', type: 'income' },
  { id: 't002', date: '2025-10-03', description: 'House Rent – October', amount: 18000, category: 'Rent', type: 'expense' },
  { id: 't003', date: '2025-10-05', description: 'BigBasket Groceries', amount: 4200, category: 'Groceries', type: 'expense' },
  { id: 't004', date: '2025-10-07', description: 'Swiggy – Biryani Paradise', amount: 650, category: 'Food & Dining', type: 'expense' },
  { id: 't005', date: '2025-10-10', description: 'Ola Cab – Office Commute', amount: 380, category: 'Transport', type: 'expense' },
  { id: 't006', date: '2025-10-12', description: 'Netflix Subscription', amount: 649, category: 'Subscriptions', type: 'expense' },
  { id: 't007', date: '2025-10-14', description: 'Amazon – Wireless Earbuds', amount: 2499, category: 'Shopping', type: 'expense' },
  { id: 't008', date: '2025-10-16', description: 'Electricity Bill – BESCOM', amount: 1850, category: 'Bills & Utilities', type: 'expense' },
  { id: 't009', date: '2025-10-20', description: 'Freelance – Logo Design', amount: 12000, category: 'Freelance', type: 'income' },
  { id: 't010', date: '2025-10-22', description: 'Apollo Pharmacy – Medicines', amount: 890, category: 'Health', type: 'expense' },
  { id: 't011', date: '2025-10-25', description: 'PVR INOX – Movie Night', amount: 1200, category: 'Entertainment', type: 'expense' },

  // --- November 2025 ---
  { id: 't012', date: '2025-11-01', description: 'Monthly Salary – TCS', amount: 85000, category: 'Salary', type: 'income' },
  { id: 't013', date: '2025-11-02', description: 'House Rent – November', amount: 18000, category: 'Rent', type: 'expense' },
  { id: 't014', date: '2025-11-04', description: 'Zerodha – Mutual Fund SIP', amount: 5000, category: 'Investments', type: 'expense' },
  { id: 't015', date: '2025-11-06', description: 'DMart Groceries', amount: 3800, category: 'Groceries', type: 'expense' },
  { id: 't016', date: '2025-11-08', description: 'Zomato – Pizza Delivery', amount: 520, category: 'Food & Dining', type: 'expense' },
  { id: 't017', date: '2025-11-10', description: 'Metro Card Recharge', amount: 500, category: 'Transport', type: 'expense' },
  { id: 't018', date: '2025-11-12', description: 'Coursera – Web Dev Course', amount: 3200, category: 'Education', type: 'expense' },
  { id: 't019', date: '2025-11-14', description: 'Diwali Gift – Mom', amount: 5500, category: 'Gifts', type: 'expense' },
  { id: 't020', date: '2025-11-18', description: 'Flipkart – Winter Jacket', amount: 3200, category: 'Shopping', type: 'expense' },
  { id: 't021', date: '2025-11-20', description: 'Freelance – Website Redesign', amount: 25000, category: 'Freelance', type: 'income' },
  { id: 't022', date: '2025-11-22', description: 'Airtel WiFi Bill', amount: 999, category: 'Bills & Utilities', type: 'expense' },
  { id: 't023', date: '2025-11-25', description: 'Café Coffee Day – Meeting', amount: 450, category: 'Food & Dining', type: 'expense' },

  // --- December 2025 ---
  { id: 't024', date: '2025-12-01', description: 'Monthly Salary – TCS', amount: 85000, category: 'Salary', type: 'income' },
  { id: 't025', date: '2025-12-02', description: 'House Rent – December', amount: 18000, category: 'Rent', type: 'expense' },
  { id: 't026', date: '2025-12-05', description: 'BigBasket Groceries', amount: 5100, category: 'Groceries', type: 'expense' },
  { id: 't027', date: '2025-12-06', description: 'Uber – Airport Drop', amount: 1200, category: 'Transport', type: 'expense' },
  { id: 't028', date: '2025-12-08', description: 'Goa Trip – Flight Tickets', amount: 8500, category: 'Travel', type: 'expense' },
  { id: 't029', date: '2025-12-10', description: 'Goa Trip – Hotel Stay', amount: 12000, category: 'Travel', type: 'expense' },
  { id: 't030', date: '2025-12-12', description: 'Goa Trip – Activities', amount: 3500, category: 'Entertainment', type: 'expense' },
  { id: 't031', date: '2025-12-15', description: 'Spotify Annual Plan', amount: 1189, category: 'Subscriptions', type: 'expense' },
  { id: 't032', date: '2025-12-18', description: 'Christmas Gift – Friend', amount: 2000, category: 'Gifts', type: 'expense' },
  { id: 't033', date: '2025-12-20', description: 'Year-End Bonus', amount: 40000, category: 'Salary', type: 'income' },
  { id: 't034', date: '2025-12-22', description: 'Zerodha – Mutual Fund SIP', amount: 5000, category: 'Investments', type: 'expense' },
  { id: 't035', date: '2025-12-28', description: 'Electricity Bill – BESCOM', amount: 2100, category: 'Bills & Utilities', type: 'expense' },

  // --- January 2026 ---
  { id: 't036', date: '2026-01-01', description: 'Monthly Salary – TCS', amount: 90000, category: 'Salary', type: 'income' },
  { id: 't037', date: '2026-01-02', description: 'House Rent – January', amount: 18000, category: 'Rent', type: 'expense' },
  { id: 't038', date: '2026-01-05', description: 'DMart Groceries', amount: 4500, category: 'Groceries', type: 'expense' },
  { id: 't039', date: '2026-01-07', description: 'Swiggy – Thai Food', amount: 780, category: 'Food & Dining', type: 'expense' },
  { id: 't040', date: '2026-01-10', description: 'Gym Membership – Cult Fit', amount: 2500, category: 'Health', type: 'expense' },
  { id: 't041', date: '2026-01-12', description: 'Rapido Bike – Commute', amount: 180, category: 'Transport', type: 'expense' },
  { id: 't042', date: '2026-01-15', description: 'Udemy – React Course', amount: 499, category: 'Education', type: 'expense' },
  { id: 't043', date: '2026-01-18', description: 'Freelance – Mobile App UI', amount: 18000, category: 'Freelance', type: 'income' },
  { id: 't044', date: '2026-01-22', description: 'Myntra – Sneakers', amount: 4200, category: 'Shopping', type: 'expense' },

  // --- February 2026 ---
  { id: 't045', date: '2026-02-01', description: 'Monthly Salary – TCS', amount: 90000, category: 'Salary', type: 'income' },
  { id: 't046', date: '2026-02-02', description: 'House Rent – February', amount: 18000, category: 'Rent', type: 'expense' },
  { id: 't047', date: '2026-02-05', description: 'BigBasket Groceries', amount: 3900, category: 'Groceries', type: 'expense' },
  { id: 't048', date: '2026-02-08', description: 'Valentine Dinner – Olive Bistro', amount: 3500, category: 'Food & Dining', type: 'expense' },
  { id: 't049', date: '2026-02-10', description: 'Zerodha – Mutual Fund SIP', amount: 5000, category: 'Investments', type: 'expense' },
  { id: 't050', date: '2026-02-14', description: 'Valentine Gift – Watch', amount: 6500, category: 'Gifts', type: 'expense' },
  { id: 't051', date: '2026-02-18', description: 'Electricity Bill – BESCOM', amount: 1650, category: 'Bills & Utilities', type: 'expense' },
  { id: 't052', date: '2026-02-22', description: 'BookMyShow – Concert', amount: 2800, category: 'Entertainment', type: 'expense' },

  // --- March 2026 ---
  { id: 't053', date: '2026-03-01', description: 'Monthly Salary – TCS', amount: 90000, category: 'Salary', type: 'income' },
  { id: 't054', date: '2026-03-02', description: 'House Rent – March', amount: 18000, category: 'Rent', type: 'expense' },
  { id: 't055', date: '2026-03-04', description: 'DMart Groceries', amount: 4800, category: 'Groceries', type: 'expense' },
  { id: 't056', date: '2026-03-06', description: 'Swiggy – South Indian', amount: 420, category: 'Food & Dining', type: 'expense' },
  { id: 't057', date: '2026-03-08', description: 'Ola Cab – Weekend Trip', amount: 950, category: 'Transport', type: 'expense' },
  { id: 't058', date: '2026-03-10', description: 'Amazon Prime Renewal', amount: 1499, category: 'Subscriptions', type: 'expense' },
  { id: 't059', date: '2026-03-12', description: 'Freelance – Dashboard UI', amount: 30000, category: 'Freelance', type: 'income' },
  { id: 't060', date: '2026-03-15', description: 'Zerodha – Mutual Fund SIP', amount: 7500, category: 'Investments', type: 'expense' },
  { id: 't061', date: '2026-03-18', description: 'Decathlon – Running Shoes', amount: 3200, category: 'Shopping', type: 'expense' },
  { id: 't062', date: '2026-03-20', description: 'Dr. Reddy Consultation', amount: 1200, category: 'Health', type: 'expense' },
  { id: 't063', date: '2026-03-22', description: 'Airtel WiFi Bill', amount: 999, category: 'Bills & Utilities', type: 'expense' },
  { id: 't064', date: '2026-03-25', description: 'Starbucks – Team Treat', amount: 1800, category: 'Food & Dining', type: 'expense' },
  { id: 't065', date: '2026-03-28', description: 'Upskill – Figma Workshop', amount: 1500, category: 'Education', type: 'expense' },
];

export const CATEGORIES_EXPENSE = [
  'Food & Dining', 'Transport', 'Shopping', 'Entertainment',
  'Bills & Utilities', 'Health', 'Education', 'Rent',
  'Groceries', 'Travel', 'Subscriptions', 'Gifts', 'Investments',
];

export const CATEGORIES_INCOME = [
  'Salary', 'Freelance', 'Investments',
];

export const ALL_CATEGORIES = [...new Set([...CATEGORIES_EXPENSE, ...CATEGORIES_INCOME])];
