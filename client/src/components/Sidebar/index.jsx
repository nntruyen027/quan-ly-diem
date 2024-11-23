import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, } from 'react-router-dom';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faBars, } from '@fortawesome/free-solid-svg-icons';
import { translate, } from '~/helpers';

const Sidebar = ({ className, content, }) => {
  const [openMenus, setOpenMenus,] = useState({
  });
  const [isSidebarOpen, setIsSidebarOpen,] = useState(true);
  const location = useLocation();

  const handleMenuClick = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => location.pathname === path;
  const hasActiveChild = (children) => children.some(child => isActive(child.path));

  return (
    <div className={`h-screen text-left py-4 px-0 relative top-0 left-0 shadow-md ${className} transition-all duration-300 ${isSidebarOpen ? 'w-60' : 'w-0'}`}>
      <div className={`absolute top-6 ${isSidebarOpen ? '-right-12' : '-right-10'} hover:cursor-pointer`} onClick={toggleSidebar}>
        <FontAwesomeIcon className='text-white' icon={faBars} />
      </div>
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} h-full overflow-y-auto`}>
        <div className='text-center mb-8'>
          <h4 className='text-white'>{translate('system-name')}</h4>
        </div>
        <ul className='p-0 text-gray-500 text-sm font-medium font-["Inter"] leading-normal'>
          {content?.map((item) => (
            <li key={item.key} className={'mb-2'}>
              {item.children ? (
                <>
                  <div
                    className={`flex items-center justify-between cursor-pointer py-2 hover:bg-blue-00 ${hasActiveChild(item.children) ? 'border-r-4 border-white' : ''}`}
                    onClick={() => handleMenuClick(item.key)}
                  >
                    <span className='px-4 text-white'>{item.label}</span>
                    <span className='px-4 text-white'>{openMenus[item.key] ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</span>
                  </div>
                  {openMenus[item.key] && (
                    <ul className='p-0 mt-2'>
                      {item.children.map((child) => (
                        <li key={child.key} className={`mb-1 ${isActive(child.path) ? 'border-r-4 border-white' : ''}`}>
                          <Link to={child.path} className='block py-2 px-5 hover:bg-blue-00 text-white text-sm  font-medium font-["Inter"] leading-normal no-underline'>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.path} className={`block py-2 px-4 hover:bg-blue-00 text-white text-sm font-medium font-["Inter"] leading-normal no-underline ${isActive(item.path) ? 'border-r-4 border-white' : ''}`}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  content: PropTypes.object.isRequired,
};

export default Sidebar;