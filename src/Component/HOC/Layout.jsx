import { Outlet } from 'react-router-dom'
import Sidebar from '../Navigation/Sidebar'

function Layout() {
  return (
    <div>
      <Sidebar />
      <main className='ml-48 p-6'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout