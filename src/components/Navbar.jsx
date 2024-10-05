import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-900 text-white py-4'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>
            TaskTracker
            </span>
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all'>My Tasks</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        </ul>
    </nav>
  )
}

export default Navbar
