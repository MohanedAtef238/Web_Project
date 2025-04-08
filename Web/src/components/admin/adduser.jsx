import './form.css';
import { useNavigate, Link } from "react-router-dom";

function Adduser(){

    return(
        <form>
            <input className='add-field-input ' placeholder='Username' />
            <input className='add-field-input ' placeholder='Email'/>
            <input className='add-field-input' type='password' placeholder='Password'/>
            <Link to="/admin"><button>Create user</button></Link>
                
        </form>
    )
}

export default Adduser;