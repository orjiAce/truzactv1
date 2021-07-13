import * as React from 'react';
import Notification from "../../components/Notification";
import './Transactions.scss'
import Footer from "../../components/Footer";
import TextInput from "../../components/TextInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExchangeAlt, faSearch} from "@fortawesome/free-solid-svg-icons";
import Tabs from "../../components/Tab";
import TabPane from "../../components/Tab-Pane";
import '../../Style/Responsive/Responsive.Transactions.scss'
import TransactionFeed from "../../components/TransactionFeed";
import Button from "../../components/Button";
import depositAi from "../../assets/ai/7.svg";
import {useEffect} from "react";
import {gsap, Power3} from "gsap";
import brandLogo from "../../assets/img/Truzact logo white horinzontal.png";
import MobTop from "../../components/MobTop";
import Menu from "../../components/Menu";
import MobileNav from "../../components/MobNav";
import { motion } from "framer-motion"

//redux
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Spinner} from "@chakra-ui/react";
import {Link} from "react-router-dom";


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

const Transactions = (props) => {

    //user info
    const {userData:{member:{USDT}}, loading} = props.user
    let money = USDT;

    useEffect(() => {
        gsap.from('.depositBoard', {
            ease: Power3.easeOut,
            y: -25,
            opacity: 0,
            duration: 1
        })
    }, []);
    return (
        <div className="App">
            <Menu/>


            <motion.div exit="out" initial="out" animate="in" variants={pageTransition} className='transactions'>
                <Notification/>

                <div className='transactionsWrap'>


                    <section className='transactionsContainer'>
                        <form>

                            <TextInput placeHolder='Search..' type='search' customizeClass={'searchInput'}
                                       label={<FontAwesomeIcon icon={faSearch}/>}/>
                        </form>

                        <div className='tab-wrap'>
                            <Tabs>
                                <TabPane name="Buy/Sell" key="1">
                                    <div className='feedWrap'>
                                        <TransactionFeed type='buySell' address='3Q9LBTehKhMsFneFDJBJFhhHbJkUv97y5B'
                                                         tag='Buy/Sell' amount={'7,633.84'}
                                                         date={'24, Nov 2020'}
                                                         label={<FontAwesomeIcon icon={faExchangeAlt}/>}/>
                                    </div>


                                </TabPane>
                                <TabPane name='Deposit' key="2">
                                    <div className='feedWrap'>
                                        <TransactionFeed type='deposit' tag='Deposit'/>
                                    </div>
                                </TabPane>
                                <TabPane name="Withdrawal" key="3">
                                    <div className='feedWrap'>
                                        <TransactionFeed type='withdrawal' tag='Withdrawal'/>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </section>

                    <section className='depositBoard'>
                        <div className=''>
                            Account Balance
                        </div>
                        <div className='balance'>
                                USDT { money !== '' ?
                            money : <Spinner />
                        }
                        </div>
                        <Link to='/deposit'  className='depositBtnWrap'>



                            <Button/>

                        </Link>
                        <div className='illustration'>
                            <img src={depositAi} alt=''/>
                        </div>

                    </section>

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

                    <div className='mobTransactionCont'>
                        <form>

                            <TextInput placeHolder='Search..' type='search' customizeClass={'searchInput'}
                                       label={<FontAwesomeIcon icon={faSearch}/>}/>
                        </form>


                        <div className='tab-wrap'>
                            <Tabs>
                                <TabPane name="Buy/Sell" key="1">
                                    <div className='feedWrap'>
                                        <TransactionFeed type='buySell' address='3Q9LBTehKhMsFneFDJBJFhhHbJkUv97y5B'
                                                         tag='Buy/Sell' amount={'7,633.84'}
                                                         date={'24, Nov 2020'}
                                                         label={<FontAwesomeIcon icon={faExchangeAlt}/>}/>
                                    </div>


                                </TabPane>
                                <TabPane name='Deposit' key="2">
                                    <div className='feedWrap'>
                                        <TransactionFeed type='deposit' tag='Deposit'/>
                                    </div>
                                </TabPane>
                                <TabPane name="Withdrawal" key="3">
                                    <div className='feedWrap'>
                                        <TransactionFeed type='withdrawal' tag='Withdrawal'/>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>

                    </div>

                </motion.div>

            </div>
            <MobileNav/>
        </div>
    );
};


Transactions.prototype = {
    data: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})

export default connect(mapStateToProps) (Transactions)