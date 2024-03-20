import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function App({initialValue,onChange}) {
  const editorRef = useRef(null);
  
  return (
    <>
      <Editor
      apiKey={process.env.TINY_MCE_API}
      
      onChange={(e) => {
        onChange(editorRef.current.getContent())
        }}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={initialValue}
        
        init={{
          height: 500,
          menubar: true,
          toolbar:true,
          selector: "#editor",
          plugins: [
            ""
          ],
          toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | indent outdent | wordcount',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      
    </>
  );
}