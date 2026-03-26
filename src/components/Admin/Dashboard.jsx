import React, { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';

export default function Dashboard({setChoice, choice}) {

  const [showMonumentOptions, setShowMonumentOptions]= useState(true);
  const [showUserOptions, setShowUserOptions]= useState(true);

  const adminMonumentOptions = ['Add', 'Edit', 'Delete', 'Get'];
  const adminUserOptions= ["All Users"];

  return (
    <div className='flex flex-col justify-start min-h-[calc(100vh-64px)] w-60 md:w-64 p-4 bg-white border-r border-gray-200 dark:bg-gray-900/40 dark:border-gray-800 shadow-sm'>
        <div className='flex items-center gap-2 mb-8 px-2 py-2 mt-2'>
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <h1 className='text-xl font-bold text-gray-900 dark:text-white tracking-tight'>Dashboard</h1>
        </div>

        <div className='text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3 flex justify-between items-center cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors' onClick={()=>setShowMonumentOptions(!showMonumentOptions)}>
            <h2>Monuments</h2>
            <span className="text-xs">{showMonumentOptions ? "▲" : "▼"}</span>
        </div>

        <ul className="mb-8 space-y-1">
        {showMonumentOptions && adminMonumentOptions.map((option) => (
            <li key={option} 
                className={`px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium
                    ${choice === option 
                        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground font-semibold shadow-sm' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`} 
                onClick={()=>setChoice(option)}>
                {option}
            </li>
        ))}
        </ul>

        <div className='text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3 flex justify-between items-center cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors mt-4' onClick={()=>setShowUserOptions(!showUserOptions)}>
            <h2>Users</h2>
            <span className="text-xs">{showUserOptions ? "▲" : "▼"}</span>
        </div>

        <ul className="space-y-1">
        {showUserOptions && adminUserOptions.map((option) => (
            <li key={option} 
                className={`px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium
                    ${choice === option 
                        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground font-semibold shadow-sm' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`} 
                onClick={()=>setChoice(option)}>
                {option}
            </li>
        ))}
        </ul>
    </div>
  )
};
