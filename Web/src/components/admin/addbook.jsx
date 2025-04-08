import './form.css';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import UploadPlaybar from '../playbar/upload_playbar.jsx';
import Playbar from '../playbar/playbar.jsx'

function Addbook(){
    const [uploadedAudioState, setUploadedAudio] = useState(null);
    const [uploadedImageState, setUploadeImage] = useState(null);

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
                    <input className='add-field-input ' placeholder="e.g. Lord of The Ring"/>
                    <input className='add-field-input ' placeholder="e.g. Fiction"/> 
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
                    <Link to="/admin"><button>Create Book</button></Link>
                    {/*I think since we need an author we can make the author the platform */}
                    {/* The duration should be automatically calculated, as well as the id */}
                </div>
            </form>
        </div>
    )
}

export default Addbook;