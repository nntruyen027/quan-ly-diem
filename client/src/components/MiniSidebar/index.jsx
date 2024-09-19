import React from 'react';
import PropTypes from 'prop-types';
import { Divider, } from '@mui/material';

const MiniSidebar = ({ items, onTabChange, activeTab, }) => {
  return (
    <div className='w-1/6 h-fit bg-white relative'>
      <ul className='p-0 m-0'>
        {items?.map((item, index) => (
          <>
            <li
              key={index}
              className={`p-3 leading-5 text-left cursor-pointer ${item.value === activeTab ? 'bg-blue-500 text-white' : 'text-black'}`}
              onClick={() => onTabChange(item.value)}
            >
              {item.label}
            
            </li>
            <Divider component='li' />
          </>
        ))}
      </ul>
    </div>
  );
};

MiniSidebar.propTypes = {
  items: PropTypes.array,
  onTabChange: PropTypes.func,
  activeTab: PropTypes.any,
};

export default MiniSidebar;
