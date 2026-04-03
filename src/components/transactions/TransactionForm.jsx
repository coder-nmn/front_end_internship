import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES_EXPENSE, CATEGORIES_INCOME } from '../../data/mockData';

export default function TransactionForm({ onSubmit, onClose, initialData }) {
  const isEditing = !!initialData;

  const [form, setForm] = useState({
    description: initialData?.description || '',
    amount: initialData?.amount || '',
    category: initialData?.category || '',
    type: initialData?.type || 'expense',
    date: initialData?.date || new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  const categories = form.type === 'income' ? CATEGORIES_INCOME : CATEGORIES_EXPENSE;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      // Reset category when switching type
      if (name === 'type') {
        updated.category = '';
      }
      return updated;
    });
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function validate() {
    const errs = {};
    if (!form.description.trim()) errs.description = 'Required';
    if (!form.amount || Number(form.amount) <= 0) errs.amount = 'Enter a valid amount';
    if (!form.category) errs.category = 'Select a category';
    if (!form.date) errs.date = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      amount: Number(form.amount),
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose} id="transaction-modal">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="txn-description">Description</label>
            <input
              id="txn-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g., Swiggy – Biryani Paradise"
              style={errors.description ? { borderColor: 'var(--color-expense)' } : {}}
            />
            {errors.description && <small style={{ color: 'var(--color-expense)', fontSize: '12px' }}>{errors.description}</small>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="txn-amount">Amount (₹)</label>
              <input
                id="txn-amount"
                name="amount"
                type="number"
                min="1"
                value={form.amount}
                onChange={handleChange}
                placeholder="e.g., 2500"
                style={errors.amount ? { borderColor: 'var(--color-expense)' } : {}}
              />
              {errors.amount && <small style={{ color: 'var(--color-expense)', fontSize: '12px' }}>{errors.amount}</small>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="txn-date">Date</label>
              <input
                id="txn-date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                style={errors.date ? { borderColor: 'var(--color-expense)' } : {}}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="txn-type">Type</label>
              <select id="txn-type" name="type" value={form.type} onChange={handleChange}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="txn-category">Category</label>
              <select
                id="txn-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                style={errors.category ? { borderColor: 'var(--color-expense)' } : {}}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <small style={{ color: 'var(--color-expense)', fontSize: '12px' }}>{errors.category}</small>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" id="txn-submit-btn">
              {isEditing ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
