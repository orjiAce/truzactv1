import React from 'react';
import TextInput from "./TextInput";
import {BiKey} from 'react-icons/bi'
import {HiMail} from 'react-icons/hi'


const LoginComponent = () => {




    return (

            <div className='login'>

                <div className='loginHeader'>

                    <div className='title'>
                        Login Up to Truzact
                    </div>
                    <div className='subText'>
                        Fill the form below with to access your truzact
                        profile..
                    </div>

                </div>
                <form className='loginWrap'>
                    <TextInput type='email' label={<HiMail/>} topLabel='Your email' name='email' placeHolder='Email'/>
                    <TextInput type='password' label={<BiKey/>} topLabel='Your password' name='password' placeHolder='Password'/>
                </form>
            </div>



    );
};

export default LoginComponent;
