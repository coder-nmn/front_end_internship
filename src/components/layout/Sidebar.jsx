import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Wallet,
  PanelLeftClose,
  PanelLeft,
  Shield,
  Eye,
} from 'lucide-react';
import useStore from '../../store/useStore';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar() {
  const role = useStore((s) => s.role);
  const setRole = useStore((s) => s.setRole);
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const toggleSidebar = useStore((s) => s.toggleSidebar);

  return (
    <aside className={`sidebar ${!sidebarOpen ? 'collapsed' : ''}`} id="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Wallet size={20} />
        </div>
        <span className="sidebar-logo-text">FinDash</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-nav-item ${isActive ? 'active' : ''}`
            }
            end={item.path === '/'}
            id={`nav-${item.label.toLowerCase()}`}
          >
            <item.icon size={20} />
            <span className="sidebar-nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Role Switcher */}
      <div className="sidebar-role-section">
        <div className="role-switcher">
          <div className="role-switcher-label">Role</div>
          <div className="role-switcher-buttons">
            <button
              className={`role-btn ${role === 'admin' ? 'active' : ''}`}
              onClick={() => setRole('admin')}
              id="role-admin-btn"
            >
              <Shield size={14} />
              <span> Admin</span>
            </button>
            <button
              className={`role-btn ${role === 'viewer' ? 'active' : ''}`}
              onClick={() => setRole('viewer')}
              id="role-viewer-btn"
            >
              <Eye size={14} />
              <span> Viewer</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
