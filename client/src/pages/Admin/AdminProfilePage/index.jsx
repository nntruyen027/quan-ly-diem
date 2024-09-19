import React, { useState, } from 'react';
import Account from './components/Account';
import Password from './components/Password';
import { translate, } from '~/helpers';
import { MiniSidebar, } from '~/components';

const AdminProfilePage = () => {
  const [activeTab, setActiveTab,] = useState('account');

  const items = [
    {
      label: translate('account'), value: 'account', 
    },
    {
      label: translate('password'), value: 'password', 
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
    case 'account':
      return <Account />;
    case 'password':
      return <Password />;
    default:
      return <Account />;
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>{translate('profile')}</div>
      <div className='flex flex-row gap-3 justify-between'>
        <MiniSidebar items={items} onTabChange={setActiveTab} activeTab={activeTab} />
        <div className='w-full'>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
