import React from 'react';
import './Savings.scss'
import Notification from "../../components/Notification";
import brandLogo from "../../assets/img/Truzact logo white horinzontal.png";
import MobTop from "../../components/MobTop";
import Footer from "../../components/Footer";
import '../../Style/Responsive/Responsive.mySavings.scss'
import SavingBox from "../../assets/ai/SavingBox.svg";
import {GiPiggyBank, GiTakeMyMoney} from "react-icons/gi";
import Menu from "../../components/Menu";
import MobileNav from "../../components/MobNav";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {motion} from "framer-motion"
import {toggleHomeMenu} from "../../redux/actions/dataActions";
import {NavLink} from "react-router-dom";


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

const Savings = () => {
    return (
        <div className="App">
            <Menu/>
            <motion.div exit="out" initial="out" animate="in" variants={pageTransition} className='mySavings'>
                <Notification/>
                <div className='mySavingsWrap'>

                    <div className='savingBox'>
                        <section className='savingBoxTop'>
                            <div className='savingIllustration'>
                                <img src={SavingBox} alt='SavingBox'/>
                            </div>
                            <div className='savingText'>
                                Here you reap what you saved!
                            </div>
                            <div className='dollarSign'>
                                ₦
                            </div>
                        </section>

                        <section className='savingBoxBottom'>
                            <div className='amount'>
                                ₦0.00
                            </div>
                            <div className='pill'>
                                Saved
                            </div>
                        </section>
                    </div>
                    <div className='savingBtnWrap'>
                        <button className='withdrawBtn'>
                            <GiTakeMyMoney/>
                            <div>Withdraw</div>
                        </button>

                        <NavLink to='/save'>


                        <button className='lockBtn'>
                            <GiPiggyBank/>
                            <div>Save</div>

                        </button>
                        </NavLink>
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
                <div className='mobSavingBox'>
                    <div className='amount'>
                        ₦0.00
                    </div>
                    <div className='pill'>
                        <small>Saved</small>
                    </div>
                    <div className='savingIllustration'>
                        <img src={SavingBox} alt='SavingBox'/>
                    </div>
                    <div className='savingText'>
                        Here you reap what you saved!
                    </div>
                </div>
                <div className='savingButtons'>
                    <button className='withdrawBtn'>
                        <i><GiTakeMyMoney/> </i>
                        <div>Withdraw</div>
                    </button>
                    <NavLink to='/save'>
                    <button className='lockBtn'>
                        <i><GiPiggyBank/> </i>
                        <div>Save</div>

                    </button>
                    </NavLink>
                </div>
                </motion.div>
            </div>
            <MobileNav/>
        </div>
    );
};

Savings.prototype = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.data
})

const mapActionsToProps = {
    toggleHomeMenu,
}


export default connect(mapStateToProps, mapActionsToProps) (Savings);
