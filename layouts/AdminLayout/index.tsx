import React from 'react'
import SideNav from '@/components/SideNav'
import Head from '@/components/Head'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  

  return (
      <div className='flex bg-footer-bg overflow-hidden h-screen w-full'>
        <SideNav />
        <div className="flex-1 overflow-y-auto overflow-hidden bg-black/5 relative pt-12">
          <Head />
          {children}
        </div>
      </div>
  )
}

export default AdminLayout