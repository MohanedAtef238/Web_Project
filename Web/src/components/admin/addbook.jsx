import './form.css';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import UploadPlaybar from '../playbar/upload_playbar.jsx';
import Playbar from '../playbar/playbar.jsx'
import { addAdminBook } from '../../api/bookAPI.js';

function Addbook(){
    const [uploadedAudioState, setUploadedAudio] = useState(null);
    const [uploadedImageState, setUploadeImage] = useState(null);
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');

    const handle_image_upload = (event) => {
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadeImage(reader.result)
            };
            reader.readAsDataURL(file);
        }
    };

    const handle_audio_upload = (event) => {
        const file = event.target.files[0];
        if(file){
            const audioURL = URL.createObjectURL(file);
            setUploadedAudio(audioURL);
        }
    };
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
          const book = {
            title,
            genre,
            coverImage: uploadedImageState,
            audioFile: uploadedAudioState,
          };
          await addAdminBook(book);
          navigate('/admin');
        } catch (error) {
          console.error(error.message);
        }
      };
    return(
        <div>
             <form className="form">
                <div className='image-container'>
                    <h2>
                        Upload book image
                    </h2>
                    {uploadedImageState && (<img src={uploadedImageState}/> )}
                    <input type='file' id='imageUpload' accept='image/*' onChange={handle_image_upload}/>
                </div>
                <div className='content-container'>
                    <input className='add-field-input ' placeholder="e.g. Lord of The Ring" value={title}   onChange={(e) => setTitle(e.target.value)}/>
                    <input className='add-field-input ' placeholder="e.g. Fiction"   value={genre}   onChange={(e) => setGenre(e.target.value)}/> 
                    <input type='file' id='audioUpload' accept='audio/mp3' onChange={handle_audio_upload}/>
                    {uploadedAudioState &&
                        <div>
                            <audio controls>
                                <source src={uploadedAudioState} type='audio/mp3'/>
                            </audio>
                            <UploadPlaybar/>
                        </div>
                    }
                    <br/>
                    <div className='buttons-div'>
                        <button type="button" onClick={handleSubmit}>Create Book</button>
                        <Link to='/admin'>
                            <button className="cancel-btn submit-btn">
                            Cancel
                            </button> </Link>
                    </div>
                  
                    {/*I think since we need an author we can make the author the platform */}
                    {/* The duration should be automatically calculated, as well as the id */}
                </div>
            </form>
        </div>
    )
}

export default Addbook;