import { Avatar, } from '@files-ui/react';
import { Button, TextField, } from '@mui/material';
import { DatePicker, } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { QuiltedImageList, } from '~/components';
import { translate, } from '~/helpers';
import { deletePhotoRequestStart, updateUserRequestStart, } from '~/redux/auth/slice';

const Account = () => {
  const { user, } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [imageSource, setImageSource,] = React.useState(`${process.env.REACT_APP_HOST_IP}/${user?.avatar}` || null);
  const [fullname, setFullname,] = React.useState(user?.fullname);
  const [username, setUsername,] = React.useState(user?.username);
  const [birthday, setBirthday,] = React.useState(dayjs(user?.birthday));
  const [phone, setPhone,] = React.useState((user?.phone));
  const [email, setEmail,] = React.useState((user?.email));
  const [address, setAddress,] = React.useState((user?.address));

  const handleChangeSource = (selectedFile) => {
    setImageSource(selectedFile);
  };

  const handleAddImages = (photos) => {
    const form = new FormData();
    if(photos != [])
      photos?.forEach((photo) => {
        form.append('photos', photo.file);
      });
    dispatch(updateUserRequestStart(form));
  };

  const handleRemovePhoto = (photo) => {
    dispatch(deletePhotoRequestStart(photo?.img?.split('/')[4]));
  };

  const handleSavePublicInfo = () => {
    const form = new FormData();
    if(username != user?.username)
      form.append('username', username);
    if(fullname != user?.fullname)
      form.append('fullname', fullname);
    if(imageSource && imageSource != `${process.env.REACT_APP_HOST_IP}/${user?.avatar}`)
      form.append('avatar', imageSource);

    dispatch(updateUserRequestStart(form));
  };
  
  const handleSaveContactInfo = () => {
    const form = new FormData();
    if(email != user?.email)
      form.append('email', email);
    if(phone != user?.phone)
      form.append('phone', phone);
    if(birthday != user?.birthday)
      form.append('birthday', birthday);
    if(address != user?.address)
      form.append('address', address);

    dispatch(updateUserRequestStart(form));
  };
 
  const render = () => (
    <div className='gap-3 flex flex-col'>
      <div className='rounded-xl p-3 bg-white'>
        <div className='text-left text-gray-500 font-bold mb-10'>{translate('public-info')}</div>
        <div>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-3 w-1/2'>
              <TextField value={fullname} onChange={e => setFullname(e.target.value)} size='small' placeholder={translate('fullname')} label={translate('fullname')}/>
              <TextField value={username} onChange={e => setUsername(e.target.value)} size='small' placeholder={translate('username')} label={translate('username')}/>
            </div>
            <div>
              <Avatar 
                src={imageSource} alt='Avatar' 
                onChange={handleChangeSource} 
                variant='circle' 
                emptyLabel={user?.fullname}
                changeLabel={user?.fullname}
                style={{
                  width: '120px', height: '120px', 
                  transform: 'translateY(-20px) translateX(-30px)',
                }}
              />
            </div>
          </div>
          <div className='text-left'>
            <Button onClick={handleSavePublicInfo} variant='contained'>{translate('save')}</Button>
          </div>
        </div>
        
      </div>
      <div className='rounded-xl p-3 bg-white'>
        <div className='text-left text-gray-500 font-bold mb-10'>{translate('contact-info')}</div>
        <div className='flex flex-col gap-3 w-2/3'>
          <div className='flex flex-row justify-between gap-3'>
            <TextField className='w-full' type='text' value={email} onChange={e => setEmail(e.target.value)} size='small' placeholder={translate('email')} label={translate('email')}/>
            <TextField className='w-full' type='text' value={phone} onChange={e => setPhone(e.target.value)} size='small' placeholder={translate('phone')} label={translate('phone')}/>
          </div>
          
          <DatePicker label={translate('birthday')} format='DD/MM/YYYY' value={birthday} onChange={e => setBirthday(e)} slotProps={{
            textField: {
              size: 'small',
            },
          }}/>
          <TextField type='text' multiline value={address} onChange={e => setAddress(e.target.value)} size='small' placeholder={translate('address')} label={translate('address')}/>
        </div>
        <div className='text-left mt-4'>
          <Button onClick={handleSaveContactInfo} variant='contained'>{translate('save')}</Button>
        </div>
      </div>
      <div className='rounded-xl p-3 bg-white'>
        <div className='text-left text-gray-500 font-bold mb-10'>{translate('image')}</div>
        <QuiltedImageList itemData={user?.photos?.map(value => (
          {
            img: `${process.env.REACT_APP_HOST_IP}/${value}`,
          }
        ))} actions={[
          {
            label: translate('remove-image'),
            func: handleRemovePhoto,
          },
        ]} onAddImages={handleAddImages}/>
      </div>
    </div>
  );

  return render();
};

export default Account;