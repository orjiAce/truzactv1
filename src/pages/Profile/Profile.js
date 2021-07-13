import React, {useState, useEffect, useCallback} from 'react';
import Notification from "../../components/Notification";
import './Profile.scss';
import '../../Style/Responsive/Responsive.Profile.scss';
import Footer from "../../components/Footer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowUp,
    faAt,
    faCamera, faChevronUp, faCopy, faLongArrowAltUp,
    faMoneyBill,
    faPhone, faPiggyBank,
    faPlus,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import holdingPhone from '../../assets/holding-phone-colour.svg';
import holdingPhoneDark from '../../assets/holding-phone-monochrome.svg';
import TextInput from "../../components/TextInput";
import useDarkMode from "use-dark-mode";
import refAI from "../../assets/ai/wfh_7.svg";
import brandLogo from "../../assets/img/Truzact logo white horinzontal.png";

import Menu from "../../components/Menu";
import MobileNav from "../../components/MobNav";
import {motion} from "framer-motion"
import redaxios from 'redaxios'


//redux
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from "react-router-dom";
import {ImPhone, ImEnvelop, ImKey} from 'react-icons/im'
import {GiTakeMyMoney} from 'react-icons/gi'
import {FaChevronRight, FaCopy, FaPiggyBank, FaUserAstronaut, FaUserFriends} from 'react-icons/fa'
import {useClipboard, useToast} from "@chakra-ui/react";
import Loader from "react-loader-spinner";
import {updateUserImage} from "../../redux/actions/userActions";


const mobPageTransition = {

    in: {
        opacity: 1,
        x: 0,
    },
    out: {
        opacity: 0,
        x: "10vw",
    }
}

const pageTransition = {

    in: {
        opacity: 1,
        y: 0
    },
    out: {
        opacity: 0,
        y: "-10vh",
    }
}

let referalId;
const Profile = (props) => {

    const toast = useToast()

    const [btcPrice, setBtcPrice] = useState('')

    const {value} = useDarkMode(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(true)
    }, [])

    const getBtcPrice = useCallback(() => {
        redaxios.get('https://api.coindesk.com/v1/bpi/currentprice.json',)
            .then((res) => {
                console.log(res.data.bpi.USD.rate)
                setBtcPrice(res.data.bpi.USD.rate)
            }).catch((err) => {

            console.log(err.response)
        })
    }, [])

    useEffect(() => {
        getBtcPrice()
    }, [getBtcPrice])


    //user info
    const {userData: {member: {FirstName, LastName, EmailAddress, Phone, ProfileImage, USDT, Token}}, loading} = props.user
  let money = USDT;

    const {hasCopied, onCopy} = useClipboard(referalId)
const {updateUserImage} = props

    const copyLink = () => {
        onCopy()


        toast({
            title: "Copied!",
            description: "Share your referral link with friends",
            duration: 6000,
            position: "top",
            status: "info",
            isClosable: true,
        })
    }

    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    const handleImageChange = useCallback((event) => {
        const image = event.target.files[0];
        if(image.size > 2016615){
 toast({
    title: "Image too large!",
     description: "Image should be less than 2mb",
     duration: 6000,
     position: "top",
     status: "error",
    isClosable: true,
 })

        }else {
            const formData = new FormData();
            formData.append('ProfileImage', image, image.name);
            formData.append('Phone', Phone)
            formData.append('Token', Token)
            console.log(image)
             updateUserImage(formData);
        }



    }, [Token,Phone]);


    return (
        <div className="App">
            <Menu/>
            <motion.div exit="out" initial="out" animate="in" className="userProfile" variants={pageTransition}>

                <Notification/>

                <div className='userProfileFDesktop'>
                    <div className='cardHeadsWrap'>
                        <section className='balance'>

                            <Link to='/deposit' className='depositBtn'>
                                <section className='icon'>
                                    <FontAwesomeIcon icon={faArrowUp}/>
                                </section>

                                <div className='text'>
                                    DEPOSIT
                                </div>
                            </Link>

                            <div className='amount'>
                                ₦{money}
                            </div>
                        </section>

                        <section className='price'>
                            <div className='coinIcon'>
                                <img alt='btc logo' src='https://app.roqqu.com/static/media/btc.d9c1768c.png'/>
                            </div>

                            <div className='coinPrice'>
                                <div className='currentPrice'>
                                    ${btcPrice}

                                </div>
                                <small className='note'>
                                    Updated a few seconds ago
                                </small>
                            </div>

                        </section>

                        <section className='addBank'>
                            <div className='iconWrap'>
                                <div className='icon'>
                                    <FontAwesomeIcon icon={faMoneyBill}/>
                                </div>

                            </div>

                            <div className='activities'>
                                <Link to='/addBank'>
                                <button>
                                    <FontAwesomeIcon icon={faPlus}/> Add Bank
                                </button>
                                </Link>
                                <div className='note'>
                                    You have not added any bank accounts yet, add one to begin.
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className='mainCardWrap'>

                        <section className='left'>
                            <div className='profileSettings'>
                                <div className='userInfo'>
                                    <div className='userImage'>

                                        {
                                            !ProfileImage ? (
                                                    <img
                                                        src={'https://www.flaticon.com/svg/static/icons/svg/1077/1077114.svg'}
                                                        alt='user'/>)
                                                :

                                                <img src={ProfileImage} alt='user'/>

                                        }
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            id="imageInput"
                                            hidden="hidden"
                                            onChange={handleImageChange}
                                        />
                                        <button className='camera' onClick={handleEditPicture}>
                                            <FontAwesomeIcon icon={faCamera}/>
                                        </button>

                                    </div>

                                    <div className='otherInfo'>
                                        <div className='fullName'>
                                            {
                                                LastName
                                            }
                                            &nbsp;
                                            {
                                                FirstName
                                            }
                                        </div>
                                        <div className='note'>
                                            Email authentication is automatically activated
                                            on your account
                                        </div>
                                    </div>
                                </div>

                                <form method='post' action='' className='formWrap'>

                                    <TextInput label={<FontAwesomeIcon icon={faAt}/>}
                                               value={EmailAddress} topLabel='Email' name={'email'} readOnly/>
                                    <TextInput value={FirstName} label={<FontAwesomeIcon icon={faUser}/>}
                                               placeHolder='First name' topLabel='First Name'
                                               readOnly/>
                                    <TextInput value={Phone} label={<FontAwesomeIcon icon={faPhone}/>}
                                               placeHolder='Phone' topLabel='Phone number' readOnly/>
                                    <TextInput value={LastName} label={<FontAwesomeIcon icon={faUser}/>}
                                               topLabel='Last Name' placeHolder='Last Name'
                                               readOnly/>

                                    <button className='updateBtn' disabled>
                                        <FontAwesomeIcon icon={faChevronUp}/> &nbsp;
                                        &nbsp;
                                        Appeal
                                    </button>
                                </form>


                            </div>
                            <div className='verification'>
                                <section className='illustration'>
                                    {
                                        value ? (<img src={holdingPhoneDark} alt={'holding phone'}/>) : (
                                            <img src={holdingPhone} alt={'holding phone'}/>)
                                    }

                                </section>

                                <section className='verificationDetail'>
                                    <div className='header'>
                                        Verification Required
                                    </div>

                                    <div className='otherInfo'>
                                        Verification needed, your account
                                        verification is incomplete.
                                    </div>
                                    <Link to='/security'>


                                    <button>
                                        <FontAwesomeIcon icon={faLongArrowAltUp}/> &nbsp; &nbsp; Increase Account Limit
                                    </button>
                                    </Link>
                                </section>
                            </div>
                        </section>

                        <section className='right'>
                            <div className='referral'>
                                <div className='title'>
                                    <span className='titleBack'>Earn Passive </span> &nbsp;
                                    <span> Income on Truzact</span>
                                </div>
                                <div className='refContent'>
                                    Refer your friends and earn 0.5% on
                                    all their transactions when they sign
                                    up using your referral code. Click button below to copy your referral code.
                                </div>

                                <hr className='crossLine'/>


                                <div className='bottomWrap'>

                                    <div className='refIllustration'>
                                        <img src={refAI} alt='Referral Ai'/>
                                    </div>
                                    <div className='btnWrap'>
                                        <button className='actionBtn' onClick={copyLink}>

                                            {
                                                hasCopied ? ('Copied') : (<FontAwesomeIcon icon={faCopy}/>)
                                            }

                                        </button>
                                    </div>

                                </div>

                            </div>

                            <div className='accountPreference'>
                                <div className='header'>
                                    Account Preferences
                                </div>
                                <small>
                                    Weekly news letter
                                </small>
                                <div>
                                    <label className="switch">
                                        <input type="checkbox"/>
                                        <span className="slider round">

                                </span>
                                    </label>
                                </div>


                            </div>
                        </section>

                    </div>


                </div>
                <Footer/>


                {/*

            Mobile version
            */}


            </motion.div>
            <div className='mobDash'>
                <div className='mobileHeader'>
                    <section className='brandLogo'>
                        <img src={brandLogo} alt='brand logo'/>
                    </section>
                </div>


                <motion.div exit="out" initial="out" animate="in" variants={mobPageTransition} className='mobContent'>

                    <div className='miniUserProfile'>
                        <section className='userName'>
                            {
                                LastName
                            }
                            &nbsp;
                            {
                                FirstName
                            }
                        </section>
                        <section className='userEmail'>
                            {
                                EmailAddress
                            }
                        </section>

                        <section className='userImage' onClick={handleEditPicture}>

                         { loading ? ( <Loader
                                 type="Oval"
                                 color="#fff"
                                 height={50}
                                 width={50}

                             />) :
                                !ProfileImage ? (
                                        <img src={'https://www.flaticon.com/svg/static/icons/svg/1077/1077114.svg'}
                                             alt='user'/>)
                                    : (


                                    <img src={ProfileImage} alt='user'/>
                                    )

                            }

                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                id="imageInput"
                                hidden="hidden"
                                onChange={handleImageChange}
                            />
                        </section>
                    </div>


                    <div className='miniBalance'>
                        <div className='earnings'>
                            <div className="amount">
                                ₦ {money}
                            </div>
                            <div className='txt'>
                                Your earnings
                            </div>
                        </div>
                        <Link to='/deposit'>


                            <button className='depositButton'>

                                <section className='icon'>
                                    <FontAwesomeIcon icon={faArrowUp}/>
                                </section>
                                <section className='text'>
                                    Deposit
                                </section>
                            </button>
                        </Link>
                    </div>
                    <div className='miniButtons'>

                        <button className='saveBtn'>
                            <Link to='/save'>
                            <i> <FontAwesomeIcon icon={faPiggyBank}/></i>
                            <div> Save</div>
                            </Link>
                        </button>


                        <button className='addBankBtn'>
                            <Link to='/save'>
                            <i> <GiTakeMyMoney/></i>
                            <div>Withdraw</div>
                            </Link>
                        </button>

                    </div>
                    <div className='editDetail'>
                        <FaUserFriends/>
                        <div className='phoneUtils'>
                            <div>{/*{ReferralID}*/}
                                copy referral code
                            </div>
                        </div>
                            <button className="updateArr" onClick={copyLink}>
                                <FaCopy/>
                            </button>

                    </div>

                    <div className='editDetail'>

                        <FaUserAstronaut/>
                        <div className='phoneUtils'>
                            <div><small>Referral Earnings </small></div>
                            <div><small>₦ 0.00 </small></div>
                        </div>

                        <button className="updateArr">
                            <FaChevronRight/>
                        </button>
                    </div>

                    <div className='editDetail'>
                        <ImPhone/>
                        <div className='phoneUtils'>
                            <div>{Phone}</div>
                        </div>

                        <button className="updateArr">
                            <FaChevronRight/>
                        </button>
                    </div>
                    <div className='editDetail'>
                        <ImEnvelop/>
                        <div className='phoneUtils'>
                            <div>{EmailAddress}</div>
                        </div>

                        <button className="updateArr">
                            <FaChevronRight/>
                        </button>
                    </div>

                    <div className='editDetail'>
                        <ImKey/>
                        <div className='phoneUtils'>
                            <div>***********</div>
                        </div>
                        <NavLink to='/security'>
                            <button className="updateArr">
                                <FaChevronRight/>
                            </button>
                        </NavLink>
                    </div>

                    <div className='editDetail'>
                        <FaPiggyBank/>
                        <div className='phoneUtils'>
                            <div>Add bank account</div>
                        </div>
                        <NavLink to='/addBank'>
                            <button className="updateArr">
                                <FaChevronRight/>
                            </button>
                        </NavLink>
                    </div>


                    <section className='verificationDetail'>
                        <div className='verificationActions'>
                            <div className='verificationAi'>
                                {
                                    value ? (<img src={holdingPhoneDark} alt={'holding phone'}/>) : (
                                        <img src={holdingPhone} alt={'holding phone'}/>)
                                }
                            </div>
                            <div className='verification'>


                                <div className='header'>
                                    Verification Required
                                </div>

                                <div className='otherInfo'>
                                    Verification needed, your account
                                    verification is incomplete.
                                </div>
                            </div>
                        </div>
                        <Link to='/security'>
                        <button>
                            <FontAwesomeIcon icon={faLongArrowAltUp}/> &nbsp; &nbsp; Increase Account Limit
                        </button>
                        </Link>
                    </section>

                    <section className='accountPref'>

                    </section>

                </motion.div>


            </div>
            <MobileNav/>
        </div>
    );
};

Profile.prototype = {
    data: PropTypes.object.isRequired,
    updateUserImage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})
const mapActionToProps ={
    updateUserImage
}


export default connect(mapStateToProps, mapActionToProps)(Profile);
