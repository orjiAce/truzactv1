import React, {useState, createRef, useEffect} from 'react';
import './DepositStyles.scss'
import '../../Style/DepositInvoice.scss'
import Menu from "../../components/Menu";
import {motion} from "framer-motion";
import Notification from "../../components/Notification";
import Footer from "../../components/Footer";
import brandLogo from "../../assets/img/Truzact logo white horinzontal.png";
import MobTop from "../../components/MobTop";
import '../../Style/Responsive/Responsive.Deposit.scss';
import TextInput from "../../components/TextInput";
import {useToast} from "@chakra-ui/toast";
import {FaCamera, FaInfoCircle, FaMoneyBill} from "react-icons/fa";
import MobileNav from "../../components/MobNav";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {depositFund} from "../../redux/actions/dataActions";
import {useScreenshot, createFileName} from 'use-react-screenshot'

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


const DepositPage = (props) => {
    const toast = useToast();

    const [depositSlip, setShowDepositSlip] = useState(false)
    const [amount, setAmount] = useState('')
    const [total, setTotal] = useState(0)
    const [modalState, setModalState] = useState(false)


    const showNumbers = () => {
        let processingFeeInPercent = 2;
        const percentageAmount = (processingFeeInPercent / 100) * amount
        const amountToDeposit = percentageAmount + amount
        setTotal(+amountToDeposit);
    }

    const {member: {MonnifyAccountNumber, KYCStatus}} = props.user.userData


    const ref = createRef(null);
    const [image, takeScreenShot] = useScreenshot();

    const download = (image, {name = "img", extension = "png"} = {}) => {
        const a = document.createElement("a");
        a.href = image;
        a.download = createFileName(extension, name);
        a.click();
    };

    const getImage = () => takeScreenShot(ref.current);

    useEffect(() => {
        if (image) {
            download(image, {name: "deposit-truzact", extension: "png"});
        }
    }, [image, getImage]);


    const validateAmount = event => {
        if (amount.length < 1) {
            toast({
                title: "Error",
                description: 'please add amount',
                position: "top",
                status: "info",
                duration: 5000,
                isClosable: true,
            })
        } else if (amount < 500) {

            toast({
                title: "Notice",
                description: 'Minimum amount is N500',
                position: "top",
                status: "info",
                duration: 4000,
                isClosable: true,
            })

        } else {
            let processingFeeInPercent = 2;
            const percentageAmount = (processingFeeInPercent / 100) * +amount
            const amountToDeposit = percentageAmount + +amount
            setTotal(amountToDeposit);

            setShowDepositSlip(true)
        }

    }
    return (
        <div className="App">
            <Menu/>
            <motion.div exit="out" initial="out" animate="in" variants={pageTransition} className="deposit">
                {/*
      Desktop version
      */}
                <Notification/>
                <div className='depositContainer'>

                    {
                        !depositSlip ?
                            <div className='depositWrap'>

                                <section className='titleCont'>
    <span>
        Enter Amount
    </span>
                                    <span>How much do you want to deposit ?
    </span>
                                </section>

                                <section className='formWrap'>
                                    <TextInput placeHolder='Enter deposit amount' type='number' label={<FaMoneyBill/>}
                                               name='amount' value={amount}

                                               handleChange={e => setAmount(e.target.value)}/>
                                </section>

                                <section className='calculatedAmount'>
                                    <span>Total:</span> {total}
                                </section>

                                <section className='notes'>
      <span>
    A 2% deposit processing fee is automatically calculated
   </span>
                                    <span>
                                Maximum is 1,000,000 and minimum is 500
                            </span>
                                </section>

                                <button className='depositMoney' onClick={validateAmount}>

                                         Proceed  with deposit


                                </button>
                             {/*   <button className='depositMoney' onClick={validateAmount}
                                        disabled={KYCStatus === 'pending'}>
                                    {
                                        KYCStatus === 'pending' ? (
                                            <span> Please update KYC</span>) : ('Proceed  with deposit')
                                    }

                                </button>*/}
                            </div>
                            :
                            <div className='depositInvoice'>
                                <div className='invoiceTitle'>
                                    Bank Deposit
                                </div>
                                <div className='msg'>
                                    This is your unique Truzact Bank account, money sent to this account will be
                                    automatically funded to your wallet
                                </div>
                                <div className='bankDetails'>
                                    <section className='bankName'>
                                        PROVIDUS BANK
                                    </section>
                                    <section>
                                        <span>Bank Name:</span>
                                        <span> Providus Bank</span>
                                    </section>
                                    <section>
                                        <span>Bank account: </span> <span>{MonnifyAccountNumber}</span>
                                    </section>
                                    <section>
                                        <span>Account Name:</span> <span> Truzact-Joseph</span>
                                    </section>
                                </div>
                                <div className='instruction'>
                                    <FaInfoCircle/>
                                    <div className='text'>
                                        After making a transfer, kindly wait for a few minutes for your payment to be
                                        confirmed.
                                    </div>
                                </div>
                            </div>

                    }
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
                    {
                        !depositSlip ?
                            <div className='depositWrap'>
                                <section className='titleCont'>
                                    <div>
                                        Enter Amount
                                    </div>
                                    <div>How much do you want to deposit ?
                                    </div>
                                </section>

                                <section className='formWrap'>
                                    <TextInput placeHolder='Enter deposit amount' type='number' label={<FaMoneyBill/>}
                                               name='amount' value={amount}

                                               handleChange={e => setAmount(e.target.value)}/>
                                </section>

                                <section className='calculatedAmount'>
                                    <span>Total:</span> {total}
                                </section>

                                <section className='notes'>
                                    <div>
                                        A 2% deposit processing fee is automatically calculated
                                    </div>
                                    <div>
                                        Maximum is 1,000,000 and minimum is 500
                                    </div>
                                </section>

                                <button className='depositMoney' onClick={validateAmount}>

                                    Proceed  with deposit


                                </button>
                            </div>
                            :
                            <div className='mobDepositInvoice' ref={ref}>
                                <div className='invoiceTitle'>
                                    Bank Deposit
                                </div>
                                <div className='msg'>
                                    This is your unique Truzact Bank account, money sent to this account will be
                                    automatically funded to your wallet
                                </div>
                                <div className='bankDetails'>
                                    <section className='bankName'>
                                        PROVIDUS BANK
                                    </section>
                                    <section>
                                        <span>Bank Name:</span>
                                        <span> Providus Bank</span>
                                    </section>
                                    <section>
                                        <span>Bank account: </span> <span>{MonnifyAccountNumber}</span>
                                    </section>
                                    <section>
                                        <span>Account Name:</span> <span> Truzact-Joseph</span>
                                    </section>
                                </div>
                                <div className='instruction'>
                                    <FaInfoCircle/>
                                    <div className='text'>
                                        After making a transfer, kindly wait for a few minutes for your payment to be
                                        confirmed.
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        depositSlip &&
                        <button className='screenShotBtn' onClick={getImage}>
                            <FaCamera/> Take Screen shot
                        </button>
                    }
                </motion.div>
            </div>
            <MobileNav/>
        </div>
    );
};

DepositPage.prototype = {
    data: PropTypes.object.isRequired,
    depositFund: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})
const mapActionToProps = {
    depositFund
}


export default connect(mapStateToProps, mapActionToProps)(DepositPage);
