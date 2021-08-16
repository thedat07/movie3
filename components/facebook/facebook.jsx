import { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
export default function FaceBook() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState('');

    const responseFacebook = (response) => {
        console.log(response)
    }
    const componentClicked = () => console.log('clickd')
    let fbContent;
    if (isLoggedIn) { 
        fbContent=null
    }
    else {
        fbContent = (<FacebookLogin
        
            appId="825388598367891"
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook} 
            textButton=''
            icon={<i class="fab fa-facebook"></i>}
            />)
    }
    return (
        <div>{fbContent}</div>
    )
}