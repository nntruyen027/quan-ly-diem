import React from 'react';
import PropTypes from 'prop-types';
import { HexColorPicker, } from 'react-colorful';

const ColorSelector = ({ value, setValue, }) => {
  return (
    <div>
      <HexColorPicker color={value} onChange={setValue} />
    </div>
  );
};

ColorSelector.propTypes = {
  value: PropTypes.any.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default ColorSelector;