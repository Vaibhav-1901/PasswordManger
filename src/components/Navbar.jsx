import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className='flex justify-between px-4 md:px-30 min-w-full  bg-gradient-to-br from-slate-800 to-slate-700 text-amber-50 py-3 items-center'>
                <h1 className='font-bold text-3xl font-mono'>
                    &lt;Lock<span className='text-emerald-500'>r</span>/&gt;
                </h1>
                <ul className='flex gap-6 font-md text-lg cursor-pointer'>
                    <a href="https://github.com/Vaibhav-1901" target='_blank'>
                    <button className='bg-emerald-600 pl-1 pr-4 py-1 rounded-full flex justify-start items-center hover:bg-emerald-500 transition duration-200 cursor-pointer'>
                    <img className=' w-9 p-1' src="icons/github.svg"   alt="" />GitHub</button>
                    </a>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar