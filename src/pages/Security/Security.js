import React, {useState, useCallback, useEffect, useMemo} from 'react';
import Notification from "../../components/Notification";
import './Security.scss';
import '../../Style/Responsive/Responsive.security.scss'
import Footer from "../../components/Footer";
import {BsShieldLockFill, BsLockFill} from 'react-icons/bs';
import {TiCalendar} from 'react-icons/ti';
import {IoKey} from 'react-icons/io5';
import {RiArrowRightSLine, RiShieldKeyholeFill} from 'react-icons/ri';
import TextInput from "../../components/TextInput";
import brandLogo from "../../assets/img/Truzact logo white horinzontal.png";
import MobTop from "../../components/MobTop";
import MobileNav from "../../components/MobNav";
import Menu from "../../components/Menu";
import {motion} from "framer-motion"
import {Badge, RadioGroup, Stack, Radio,Spinner, useToast, useRadioGroup,HStack} from "@chakra-ui/react"
import {IoDocumentLock, IoSend} from 'react-icons/io5'
import {MdDateRange} from 'react-icons/md'
import {FaIdCardAlt, FaChild} from 'react-icons/fa'
import {BsFillPeopleFill} from 'react-icons/bs'
import {GiWorld} from 'react-icons/gi';
import onStateChange from 'redux-on-state-change'
import RadioCard from "../../components/RadioBtn";

//redux
import PropTypes from 'prop-types'
import {connect, useDispatch} from 'react-redux'
import {setKyc, updatePassword} from "../../redux/actions/userActions";
import {CLEAR_KYC_ERRORS, CLEAR_PASS_ERROR} from "../../redux/types";


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

const Security = (props) => {

    const dispatch = useDispatch()
    const toast = useToast()
    //for password reset
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [cNewPassword, setCNewPassword] = useState('');

    const options = ["Male", "Female"]

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "gender",
        defaultValue: "Male",
        onChange: console.log,
    })

    const group = getRootProps()



    //
    const [dob, setDob] = useState('')
    const [BVN, setBVN] = useState('')
    const [gender, setGender] = useState('Male')
    const [myState, setMyState] = useState('')
    const [country, setCountry] = useState('')
    const [nextOfKin, setNextOfKin] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [verificationId, setVerificationId] = useState('')
    const [relationShipStatus, setRelationShipStatus] = useState('')






        const {userData: {member: {ID,KYCStatus}}, kycData,updatePass,loadingKYC,loading,kycError,loadingPass,passError, errors} = props.user

    const {setKyc,updatePassword} = props

    const submitUserPass = useCallback((event) =>{
        event.preventDefault();
        const passFormData = new FormData();
        passFormData.append('OldPassword', oldPassword);
        passFormData.append( 'NewPassword', newPassword);
        passFormData.append( 'UserID', ID);

        if(cNewPassword !== newPassword){
            toast({
                title: "Confirm password",
                description: 'Password must match',
                position: "top",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            return
        }
        updatePassword(passFormData)



    },[toast,cNewPassword,oldPassword,newPassword,ID,updatePassword])


  useEffect(() =>{
    loadingPass === false && passError !== null &&
      toast({
          title: "Password Error",
          description: passError.message,
          position: "top",
          status: "error",
          duration: 5000,
          isClosable: true,
      })
 return  () =>{
        dispatch({
            type: CLEAR_PASS_ERROR
                 })
 }
},[loadingPass, passError, dispatch])


  useEffect(() =>{
    loadingPass === false && updatePass !== null &&
      toast({
          title: "Password Changed",
          description: updatePass.message,
          position: "top",
          status: "success",
          duration: 5000,
          isClosable: true,
      })


},[loadingPass, updatePass, dispatch])







    const userSetKyc  = useCallback((event) =>{
event.preventDefault();

        const formData = new FormData();
        formData.append('DOB', dob);
        formData.append('UserID', ID);
        formData.append('BVN', BVN);
        formData.append('Gender', gender);
        formData.append('State', myState);
        formData.append('Country', country);
        formData.append('NextKin', nextOfKin);
        formData.append('StreetAddress', streetAddress);
        formData.append('VerificationID', verificationId);
        formData.append('RelationshipStatus', relationShipStatus);
        setKyc(formData)

    }, [setKyc,dob,ID,BVN,gender,myState,country,nextOfKin,streetAddress,verificationId,relationShipStatus])


   useEffect(() =>{
       loadingKYC === false && kycError !== null &&
        toast({
            title: "Error on KYC",
            description: kycError.message,
            position: "top",
            status: "error",
            duration: 4000,
            isClosable: true,
        })
        return  () =>{
            dispatch({
                type: CLEAR_KYC_ERRORS
            })
        }
    },[loadingKYC, kycError, dispatch])

    useEffect(() =>{
       loadingKYC === false && kycData !== null &&
        toast({
            title: "KYC Updated",
            description: kycData.message,
            position: "top",
            status: "success",
            duration: 4000,
            isClosable: true,
        })

    },[loadingKYC, kycData,dispatch])

    return (
        <div className="App">

            <Menu/>
            <motion.div exit="out" initial="out" animate="in" variants={pageTransition} className='securityCenter'>
                <Notification/>
                <div className='securityContainer'>
                    <div className='securityTop'>
                        <section className='password'>
                            <div className='head'>
                                <i className='icon'>
                                    <BsShieldLockFill/>
                                </i>
                                <div className='text'>Change account password</div>
                            </div>
                            <div className='smallNote'>
                                Want to use a different password or lock someone else out of your account?
                            </div>
                            <form method='post' action='' className='formWrap' onSubmit={submitUserPass}>

                                <TextInput value={oldPassword} label={<IoKey/>} name='oldPassword' handleChange={e => setOldPassword(e.target.value)} type='password' placeHolder='Old password'
                                           topLabel='Your Old Password' required/>
                                <TextInput value={newPassword} label={<IoKey/>} name='newPassword' handleChange={e => setNewPassword(e.target.value)} type='password' placeHolder='New password'
                                           topLabel='Your New Password' required/>
                                <TextInput value={cNewPassword} name='cNewPassword' handleChange={e => setCNewPassword(e.target.value)} label={<IoKey/>} type='password' placeHolder='New Password'
                                           topLabel='Confirm New Password' required/>
                                <button className='updateBtn' type='submit'>
                                    {
                                        loadingPass ? (<Spinner />) :'Update Password'
                                    }


                                </button>
                            </form>


                        </section>
                        <section className='twoFA'>
                            <div className='head'>
                                <i className='icon'>
                                    <BsLockFill/>
                                </i>
                                <div className='text'>2 factor authentication</div>
                            </div>
                            <div className='smallNote'>
                                2FA is automatically activated on your account for security reasons
                            </div>
                            <button className='twoFABtn'>
                                <div>
                                    How can i activate this
                                </div>
                                <RiArrowRightSLine/>

                            </button>
                        </section>
                        <section className='apiKey'>
                            <div className='apiKeyBox'>
                                <div className='apiKeyIcon'>
                                    <RiShieldKeyholeFill/>
                                </div>

                                <section className='apiKeyTitle'>
                                    API Keys <Badge variant="outline" colorScheme="green">
                                    Coming soon!
                                </Badge>
                                </section>

                                <section>
                                    API keys help you use truzact's infrastructure from within your own application.
                                </section>
                                <button className='soonBtn'>
                                    <TiCalendar/> COMING SOON
                                </button>
                            </div>
                        </section>
                    </div>
                    <div className='securityBottom'>
                        <div className='connectedDevice'>
                            <div className='head'>
                                KYC  &nbsp; <Badge colorScheme={ KYCStatus === 'pending' ? 'red' : 'green' }>{KYCStatus && KYCStatus}</Badge>
                            </div>
                            <div className='smallNote'>
                                This is a way for Truzact to validate and confirm your identity
                                <div>
                                    <small>Please provide your correct info below</small>
                                </div>
                            </div>


                            <form method='post' className='kycForm' onSubmit={userSetKyc}>
                                <TextInput topLabel='BVN' handleChange={e => setBVN(e.target.value)} value={BVN} type='number' label={<IoDocumentLock/>} placeHolder='BVN'
                                           required />
                                <TextInput handleChange={e => setDob(e.target.value)} topLabel='Date of birth' name='DateOfBirth' value={dob} type='date' label={<MdDateRange/>}
                                           placeHolder='Date of birth' required/>

                                <div className='radioWrap'>
                                    <div className='radioTopLabel'>
                                        Gender
                                    </div>

                                    <HStack {...group} onChange={e => setGender(e.target.value)}>
                                        {options.map((value) => {
                                            const radio = getRadioProps({ value })
                                            return (
                                                <RadioCard key={value} {...radio}>
                                                    {value}
                                                </RadioCard>
                                            )
                                        })}
                                    </HStack>
                                    </div>

                                <TextInput handleChange={e => setCountry(e.target.value)} topLabel='Country' type='text' value={country} name='country' label={<GiWorld/>}
                                           placeHolder='Country of origin' required/>
                                <TextInput handleChange={e => setVerificationId(e.target.value)} topLabel='Verification id' name='verificationId' value={verificationId} type='text' label={<FaIdCardAlt/>}
                                           placeHolder="e.g Driver's license" required/>
                                <TextInput handleChange={e => setMyState(e.target.value)} topLabel='State of origin/residence' value={myState} name='state' type='text' label={<IoDocumentLock/>}
                                           placeHolder="State" required/>
                                <TextInput handleChange={e => setStreetAddress(e.target.value)} topLabel='Street address' value={streetAddress} name='streetAddress' type='text' label={<GiWorld/>}
                                           placeHolder="Street address" required/>
                                <TextInput handleChange={e => setRelationShipStatus(e.target.value)} topLabel='Relationship status' value={relationShipStatus} name='relationShipStatus' type='text' label={<BsFillPeopleFill/>}
                                           placeHolder="relationship status" required/>
                                <TextInput handleChange={e => setNextOfKin(e.target.value)} topLabel='Next of kin' type='text' value={nextOfKin} name='nextOfKin' label={<FaChild/>}
                                           placeHolder="Next of kin" required/>
                                <button className='kycBtn' type='submit'>
                                    {
                                        loadingKYC ? (<Spinner />) : 'Update KYC'
                                    }
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
                <Footer/>
            </motion.div>

            <div className='mobDash'>
                <div className='mobileHeader'>
                    <section className='brandLogo'>
                        <img src={brandLogo} alt='brand logo'/>
                    </section>
                </div>

                <MobTop/>
                <motion.div exit="out" initial="out" animate="in" variants={mobPageTransition} className='mobContent'>

                    <div className='passwordUpdateContainer'>
                        <div className='topHeader'>
                            <div className='headIcon'>
                                <BsShieldLockFill/>
                            </div>
                            <div className='headerTextWrap'>
                                <div className='title'>
                                    Change account password
                                </div>
                                <div className='subNote'>
                                    Want to use a different password or lock someone else out of your account?
                                </div>
                            </div>
                        </div>
                        <form method='post' onSubmit={submitUserPass} encType='multipart/form-data'>
                            <TextInput label={<IoKey/>} value={oldPassword} handleChange={e => setOldPassword(e.target.value)} name='oldPass' type='password' placeHolder='Old password'
                                       topLabel='Your Old Password' required />
                            <TextInput label={<IoKey/>} type='password' value={newPassword} handleChange={e => setNewPassword(e.target.value)} name='newPass' placeHolder='New password'
                                       topLabel='Your New Password' required/>
                            <TextInput label={<IoKey/>} type='password' mame='newPass' value={cNewPassword} handleChange={e => setCNewPassword(e.target.value)} placeHolder='New Password'
                                       topLabel='Confirm New Password' required/>
                            <button className='updateBtn' type='submit' disabled={loadingPass}>
                                {
                                    loadingPass ? (<Spinner />) :'Update Password'
                                }


                            </button>

                        </form>
                    </div>


                    <div className='securityBottom'>
                        <div className='connectedDevice'>
                            <div className='head'>
                                KYC  &nbsp; <Badge colorScheme={ KYCStatus === 'pending' ? 'red' : 'green' }>{KYCStatus && KYCStatus}</Badge>
                            </div>
                            <div className='smallNote'>
                                This is a way for Truzact to validate and confirm your identity
                                <div>
                                    <small>Please provide your BVN below</small>
                                </div>
                            </div>


                            <form method='post' className='kycForm' onSubmit={userSetKyc} encType='multipart/form-data'>
                                <TextInput topLabel='BVN' handleChange={e => setBVN(e.target.value)} name='BVN' value={BVN} type='number' label={<IoDocumentLock/>} placeHolder='BVN'
                                           required/>
                                <TextInput handleChange={e => setDob(e.target.value)} topLabel='Date of birth' name='DOB' value={dob} type='date' label={<MdDateRange/>}
                                           placeHolder='Date of birth' required/>
                                <div className='radioWrap'>
                                    <div className='radioTopLabel'>
                                        Gender
                                    </div>

                                    <HStack {...group} onChange={e => setGender(e.target.value)}>
                                        {options.map((value) => {
                                            const radio = getRadioProps({ value })
                                            return (
                                                <RadioCard key={value} {...radio}>
                                                    {value}
                                                </RadioCard>
                                            )
                                        })}
                                    </HStack>
                                </div>
                                <TextInput handleChange={e => setCountry(e.target.value)} topLabel='Country' type='text' value={country} name='countryOfResidence' label={<GiWorld/>}
                                           placeHolder='Country of origin' required/>
                                <TextInput handleChange={e => setVerificationId(e.target.value)} topLabel='Verification id' name='verification' value={verificationId} type='text' label={<FaIdCardAlt/>}
                                           placeHolder="e.g Driver's license" required/>
                                <TextInput handleChange={e => setMyState(e.target.value)} topLabel='State of origin/residence' value={myState} name='stateOfOrigin' type='text' label={<IoDocumentLock/>}
                                           placeHolder="State" required/>
                                <TextInput handleChange={e => setStreetAddress(e.target.value)} topLabel='Street address' value={streetAddress} name='street' type='text' label={<GiWorld/>}
                                           placeHolder="Street address" required/>
                                <TextInput handleChange={e => setRelationShipStatus(e.target.value)} topLabel='Relationship status' value={relationShipStatus} name='maritalStatus' type='text' label={<BsFillPeopleFill/>}
                                           placeHolder="relationship status" required/>
                                <TextInput handleChange={e => setNextOfKin(e.target.value)} topLabel='Next of kin' type='text' value={nextOfKin} name='nextKin' label={<FaChild/>}
                                           placeHolder="Next of kin" required/>

                                <button className='kycBtn' type='submit'>
                                    {
                                        loadingKYC ? (<Spinner />) : 'Update KYC'
                                    }
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className='twoFAContainer'>
                        <div className='topHeader'>
                            <div className='headIcon'>
                                <BsShieldLockFill/>
                            </div>
                            <div className='headerTextWrap'>
                                <div className='title'>
                                    2 factor authentication
                                </div>
                                <div className='subNote'>
                                    2FA is automatically activated on your account for security reasons
                                </div>
                            </div>
                        </div>
                        <div className='twoFABtnWrap'>
                            <button className='twoFABtn'>
                                <div>
                                    How can i deactivate this
                                </div>
                                <RiArrowRightSLine/>

                            </button>
                        </div>

                    </div>


                    <div className='apiKeyContainer'>
                        <div className='apiKeyIcon'>
                            <RiShieldKeyholeFill/>
                        </div>

                        <section className='apiKeyTitle'>
                            API Keys <Badge variant="outline" colorScheme="blue">
                            Coming soon!
                        </Badge>
                        </section>

                        <section>
                            API keys help you use truzact's infrastructure from within your own application.
                        </section>
                        <button className='soonBtn'>
                            <TiCalendar/> COMING SOON
                        </button>
                    </div>
                </motion.div>
            </div>
            <MobileNav/>
        </div>
    );
};

Security.propTypes = {
    data: PropTypes.object.isRequired,
    setKyc: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})
const mapActionsToProps = {
    setKyc,
    updatePassword
}


export default connect(mapStateToProps, mapActionsToProps)(Security);
