import React, {useState} from 'react';
import './DashboardStyle.scss'
import Notification from "../../components/Notification";
import refAI from "../../assets/ai/wfh_7.svg"
import '../../Style/Responsive/Responsive.Dashbaord.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faPiggyBank,
    faChartLine,
    faExchangeAlt,
    faMoneyBillWave, faCopy, faPlusCircle,
} from '@fortawesome/free-solid-svg-icons'
import Portfolio from "../../components/Portfolio";
import Cryptos from "../../Data/Porfolio";
import Footer from "../../components/Footer";
import PriceHistory from "../../components/PriceHistory";
import brandLogo from "../../assets/img/Truzact logo white horinzontal.png";
import Button from "../../components/Button";
import {GiTakeMyMoney, GiPiggyBank} from 'react-icons/gi';
import {CgCreditCard} from 'react-icons/cg';
import {IoIosCopy} from 'react-icons/io';
import MobTop from "../../components/MobTop";
import Menu from "../../components/Menu";
import MobileNav from "../../components/MobNav";
import {motion} from "framer-motion"
import NumberFormat from "react-number-format";
import {useClipboard, useToast} from "@chakra-ui/react"


//redux
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from "react-router-dom";
import {FaBitcoin, FaPiggyBank} from "react-icons/all";



const pageAnimation = {
    type: "spring",
}


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
const Dashboard = (props) => {
    const toast = useToast()

    const [modalOpen, setModalOpen] = useState(false)


    //user info
    const {userData, loading} = props.user

    const {member: {BTC, USDT, Ethereum, Dash, BNB, Ripple, Tron, Aave, BitcoinCash ,ReferralID,BankAccountNumber}} = props.user.userData
    let money = USDT;
    const CryptoTotal =  Ethereum + Dash + BNB + Ripple + Tron + Aave + BitcoinCash + BTC
    referalId = ReferralID



    const tempDate = new Date();
    const date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();

    const {hasCopied, onCopy} = useClipboard(referalId)


//page Transition

    const modalToggle = () => {

        setModalOpen(!modalOpen)
    }


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

    return (

        <div className="App">


            <Menu/>

            <motion.div exit="out" initial="out" animate="in" variants={pageTransition} className="dashboard">
                {/*
      Desktop version
      */}
                <Notification/>

                <div className='cardHead'>
                    <div className='balanceHead'>
                        <div className='titleWrap'>
                            <div className='title'>
                                Total Balance
                            </div>
                            <div className='icon'>
                                <FontAwesomeIcon icon={faPiggyBank}/>
                            </div>

                        </div>
                        {/* <div className='date'>
                            {
                                date
                            }

                        </div>*/}
                    </div>

                    <div className='priceHead'>
                        <div className='titleWrap'>
                            <div className='title'>
                                Price History
                            </div>
                            <div className='icon'>
                                <FontAwesomeIcon icon={faChartLine}/>
                            </div>

                        </div>
                    </div>
                    <div className='refHead'>
                        <div className='titleWrap'>
                            <div className='title'>
                                Referrals
                            </div>
                            <div className='icon'>
                                <FontAwesomeIcon icon={faExchangeAlt}/>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='cardHolder'>
                    <div className='balance'>
<section className='moneyWrap'>

                                    <div className='money'>
                                        {
                                            money < 1 ? (

                                            <NumberFormat value={money} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <div className='amountSmall'>{value}</div>} />

                                           )
                                                :
                                                (
                                                    <NumberFormat value={money} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <div className='amountBalance'>{value}</div>} />

                                      )
                                        }


                                        &nbsp;



                                    </div>

                                    <small>
                                        Your Balance (<small>in USDT</small>)
                                    </small>
                                </section>

                        <section className='btnLayer'>
                            <NavLink to='/deposit'>
                                <Button/>
                            </NavLink>
                        </section>

                        <div className='bottomBtn'>
                            <NavLink to='/buysell'>
                                <button className='sellBuyBtn'>
                                    <FontAwesomeIcon icon={faMoneyBillWave}/> Buy/Sell
                                </button>
                            </NavLink>
                            <NavLink to='/savings'>
                                <button>
                                    <FontAwesomeIcon icon={faPiggyBank}/> Save
                                </button>
                            </NavLink>
                        </div>

                    </div>
                    <PriceHistory/>


                    <div className='referral'>
                        <div className='title'>
                            <span className='titleBack'>Earn Passive </span> &nbsp;<span> Income on Truzact</span>
                        </div>
                        <div className='refContent'>
                            Refer your friends and earn 0.5% on
                            all their transactions when they sign
                            up using your referral code. Click button below to copy your referral code.

                        </div>

                        <hr className='crossLine'/>


                        <div className='bottomWrap'>

                            <div className='illustration'>
                                <img src={refAI} alt=''/>
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
                </div>

                <div className='otherCard'>
                    <div className='addBank'>
                        <div className='title'>

                            {
                                !BankAccountNumber ?
                                    <span><span className='titleBack'>Add Bank</span> &nbsp;<span> Account</span></span>
                                    :     <span><span className='titleBack'>Withdraw</span> &nbsp;<span> Cash</span></span>
                            }
                        </div>
                        <div className='content'>
                            Bank accounts are where we'll deposit
                            your funds when you withdraw, you
                            can add up to 5 bank accounts to your
                            truzact account
                        </div>
                        <div className='btnWrap'>
                            {
                                BankAccountNumber ? (<button className='addBtn'>
                                    <GiTakeMyMoney/> <span>Withdraw</span>
                                </button>) :
                                    <Link to='/addbank'>
                                        <button className='addBtn'>
                                            <FontAwesomeIcon icon={faPlusCircle}/> <span>Add bank</span>
                                        </button>
                                    </Link>


                            }

                        </div>

                    </div>


                    <div className='portfolio'>
                        <div className='title'>
                            Your portfolio
                        </div>
                        <div className='portfolioContent'>
                            {
                                Cryptos.map((({name, amount, cryptoIcon}, index) => (
                                    <Portfolio key={index} name={name} amount={amount} cryptoIcon={cryptoIcon}/>
                                )))
                            }


                        </div>
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
                <MobTop/>
                <motion.div exit="out" initial="out" animate="in" variants={mobPageTransition} className='mobContent'>


                    {/*     <div className='balanceCardWrap'>
                        <div className='balanceBack'>

                        </div>
                     <svg width="320" height="213" viewBox="0 0 320 213" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path id="Rectangle 22"
                                  d="M23.0746 25.9316C25.856 11.1969 38.7991 0.575038 53.7933 0.722015L289.351 3.03102C306.326 3.19742 320
          17.0058 320 33.9819V181.874C320 200.561 303.566 214.987 285.037 212.565L27.4801 178.905C9.84709 176.601
          -2.22262 159.947 1.07591 142.473L23.0746 25.9316Z"
                                  fill="#00068A"/>
                        </svg>


                        <div className='balanceCard'>
                            <div className='amount'>
                                {Object.keys(userData).length > 0 &&
                                money < 1 ?

                                    (<section className='moneyWrap'>

                                        <div className='money'>
                                            <span className='currency'>₦</span>
                                            <span className='amountSmall'>{money}</span>
                                            <span>.00</span>
                                            &nbsp;
                                            <span>
                                        <FontAwesomeIcon icon={faCaretDown} color={'red'}/></span>


                                        </div>

                                        <small>
                                            Your earnings
                                        </small>
                                    </section>) :


                                    (<section className='moneyBigWrap'>

                                        <div className='moneyBig'>
                                            <span className='currency'>₦</span>
                                            <span className='amountBig'>{money}</span>
                                            <span>.00</span>
                                            &nbsp;

                                            <span> <FontAwesomeIcon icon={faCaretUp} color={'green'}/></span>

                                        </div>

                                        <small>
                                            Your earnings
                                        </small>


                                    </section>)
                                }

                            </div>

                            <div className='btnCont'>
                                <NavLink to='/deposit'>
                                    <button className='depositBtn'>

                                        <section className='icon'>
                                            <FontAwesomeIcon icon={faArrowUp}/>
                                        </section>
                                        <section className='text'>
                                            Deposit
                                        </section>
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    */}

                    <div className='mobileBalCard'>
                        <div className='balCardBackOne'>

                        </div>
                        <div className='balCardBackTwo'>

                        </div>
                        <Link to='/deposit' className='balCardBackMain'>

                            <div>
                                <small> Your account Balance</small>
                            </div>
                            <div className='balance'>
                                {
                                    money < 1 ? (

                                            <NumberFormat value={money} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <div className='amountSmall'>{value}</div>} />

                                        )
                                        :
                                        (
                                            <NumberFormat value={money} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <div className='amountBalance'>{value}</div>} />

                                        )
                                }

                               {/* <NumberFormat value={money} displayType={'text'} thousandSeparator={true} prefix={'USDT'}/>*/}

                            </div>

                            <small className='smallInfo'>Click here to add cash</small>


                        </Link>
                    </div>

                    <div className='quickBox'>


                            <div className='cryptoQuickBox'>
                                <Link to='/wallets'>
                                <div className='ico'>
                                    <FaBitcoin/>
                                </div>
                                <div className='details'>
                                    <div className='title'>
                                        Crypto
                                    </div>
                                    <div className='number'>
                                        ₦ {CryptoTotal}
                                    </div>
                                </div>
                                </Link>
                            </div>



                        <div className='saveQuickBox'>
                            <Link to='/save'>
                            <div className='ico'>
<FaPiggyBank/>
                            </div>
                            <div className='details'>
                                <div className='title'>
                                    Savings
                                </div>
                                <div className='number'>
                                    ₦0
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                    <div className='buttonsWrap'>

                        <button>
                            <div className='icon withdraw'>
                                <GiTakeMyMoney/>
                            </div>
                            <div className='title'>
                                Withdraw
                            </div>
                        </button>

                        <NavLink to='/buysell'>
                            <button>
                                <div className='icon buySell'>
                                    <CgCreditCard/>
                                </div>
                                <div className='title'>
                                    Buy/Sell
                                </div>
                            </button>
                        </NavLink>

                        <NavLink to='/savings'>
                            <button>
                                <div className='icon save'>
                                    <GiPiggyBank/>
                                </div>
                                <div className='title'>
                                    Save
                                </div>
                            </button>
                        </NavLink>


                        <button onClick={copyLink}>
                            <div className='icon ref'>
                                <IoIosCopy/>
                            </div>
                            <div className='title'>
                                Referral
                            </div>
                        </button>

                    </div>

                    <PriceHistory/>


                    <div className='referral'>
                        <div className='title'>
                            <span className='titleBack'>Earn Passive </span> &nbsp;<span> Income on Truzact</span>
                        </div>
                        <div className='refContent'>
                            Refer your friends and earn 0.5% on
                            all their transactions when they sign
                            up using your referral code. Click button below to copy your referral code.
                        </div>

                        <button className='actionBtn' onClick={copyLink}>
                            {
                                hasCopied ? ('Copied') : (<FontAwesomeIcon icon={faCopy}/>)
                            }

                        </button>

                    </div>

                    <div className='addBank'>
                        <div className='title'>
                            <span className='titleBack'>Add Bank</span> &nbsp;<span> Account</span>
                        </div>
                        <div className='content'>
                            Bank accounts are where we'll deposit
                            your funds when you withdraw, you
                            can add up to 5 bank accounts to your
                            truzact account
                        </div>

                        {
                            BankAccountNumber ? (   <button className='addBtn'>
                                <GiTakeMyMoney/> <span>Withdraw</span>
                            </button> ) : (    <Link to='/addbank' className='addBtn'>
                                <FontAwesomeIcon icon={faPlusCircle}/> <span>Add bank account</span>
                            </Link>)
                        }




                    </div>

                    <div className='portfolio'>
                        <div className='title'>
                            Your portfolio
                        </div>
                        <div className='portfolioContent'>
                            {
                                Cryptos.map((({name, amount, cryptoIcon}, index) => (
                                    <Portfolio key={index} name={name} amount={amount} cryptoIcon={cryptoIcon}/>
                                )))
                            }


                        </div>
                    </div>

                </motion.div>

            </div>

            <MobileNav/>
        </div>

    );
};


Dashboard.prototype = {
    data: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})


export default connect(mapStateToProps)(Dashboard);
