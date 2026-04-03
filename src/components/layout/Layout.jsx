import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import useStore from '../../store/useStore';

export default function Layout() {
  const sidebarOpen = useStore((s) => s.sidebarOpen);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className={`app-main ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
        <Header />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
