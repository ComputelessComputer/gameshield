'use client';

import React from 'react';
import { 
  KeyMetrics, 
  ChartsSection, 
  MaliciousActivityTable, 
  ConfigurationSection 
} from './components';

/**
 * Admin Dashboard
 * Main page for the GameShield admin interface
 */
export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">GameShield Admin Dashboard</h1>
      <KeyMetrics />
      <ChartsSection />
      <MaliciousActivityTable />
      <ConfigurationSection />
    </div>
  );
}
