import React from 'react';
import './Wallets.scss';
import '../../Style/Responsive/Responsive.Wallets.scss'
import Notification from "../../components/Notification";
import Footer from "../../components/Footer";
import {BiSend} from 'react-icons/bi';
import {GiReceiveMoney} from 'react-icons/gi'
import Cryptos from "../../Data/Porfolio";
import brandLogo from "../../assets/img/Truzact logo white horinzontal.png";
import MobTop from "../../components/MobTop";
import MobileNav from "../../components/MobNav";
import Menu from "../../components/Menu";

//redux
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from "react-router-dom";
import {FaBitcoin, FaPiggyBank} from "react-icons/all";
import NumberFormat from "react-number-format";
import { motion } from "framer-motion"


const mobPageTransition = {

    in:{
        opacity:1,
        x:0,
    },
    out:{
        opacity:0,
        x:"10vw",
    }
}

const pageTransition = {

    in:{
        opacity:1,
        y:0
    },
    out:{
        opacity:0,
        y:"-10vh",
    }
}

const Wallets = (props) => {


    const {userData, loading} = props.user

    const {member: {BTC, USDT, Ethereum, Dash, BNB, Ripple, Tron, Aave, BitcoinCash , ReferralID}} = props.user.userData

    let money = USDT;

    return (

        <div className="App">
<Menu/>
            <motion.div exit="out" initial="out" animate="in" variants={pageTransition} className='wallets'>
                <Notification/>
                <div className='walletsWrap'>
                   {/* <div className='walletsBanner'>
                        <div className='banner'>

                        </div>
                    </div>*/}

                    <div className='walletsContainer'>

                                <div className='box'>
                                    <div className='boxHead'>
                                        <div className='coinImage'>
<img src={'https://app.roqqu.com/static/media/btc.d9c1768c.png'} alt='Bitcoin'/>
                                        </div>
                                        <div className='coinName'>
                                            Bitcoin
                                        </div>
                                    </div>
                                    <div className='boxDetails'>
                                        <div className='balance'>

                                            <div>
                                                Balance
                                            </div>
                                            <div>
                                                {BTC} BTC
                                            </div>
                                        </div>
                                        <div className='received'>

                                            <div>
                                                Total received
                                            </div>
                                            <div>
                                                0 BTC
                                            </div>
                                        </div>
                                        <div className='bottomBtn'>
                                            <button>
                                                Buy <BiSend/>
                                            </button>

                                            <button>
                                                Sell <GiReceiveMoney/>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className='box'>
                                    <div className='boxHead'>
                                        <div className='coinImage'>
<img src={'https://app.roqqu.com/static/media/eth.73579dcc.png'} alt='Ethereum'/>
                                        </div>
                                        <div className='coinName'>
                                            Ethereum
                                        </div>
                                    </div>
                                    <div className='boxDetails'>
                                        <div className='balance'>

                                            <div>
                                                Balance
                                            </div>
                                            <div>
                                                {Ethereum} ETH
                                            </div>
                                        </div>
                                        <div className='received'>

                                            <div>
                                                Total received
                                            </div>
                                            <div>
                                                0 BTC
                                            </div>
                                        </div>
                                        <div className='bottomBtn'>
                                            <button>
                                                Buy <BiSend/>
                                            </button>

                                            <button>
                                                Sell <GiReceiveMoney/>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className='box'>
                                    <div className='boxHead'>
                                        <div className='coinImage'>
<img src={'https://app.roqqu.com/static/media/steem.543d2664.png'} alt='Ethereum'/>
                                        </div>
                                        <div className='coinName'>
                                            Dash
                                        </div>
                                    </div>
                                    <div className='boxDetails'>
                                        <div className='balance'>

                                            <div>
                                                Balance
                                            </div>
                                            <div>
                                                {Dash} Dash
                                            </div>
                                        </div>
                                        <div className='received'>

                                            <div>
                                                Total received
                                            </div>
                                            <div>
                                                0 BTC
                                            </div>
                                        </div>
                                        <div className='bottomBtn'>
                                            <button>
                                                Buy <BiSend/>
                                            </button>

                                            <button>
                                                Sell <GiReceiveMoney/>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className='box'>
                                    <div className='boxHead'>
                                        <div className='coinImage'>
<img src={'https://app.roqqu.com/static/media/bnb.ca6e0b5b.png'} alt='Ethereum'/>
                                        </div>
                                        <div className='coinName'>
                                            BNB
                                        </div>
                                    </div>
                                    <div className='boxDetails'>
                                        <div className='balance'>

                                            <div>
                                                Balance
                                            </div>
                                            <div>
                                                {BNB} BNB
                                            </div>
                                        </div>
                                        <div className='received'>

                                            <div>
                                                Total received
                                            </div>
                                            <div>
                                                0 BTC
                                            </div>
                                        </div>
                                        <div className='bottomBtn'>
                                            <button>
                                                Buy <BiSend/>
                                            </button>

                                            <button>
                                                Sell <GiReceiveMoney/>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className='box'>
                                    <div className='boxHead'>
                                        <div className='coinImage'>
<img src={'https://app.roqqu.com/static/media/xrp.6684b41b.png'} alt='Ethereum'/>
                                        </div>
                                        <div className='coinName'>
                                            Ripple
                                        </div>
                                    </div>
                                    <div className='boxDetails'>
                                        <div className='balance'>

                                            <div>
                                                Balance
                                            </div>
                                            <div>
                                                {Ripple} Ripple
                                            </div>
                                        </div>
                                        <div className='received'>

                                            <div>
                                                Total received
                                            </div>
                                            <div>
                                                0 BTC
                                            </div>
                                        </div>
                                        <div className='bottomBtn'>
                                            <button>
                                                Buy <BiSend/>
                                            </button>

                                            <button>
                                                Sell <GiReceiveMoney/>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className='box'>
                                    <div className='boxHead'>
                                        <div className='coinImage'>
<img src={'https://app.roqqu.com/static/media/trx.457af50e.png'} alt='Ethereum'/>
                                        </div>
                                        <div className='coinName'>
                                            Tron
                                        </div>
                                    </div>
                                    <div className='boxDetails'>
                                        <div className='balance'>

                                            <div>
                                                Balance
                                            </div>
                                            <div>
                                                {Tron} Tron
                                            </div>
                                        </div>
                                        <div className='received'>

                                            <div>
                                                Total received
                                            </div>
                                            <div>
                                                0 BTC
                                            </div>
                                        </div>
                                        <div className='bottomBtn'>
                                            <button>
                                                Buy <BiSend/>
                                            </button>

                                            <button>
                                                Sell <GiReceiveMoney/>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className='box'>
                                    <div className='boxHead'>
                                        <div className='coinImage'>
<img src={'https://app.roqqu.com/static/media/usdt.bb4ee7f0.png'} alt='Ethereum'/>
                                        </div>
                                        <div className='coinName'>
                                            Aave
                                        </div>
                                    </div>
                                    <div className='boxDetails'>
                                        <div className='balance'>

                                            <div>
                                                Balance
                                            </div>
                                            <div>
                                                {Aave} Aave
                                            </div>
                                        </div>
                                        <div className='received'>

                                            <div>
                                                Total received
                                            </div>
                                            <div>
                                                0 BTC
                                            </div>
                                        </div>
                                        <div className='bottomBtn'>
                                            <button>
                                                Buy <BiSend/>
                                            </button>

                                            <button>
                                                Sell <GiReceiveMoney/>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className='box'>
                                    <div className='boxHead'>
                                        <div className='coinImage'>
<img src={'https://app.roqqu.com/static/media/btc.d9c1768c.png'} alt='Ethereum'/>
                                        </div>
                                        <div className='coinName'>
                                            BitcoinCash
                                        </div>
                                    </div>
                                    <div className='boxDetails'>
                                        <div className='balance'>

                                            <div>
                                                Balance
                                            </div>
                                            <div>
                                                {BitcoinCash} BTC Cash
                                            </div>
                                        </div>
                                        <div className='received'>

                                            <div>
                                                Total received
                                            </div>
                                            <div>
                                                0 BTC
                                            </div>
                                        </div>
                                        <div className='bottomBtn'>
                                            <button>
                                                Buy <BiSend/>
                                            </button>

                                            <button>
                                                Sell <GiReceiveMoney/>
                                            </button>
                                        </div>
                                    </div>

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

                <motion.div exit="out" initial="out" animate="in"  variants={mobPageTransition} className='mobContent'>
                    <div className='walletsTop'>
                        <div className='topTitle'>
                            Wallet Addresses
                        </div>
                        <div className='smallTitle'>
                            Wallets allow you to organize your funds into categories,
                            like spending or savings.
                        </div>
                    </div>
                    <div className='walletsWrap'>
                        {
                            Cryptos.map((({balance, name, cryptoIcon, totalReceived}) => (
                                <div className='walletsBox'>
                                    <div className='cryptoIcon'>
<img alt='crypto icon' src={cryptoIcon}/>
                                    </div>
                                    <div className='iconName'>
                                        {
                                            name
                                        }
                                    </div>

                                    <div className='walletStats'>
                                        <div>
                                            <small>
                                                Balance
                                            </small>
                                            <div>
                                                {balance}
                                            </div>
                                        </div>
                                        <div>
                                            <small>
                                                Total Received
                                            </small>
                                            <div>
                                                {totalReceived}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )))
                        }


                    </div>


                </motion.div>

            </div>
            <MobileNav/>
        </div>
    );
};
Wallets.prototype = {
    data: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})


export default connect(mapStateToProps) (Wallets);
