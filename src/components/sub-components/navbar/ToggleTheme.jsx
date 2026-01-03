'use client'
import { Around } from '@theme-toggles/react';
import "@theme-toggles/react/css/Around.css"
import React, { useState, useEffect } from 'react';

const ToggleTheme = () => {
  const [isToggled, setToggle] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setToggle(savedTheme === 'dark');
  }, []);

  const handleToggle = () => {
    const html = document.documentElement;
    if(isToggled){
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      setToggle(false);
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setToggle(true);
    }
  }

  return (
    <div className='fixed bottom-0 right-0 flex justify-center items-center p-4 z-[1000]'>
      <Around 
        toggled={isToggled} 
        onClick={handleToggle} 
        className='lg:text-6xl md:text-5xl mmd:text-4xl text-3xl'
      />
    </div>
  );
};

export default ToggleTheme;
