import React from 'react';
import { CKEditor, } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';

const RichTextEditor = ({ content, setContent, }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onChange={(event, editor) => {
        const data = editor.getData();
        setContent(data);
      }}
    />
  );
};

RichTextEditor.propTypes = {
  content: PropTypes.any.isRequired,
  setContent: PropTypes.func.isRequired,
};

export default RichTextEditor;
