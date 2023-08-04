import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useState } from "react"
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import storage from '@/configs/firebase.config';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../Loader';


interface Props { 
    className?: string
    height?: number
    editorRef: React.MutableRefObject<TinyMCEEditor | null>
  } 

  
const TinyEditor = ({ height, className, editorRef }: Props) => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)
  const uui = uuidv4()


  const uploadImage = (blobInfo: any, success: any): Promise<string> => {
    // setError(null)
    setProgress(0)
    setLoading(true)

    const storageRef = ref(storage, `images/${uui}`);
    const uploadTask = uploadBytesResumable(storageRef, blobInfo.blob());


    uploadTask.on('state_changed', 
        (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // setProgress(progress)
        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
        }
        }, 
        (error) => {
            // setError(error?.message)
            setLoading(false)
            console.log("error", error)
            return error
        // Handle unsuccessful uploads
        }, 
        async() => {
            // setError(null)
            // setProgress(100)
            setLoading(false)
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        console.log('File available only at at', url);
        // success(url)
        return url
        }
    );
    return new Promise((resolve, reject) => {})
 }
 

  return (
    <>
            {loading && <Loader modalOpen={true} />}
            <Editor
                apiKey='lfp1sibdc44a0qoqpita2999rwr01nnq7abmtwh1pnhb8boe'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue=''
                init={{
                images_upload_handler: uploadImage,
                height: height || 300,
                // menubar: false,
                menubar: 'file edit view format tools table help',
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                    'print', 'paste', 'importcss', 'autosave', 'save', 'directionality', 'visualchars', 'template','codesample', 'hr', 'pagebreak', 'nonbreaking', 'toc', 'imagetools', 'textpattern', 'noneditable', 'charmap', 'quickbars', 'emoticons'
                ],
                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                // toolbar: 'undo redo | blocks | ' +
                //     'bold italic forecolor | alignleft aligncenter ' +
                //     'alignright alignjustify | bullist numlist outdent indent | ' +
                //     'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                
                }}
            />
            {/* <button onClick={log}>Log editor content</button> */}
            </>
  )
}

export default TinyEditor