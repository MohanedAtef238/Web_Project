import './form.css';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import UploadPlaybar from '../playbar/upload_playbar.jsx';
import Playbar from '../playbar/playbar.jsx'
import { addAdminBook } from '../../api/bookAPI.js';
import { useAuth } from '../../Context';

function Addbook({ onCancel, userId }){
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [previewImageURL, setPreviewImageURL] = useState(null);
    const [previewAudioURL, setPreviewAudioURL] = useState(null);
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [coverImageChanged, setCoverImageChanged] = useState(false);
    const [audioFileChanged, setAudioFileChanged] = useState(false);
    
    // Get the current authenticated user info
    const { user } = useAuth();

    const handle_image_upload = (event) => {
        const file = event.target.files[0];
        if(file){
            setCoverImageFile(file);
            setPreviewImageURL(URL.createObjectURL(file));
            setCoverImageChanged(true);
        }
    };

    const handle_audio_upload = (event) => {
        const file = event.target.files[0];
        if(file){
            setAudioFile(file);
            setPreviewAudioURL(URL.createObjectURL(file));
            setAudioFileChanged(true);
        }
    };
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
          const formData = new FormData();
          formData.append('title', title);
          formData.append('genre', genre);
          console.log('userId is ', userId, ' and user.id is ', user.id)
          if (!user.id) {
            console.error('No author ID available');
            return;
          }
         
          formData.append('authorId', user.id );
          
          if (coverImageChanged && coverImageFile) {
            formData.append('coverImage', coverImageFile);
          }
          if (audioFileChanged && audioFile) {
            formData.append('audioFile', audioFile);
          }
          await addAdminBook(formData);
          setCoverImageChanged(false);
          setAudioFileChanged(false);
          
          if (onCancel) {
            onCancel();
          } else {
            navigate('/admin');
          }
        } catch (error) {
          console.error('Submission failed ', error.message);
        }
      };
      
    const handleCancel = () => {
      if (onCancel) {
        onCancel();
      } else {
        navigate('/admin');
      }
    };
    
    return(
        <div>
             <form className="form">
                <div className='image-container'>
                    <h2>
                        Upload book image
                    </h2>
                    {previewImageURL && <img src={previewImageURL} alt="Cover Image" />}
                    {!coverImageChanged && <input type='file' id='imageUpload' accept='image/*' onChange={handle_image_upload}/>}
                </div>
                <div className='content-container'>
                    <input className='add-field-input ' placeholder="e.g. Lord of The Ring" value={title}   onChange={(e) => setTitle(e.target.value)}/>
                    <input className='add-field-input ' placeholder="e.g. Fiction"   value={genre}   onChange={(e) => setGenre(e.target.value)}/> 
                    {!audioFileChanged && <input type='file' id='audioUpload' accept='audio/mp3' onChange={handle_audio_upload}/>}
                    {previewAudioURL &&
                        <div>
                        <audio controls>
                            <source src={previewAudioURL} type='audio/mp3' />
                        </audio>
                        </div>
                    }
                    <br/>
                    <div className='buttons-div'>
                      <button type="button" disabled={!title || !genre || !coverImageFile || !audioFile} onClick={handleSubmit}>Create Book</button>
                      <button type="button" className="cancel-btn submit-btn" onClick={handleCancel}>Cancel</button>
                    </div>
                  
                    {/*I think since we need an author we can make the author the platform */}
                    {/* The duration should be automatically calculated, as well as the id */}
                </div>
            </form>
        </div>
    )
}

export default Addbook;