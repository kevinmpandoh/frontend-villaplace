// app/admin/layout.tsx
import React from 'react';
import SidebarMitra from '@/components/SidebarMitra';

export default function MitraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarMitra />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}