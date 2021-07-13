import React, {useState, useEffect, useMemo} from 'react';
import './Auth.scss';
import '../../Style/Responsive/Responisve.Auth.scss'
import {gsap, Power3, TimelineLite} from "gsap";
import authImage from '../../assets/ai/auth.svg'
import TextInput from "../../components/TextInput";
import {RiUserLine, RiUserSharedLine} from "react-icons/ri";
import {HiMail} from "react-icons/hi";
import {BiKey, BiPhoneCall} from "react-icons/bi";
import {toggleAuth} from "../../redux/actions/dataActions";
import {loginUser, signUpUser} from "../../redux/actions/userActions";
import {connect} from "react-redux"
import PropTypes from "prop-types";

import Loader from "react-loader-spinner";
import PasswordStrengthBar from 'react-password-strength-bar';
import axios from 'axios'

//Toast
import {useToast} from "@chakra-ui/react"
import {Link} from "react-router-dom";


const AuthPage = (props) => {
    const toast = useToast()


    const {toggleAuth, signUpUser, loginUser} = props
    const {loading, errors} = props.user
    const {isLoginUi} = props.data

    let t1 = new TimelineLite();
    //for login
    const [loginPassword, setLoginPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [referral, setReferral] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [listOfCountries, setListOfCountries] = useState()
    const [flag, setFlag] = useState('https://restcountries.eu/data/afg.svg')


    //get list of countries
    useEffect(() =>{
   axios.get('https://restcountries.eu/rest/v2/all', ).then((res) =>{
     // console.log(res.data)
       setListOfCountries(res.data)

   }).catch((err) =>{
       console.log(err)
   })
       // console.log(listOfCountries)
    },[])

    const getInput = (value) =>{
        setCountry(value)
    }

    const getFlag = (flag) =>{

        setFlag(flag)
        console.log(flag)
        console.log('flag')
    }

    useMemo(() => {
        let t1 = new TimelineLite();
        t1.from('.headTitle', {
            opacity: 0,
            y: -10,
            ease: Power3.easeInOut,
        }).from('.bannerSubText', {
            opacity: 0,
            y: -10,
            ease: Power3.easeInOut,
        }).from('.authIllustration', {
            opacity: 0,
            y: -10,
            ease: Power3.easeInOut,
        })
    },[])

    useEffect(() => {
        if (loading === false && errors !== null) {


            toast({
                title: "Error",
                description: errors.message,
                position: "top",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }

    }, [errors,loading])

    const handleValidation = (e) => {
        if (/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>\/?~]/.test(firstName)) {
            setFirstName(e.target.value.split(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).join('').trim(''));

        }
        if (/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>\/?~]/.test(lastName)) {
            setLastName(e.target.value.split(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).join('').trim(''));

        }


    }


    const toggleNewUser = () => {
        gsap.to('.signUpBtn', {
            width: 190,
            ease: Power3.easeOut,
            color: '#fff',
            border: '1px solid #00068A',
            backgroundColor: '#00068A',

        })
        gsap.to('.loginBtn', {
            width: 100,
            ease: Power3.easeOut,
            color: '#131313',
            backgroundColor: '#fff',
            border: '1px solid #5E5D5D'
        })


        t1.to('.login', {
            display: 'none',
            ease: Power3.easeOut,
            y: -80,
            opacity: 0,
            delay: 0,

        })
        t1.to('.SignUp', {
            display: 'flex',
            ease: Power3.easeOut,
            y: 10,
            delay: 0,
            scale: 1,
            opacity: 1
        });


        toggleAuth(true)
        if (isLoginUi) {


            //here we validate
            if (firstName.length < 2 || lastName.length < 2) {

                toast({
                    title: "Your name is too short",
                    description: "Your name should be longer than 2 letters",
                    status: "warning",
                    duration: 6000,
                    position: "top",
                    isClosable: true,
                })
                return;
            }

            if (phone.length < 1) {
                toast({
                    title: "Phone number too short",
                    description: "Please enter a valid phone number",
                    status: "warning",
                    duration: 6000,
                    position: "top",
                    isClosable: true,
                })
                return;
            }
            if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(email) === false || email.length < 2) {

                toast({
                    title: "Invalid email",
                    description: "Please enter a valid email address",
                    status: "warning",
                    duration: 6000,
                    position: "top",
                    isClosable: true,
                })
                return;
            }

            if (password.length < 5) {
                toast({
                    title: "Password",
                    description: "password is too short",
                    status: "warning",
                    duration: 6000,
                    position: "top",
                    isClosable: true,
                })
                return;
            }


            if (password !== confirmPassword) {
                toast({
                    title: "Confirm Password",
                    description: "password don't match",
                    status: "warning",
                    duration: 6000,
                    position: "top",
                    isClosable: true,
                })
                return;
            }


            const formData = new FormData();
            formData.append('FirstName', firstName);
            formData.append('LastName', lastName);
            formData.append('Phone', phone);
            formData.append('Country', country);
            formData.append('EmailAddress', email);
            formData.append('Referrer ', referral);
            formData.append('Password', password);
            signUpUser(formData, props.history)


        }


        //console.log(props.data.isLoginUi)
    }

    const toggleLogin = () => {

        gsap.to('.loginBtn', {
            width: 190,
            backgroundColor: '#00068A',
            color: '#fff',
            border: '1px solid #00068A',
            ease: Power3.easeOut
        })
        gsap.to('.signUpBtn', {
            width: 100,
            ease: Power3.easeOut,
            color: '#131313',
            backgroundColor: '#fff',
            border: '1px solid #5E5D5D'

        })


        t1.to('.SignUp', {
            display: 'none',
            ease: Power3.easeOut,
            y: -10,
            opacity: 0,
            delay: 0,
        }).to('.login', {
            display: 'flex',
            ease: Power3.easeOut,
            y: 50,
            delay: 0,
            opacity: 1,
            scale: 1,
        });

        toggleAuth(false)
        if (!isLoginUi) {

            if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(loginEmail) === false || loginEmail.length < 2) {

                toast({
                    title: "Invalid email",
                    description: "Please enter a valid email address",
                    status: "warning",
                    duration: 6000,
                    position: "top",
                    isClosable: true,
                })
                return;
            }
            if (loginPassword.length < 5) {
                toast({
                    title: "Password",
                    description: "password is too short",
                    status: "warning",
                    duration: 6000,
                    position: "top",
                    isClosable: true,
                })
                return;
            }
            const formData = new FormData();

            formData.append('EmailAddress', loginEmail);
            formData.append('Password', loginPassword);
            loginUser(formData, props.history)

        }


    }


    return (
        <div className='authPage'>
            <div className='alertWrap'>

            </div>

            <div className='authComponent'>
                <div className='authContainer'>

                    <div className='SignUp'>

                        <header className='mobHeader'>

                            <div className='title'>
                                Sign Up to Truzact
                            </div>
                            <div className='subText'>
                                Fill the form below with to create a truzact
                                profile.
                            </div>
                        </header>
                        <header className='SignUpHeader'>
                            <div className='title'>
                                Sign Up to Truzact
                            </div>
                            <div className='subText'>
                                Fill the form below with to create a truzact
                                profile.
                            </div>
                        </header>
                        <form className='SignUpWrap' method='post'>

                            <div className='inputCont'>

                                <TextInput handleChange={e => setFirstName(e.target.value)} value={firstName}
                                           handleValidation={e => handleValidation(e)}
                                           type='text'
                                           label={<RiUserLine/>} topLabel='First Name' name='firstName'
                                           placeHolder='E.g Kayode'/>

                                <TextInput handleChange={e => setLastName(e.target.value)}
                                           handleValidation={e => handleValidation(e)} value={lastName} type='text'
                                           label={<RiUserLine/>} topLabel='Last Name' name='lastName'
                                           placeHolder='E.g Kelechi'/>

                            </div>


                            <TextInput handleChange={e => setEmail(e.target.value)} type='email'
                                       label={<HiMail/>} value={email} topLabel='Your Email' name='emailAddress'
                                       placeHolder='e.g kayode@yahoo.com'/>

                                       {/*

                                       ADD COUNTRY SELECTION
                                       */}
                                       <div className='inputWrap'>
                                           <div className='topLabel'>
                                             Your country
                                           </div>
                                           <div className='group'>
                                         {/*    <img src={flag} width='30' height='30'/>*/}
                                       <select  className='textInput' onChange={e => getInput(e.target.value)} >
                                           {
                                              listOfCountries ?listOfCountries.map((({name, flag}, index) =>(
                                                   <option key={index} value={country} onClick={ () => getFlag(flag)}  name={flag}>{name}</option>
                                               ))) : 'loading'
                                           }
                                       </select>
                                           </div>
                                       </div>
                            <TextInput handleChange={e => setPhone(e.target.value)}
                                       type='number'
                                       label={<BiPhoneCall/>} value={phone} topLabel='Your Phone Number' name='phone'
                                       placeHolder='e.g: 0818008091'/>

                            <TextInput handleChange={e => setReferral(e.target.value)}
                                       type='text'
                                       label={<RiUserSharedLine/>} value={referral} topLabel='Who told you about us?'
                                       name='referral'
                                       placeHolder='Referral'/>

                            <div className='inputCont'>
                                <TextInput handleChange={e => setPassword(e.target.value)} type='password'
                                           label={<BiKey/>} value={password} topLabel='Your Password' name='pass'
                                           placeHolder='Password'/>

                                <TextInput handleChange={e => setConfirmPassword(e.target.value)} type='password'
                                           label={<BiKey/>} value={confirmPassword} topLabel='Repeat Password'
                                           name='confirmPassword'
                                           placeHolder='Confirm Password'/>


                            </div>
                            <br/>
                            <div className='passStrength'>
                                <PasswordStrengthBar password={password} minLength={4}/>
                            </div>

                            <div className='bottomMessage'>
                                <span>
                                    By signing up you agree with our terms and condition
                                </span>

                            </div>
                            <div className='loaderContainer'>
                                {
                                    loading &&
                                    <Loader
                                        type="ThreeDots"
                                        color="#0A0777"
                                        height={50}
                                        width={50}
                                        timeout={3000} //3 secs

                                    />

                                }
                            </div>
                        </form>


                    </div>

                    <div className='login'>

                        <header className='mobHeader'>

                            <div className='title'>
                                Login to Your truzact account
                            </div>
                            <div className='subText'>
                                Fill the form below with to create a truzact
                                profile.
                            </div>
                        </header>
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
                            <TextInput type='email' value={loginEmail} handleChange={e => setLoginEmail(e.target.value)} label={<HiMail/>}
                                       topLabel='Your email' name='email'
                                       placeHolder='Email'/>
                            <TextInput type='password' value={loginPassword} handleChange={e => setLoginPassword(e.target.value)}
                                       label={<BiKey/>} topLabel='Your password' name='password'
                                       placeHolder='Password'/>
                            <div className='bottomMessage'>
                                <span>
                                   Forgot password?
                                </span>

                            </div>
                            <div className='loaderContainer'>
                                {
                                    loading &&
                                    <Loader
                                        type="ThreeDots"
                                        color="#0A0777"
                                        height={50}
                                        width={50}
                                        timeout={3000} //3 secs

                                    />

                                }
                            </div>
                        </form>
                    </div>
                </div>
                <div className='authButtonWrap'>
                    <button className='signUpBtn' onClick={() => toggleNewUser()}>
                        Sign Up
                    </button>

                    <button className='loginBtn' onClick={() => toggleLogin()} >
                        Login
                    </button>
                </div>
                <div>
                    Signin with SumoTrust
                </div>
            </div>

            <div className='bannerDescription'>
                <div className='headTitle'>
                    Create wealth with your crypto
                    assets
                </div>
                <div className='bannerSubText'>
                    Discover a safe world where it’s profitable to save & trade your cryptocurrency.
                </div>

                <div className='authIllustration'>
                    <img src={authImage} alt='Auth illustration'/>
                </div>
                <Link to='/home'>
                    <button className='aboutBtn'>
                        About Truzact
                    </button>
                </Link>
            </div>


        </div>
    );
};

AuthPage.propTypes = {
    data: PropTypes.object.isRequired,
    toggleAuth: PropTypes.func.isRequired,
    signUpUser: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})

const mapActionsToProps = {
    toggleAuth,
    signUpUser,
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(AuthPage);
