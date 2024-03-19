import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const TextEditor = ({initialValue,onChange}) => {
  return (
    <div className="App">
                <CKEditor
                    editor={ ClassicEditor }
                    data={initialValue}
                    
                    
                    onChange={ ( event ) => {
                      console.log(event.editor);
                  } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
  )
}

export default TextEditor
