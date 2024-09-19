import React from 'react';

const LoadingPage = () => (
  <div className='relative top-0 left-0'>
    <img className='absolute w-1/4 h top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2' src={`${process.env.PUBLIC_URL}/assets/pages/other/loading.gif`} alt='loading'/>
  </div>
);

export default LoadingPage;