import React,{useState} from 'react';
import TextInput from "./TextInput";
import {RiUserLine} from 'react-icons/ri'
import {BiKey} from 'react-icons/bi'
import {HiMail} from 'react-icons/hi'
import {gsap, Power3,TimelineLite} from "gsap";


const SignUpComponent = () => {

    const InputProps = [

        {
            type: 'text',
            topLabel: 'First Name',
            placeHolder: 'First Name',
            name: 'firstName',
            selectedClass:'firstName',
            label:<RiUserLine/>
        },
        {
            type: 'text',
            topLabel:'Last Name',
            placeHolder:'Last Name',
            name: 'lastName',
            selectedClass:'lastName',
            label:<RiUserLine/>

        }, {
            type: 'email',
            topLabel:'Email',
            placeHolder:'Your Email',
            name: 'email',
            label:<HiMail/>

        },
        {
            type:'password',
            placeHolder:'Password',
            topLabel: 'Your password',
            name:'password',
            label:<BiKey/>
        },

]




    return (



        <div className='SignUp'>



            <header className='SignUpHeader'>
<div className='title'>
    Sign Up to Truzact
</div>
                <div className='subText'>
                    Fill the form below with to create a truzact
                    profile.
                </div>
            </header>
            <form className='SignUpWrap' >
                {
                    InputProps.map((({type, label, topLabel, placeHolder,name}, index) =>(
                        <TextInput type={type} key={index} label={label} topLabel={topLabel} name={name} placeHolder={placeHolder}/>
                    )))
                }



            </form>


        </div>
    );
};

export default SignUpComponent;
