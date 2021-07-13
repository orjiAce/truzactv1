import React, {useCallback, useState, useEffect} from 'react';
import './AddBank.scss'
import '../../Style/Responsive/Responsive.AddBank.scss'
import Menu from "../../components/Menu";
import {motion} from "framer-motion";
import Notification from "../../components/Notification";
import Footer from "../../components/Footer";
import brandLogo from "../../assets/img/Truzact logo white horinzontal.png";
import MobTop from "../../components/MobTop";
import MobileNav from "../../components/MobNav";
import TextInput from "../../components/TextInput";
import {FaPaperPlane, FaPlus, FaShoppingBasket} from "react-icons/fa";
import PropTypes from "prop-types";
import {addBankFunc} from "../../redux/actions/dataActions";
import {connect} from 'react-redux'
import axios from "redaxios";

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
const AddBank = (props) => {

    const {userData: {member: {BankAccountName, BankAccountNumber, BankName}}} = props.user
    const {loadingData} = props.data
    const {addBankFunc} = props

    const [allBanks, setAcceptedBanks] = useState([])

    const [bankName, setBankName] = useState(BankName ? BankName : '')
    const [accountNumber, setAccountNumber] = useState(BankAccountNumber ? BankAccountName : '');
    const [accountName, setAccountName] = useState(BankAccountName ? BankAccountName : '')
    const [BVN, setBVN] = useState('')
    const [bankCode, setBankCode] = useState('')





    const getMyBanks = useCallback(() =>{
        axios.get('/bankcodes.php', ).then((res) =>{

            setAcceptedBanks(res.data.data)
          //  console.log(res.data)
        }).catch((err) =>{
            console.log(err)
        })

    },[])

    useEffect(() =>{
  getMyBanks()

    },[getMyBanks])

    useEffect(() =>{
        if(Object.keys(allBanks).length > 0) {
          //  const mySlug = allBanks.filter(banks => banks.name === bankName)

            const theSlug = allBanks.find(banks => banks.name === bankName)
            const {code} = theSlug;
            setBankCode(code)
            console.log(code)
        }
    },[bankName])



    const addBankDetails = useCallback(() =>{
        const bankDetails = new FormData()
        bankDetails.append('BankName', bankName)
        bankDetails.append('BankCode', bankCode)
        bankDetails.append('BankAccountNumber', accountNumber)
        bankDetails.append('BankAccountName', accountName)

    },[bankName,bankCode,accountName,accountNumber])
        return (

            <div className="App">
                <Menu/>
                <motion.div exit="out" initial="out" animate="in" variants={pageTransition} className="addBank">
                    {/*
      Desktop version
      */}
                    <Notification/>
                    <div className='addBankContainer'>
                        <div className='addBankTab'>
                            <div className='cont'>



                                <form className='addBankFormWrap' onSubmit={addBankDetails}>

                                    <div className='title'>
                                  Add your personal bank account details
                                    </div>

                                    <div className='inputWrap'>
                                        <div className='topLabel'>
                                            Bank name
                                        </div>
                                        <div className='group'>
                                            {/*    <img src={flag} width='30' height='30'/>*/}
                                            <select name='bankName' className='textInput' onChange={e => setBankName(e.target.value)} required>


                                                {

                                                    Object.keys(allBanks).length > 0 ? allBanks.map((({name, flag}, index) =>(
                                                        <option key={index} value={name}  name={flag}>{name}</option>
                                                    ))) : 'loading'
                                                }

                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <TextInput type='number' value={accountNumber} topLabel='Your 10 digits Bank Account number'
                                                    name={'accountNumber'} placeHolder='Account number'
                                                   handleChange={e => setAccountNumber(e.target.value)} required/>
                                    </div>

                                    <div>
                                        <TextInput type='text' value={accountName} topLabel='Your Bank Account name'
                                                   name={'accountName'} placeHolder='Account name'
                                                   handleChange={e => setAccountName(e.target.value)} required/>
                                    </div>

                                    <div>
                                        <TextInput type='number' value={BVN} topLabel='Your Bank Verification number'
                                                   name={'bvn'} placeHolder='BVN'
                                                   handleChange={e => setBVN(e.target.value)} />
                                    </div>

                                    <button className='addBankDetailBtn' type='submit'>
                                        {
                                            loadingData ? 'loading...' : ( <><FaPaperPlane/> Submit </>)
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

                        <div className='addBankWrap'>

                            <form className='addBankFormWrap' onSubmit={addBankDetails}>

                                <div className='title'>
                                    Add your personal bank account details
                                </div>

                                <div className='inputWrap'>
                                    <div className='topLabel'>
                                        Bank name
                                    </div>
                                    <div className='group'>
                                        {/*    <img src={flag} width='30' height='30'/>*/}
                                        <select name='bankName' className='textInput' onChange={e => setBankName(e.target.value)} required>


                                            {

                                                Object.keys(allBanks).length > 0 ? allBanks.map((({name, flag}, index) =>(
                                                    <option key={index} value={name}  name='BankName'>{name}</option>
                                                ))) : <option  value=''>Loading...</option>
                                            }



                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <TextInput type='number' value={accountNumber} topLabel='Your 10 digits Bank Account number'
                                               name={'accountNumber'} placeHolder='Account number'
                                               handleChange={e => setAccountNumber(e.target.value)} required/>
                                </div>

                                <div>
                                    <TextInput type='text' value={accountName} topLabel='Your Bank Account name'
                                               name={'accountName'} placeHolder='Account name'
                                               handleChange={e => setAccountName(e.target.value)} required/>
                                </div>

                                <div>
                                    <TextInput type='number' value={BVN} topLabel='Your Bank Verification number'
                                               name={'bvn'} placeHolder='BVN'
                                               handleChange={e => setBVN(e.target.value)} />
                                </div>

                                <button className='addBankDetailBtn' type='submit'>
                                    {
                                        loadingData ? 'loading...' : ( <><FaPaperPlane/> Submit </>)
                                    }
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
                <MobileNav/>
        </div>
    );
};

AddBank.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    addBankFunc: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})
const mapActionsToProps = {
    addBankFunc,
}


export default connect(mapStateToProps,mapActionsToProps) (AddBank);
