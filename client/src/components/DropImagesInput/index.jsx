import React, { useEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import { Dropzone, FileCard, } from '@files-ui/react';

const DropImagesInput = ({ multiple, files, setFiles, }) => {
  const [value, setValue,] = useState([]);

  useEffect(() => {
    setValue(files);
  }, [files,]);

  const updateFiles = (incomingFiles) => {
    if (multiple) {
      setFiles(incomingFiles);
    } else {
      setFiles(incomingFiles.slice(0, 1));
    }
  };

  const removeFile = (fileToRemove) => {
    const updatedFiles = value.filter(file => file.id !== fileToRemove);
    setFiles(updatedFiles);
  };

  return (
    <div className='relative p-6 h-50 w-full mx-auto mt-10 flex flex-col items-center text-base leading-[1.6] select-none overflow-y-auto'>
      <Dropzone
        onChange={updateFiles}
        value={value}
        accept='image/*'
        style={{
          border: '2px dashed #3b82f6', padding: '20px', cursor: 'pointer', 
        }}
      >
        {value.map((file) => (
          <FileCard key={file.id} {...file} onDelete={removeFile} info preview />
        ))}
      </Dropzone>
    </div>
  );
};

DropImagesInput.propTypes = {
  multiple: PropTypes.bool,
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired,
};

export default DropImagesInput;
