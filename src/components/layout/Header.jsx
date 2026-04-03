import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Shield, Eye, Sun, Moon } from 'lucide-react';
import useStore from '../../store/useStore';

const pageTitles = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
};

export default function Header() {
  const role = useStore((s) => s.role);
  const theme = useStore((s) => s.theme);
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const toggleTheme = useStore((s) => s.toggleTheme);
  const location = useLocation();

  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header className={`header ${!sidebarOpen ? 'sidebar-collapsed' : ''}`} id="app-header">
      <div className="header-left">
        <button className="header-toggle" onClick={toggleSidebar} id="sidebar-toggle">
          <Menu size={20} />
        </button>
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          id="theme-toggle"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className={`header-role-badge ${role}`} id="role-badge">
          {role === 'admin' ? <Shield size={14} /> : <Eye size={14} />}
          {role === 'admin' ? 'Admin' : 'Viewer'}
        </div>
        <div className="header-avatar" id="user-avatar">
          AK
        </div>
      </div>
    </header>
  );
}
