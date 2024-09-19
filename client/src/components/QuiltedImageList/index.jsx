import * as React from 'react';
import PropTypes from 'prop-types';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Modal as BModal, Button as BButton, } from 'react-bootstrap';
import { translate, } from '~/helpers';
import { DropImagesInput, } from '~/components';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList({ actions, itemData, onAddImages, ...other }) {
  const [anchorEl, setAnchorEl,] = React.useState(null);
  const [currentItem, setCurrentItem,] = React.useState(null);
  const [show, setShow,] = React.useState(false);
  const [newImages, setNewImages,] = React.useState([]);
  const [cols, setCols,] = React.useState(4);

  const openMenu = Boolean(anchorEl);

  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem(item);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentItem(null);
  };

  const handleDialogOpen = () => {
    setShow(true);
  };

  const handleDialogClose = () => {
    setShow(false);
    setNewImages([]);
  };

  const handleSaveImages = () => {
    onAddImages(newImages);
    handleDialogClose();
  };

  React.useEffect(() => {
    const updateCols = () => {
      const width = document.getElementById('quilted-image-list-container').clientWidth;
      const calculatedCols = Math.floor(width / 121); // Tính toán số lượng cột dựa trên chiều rộng và chiều cao dòng
      setCols(calculatedCols);
    };

    updateCols(); // Cập nhật số lượng cột khi component được mount
    window.addEventListener('resize', updateCols); // Lắng nghe sự kiện thay đổi kích thước màn hình

    return () => {
      window.removeEventListener('resize', updateCols);
    };
  }, []);

  return (
    <div id='quilted-image-list-container'>
      <ImageList
        sx={{
          width: '100%', height: 'fit-content',
        }}
        variant='quilted'
        cols={cols}
        rowHeight={121}
        {...other}
      >
        <ImageListItem cols={1} rows={1} className='flex justify-center content-center'>
          <IconButton className='' color='primary' aria-label='add an image' onClick={handleDialogOpen}>
            <AddIcon />
          </IconButton>
        </ImageListItem>
        {itemData?.map((item) => (
          <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading='lazy'
              onClick={(event) => handleClick(event, item)}
            />
          </ImageListItem>
        ))}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          }}
        >
          {actions.map((action, index) => (
            <MenuItem key={index} onClick={() => { action.func(currentItem); handleCloseMenu(); }}>
              {action.label}
            </MenuItem>
          ))}
        </Menu>
      </ImageList>
      <BModal
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={show}
        onHide={handleDialogClose}
        dialogClassName='modal-2-3-width'
        style={{
          maxHeight: '100%', 
        }}
      >
        <BModal.Header closeButton>
          <BModal.Title>{translate('add-images-label')}</BModal.Title>
        </BModal.Header>
        <BModal.Body style={{
          maxHeight: '70vh', overflowY: 'auto', 
        }}>
          <DropImagesInput files={newImages} multiple setFiles={setNewImages} />
        </BModal.Body>
        <BModal.Footer>
          <BButton variant='secondary' onClick={handleDialogClose}>
            {translate('cancel-btn-label')}
          </BButton>
          <BButton variant='primary' onClick={handleSaveImages}>
            {translate('save-btn-label')}
          </BButton>
        </BModal.Footer>
      </BModal>
    </div>
  );
}

QuiltedImageList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    func: PropTypes.func.isRequired,
  })).isRequired,
  itemData: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rows: PropTypes.number,
    cols: PropTypes.number,
  })).isRequired,
  onAddImages: PropTypes.func.isRequired,
};
