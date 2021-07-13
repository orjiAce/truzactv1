import React, {useEffect} from 'react';
import './BusySell.scss'
import '../../Style/Responsive/Responsive.BuySell.scss'
import Menu from "../../components/Menu";
import {motion} from "framer-motion";
import Notification from "../../components/Notification";
import Footer from "../../components/Footer";
import brandLogo from "../../assets/img/Truzact logo white horinzontal.png";
import MobTop from "../../components/MobTop";
import { useToast} from "@chakra-ui/react";
import MobileNav from "../../components/MobNav";
import Tabs from "../../components/Tab";
import TabPane from "../../components/Tab-Pane";

import PropTypes from "prop-types";


import {connect, useDispatch} from 'react-redux'
import BuyTab from "../../components/BuyTab";
import SellTab from "../../components/SellTab";


/*const pageAnimation = {
    type: "spring",
}*/


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


const BuySell = (props) => {

    const dispatch = useDispatch()
    const toast = useToast()
    const {member: {ID, BTC, Ethereum, Dash, BNB, Ripple, Tron, Aave, BitcoinCash}} = props.user.userData
    const {buyCryptoErr,sellCryptoErr,sellCrypto, buyCrypto,loadingData} = props.data


    useEffect(() =>{
        loadingData === false && buyCryptoErr !== null &&
        toast({
            title: "Error",
            description: buyCryptoErr.message,
            position: "top",
            status: "error",
            duration: 4000,
            isClosable: true,
        })

    },[loadingData, buyCryptoErr, dispatch])

    useEffect(() =>{
        loadingData === false && sellCryptoErr !== null &&
        toast({
            title: "Error",
            description: sellCryptoErr.message,
            position: "top",
            status: "error",
            duration: 4000,
            isClosable: true,
        })

    },[loadingData, sellCryptoErr, dispatch])


    return (
        <div className='App'>
            <Menu/>

            <motion.div exit="out" initial="out" animate="in" variants={pageTransition} className='BuySell'>

                <Notification/>
                <div className='buySellWrap'>

                    <div className='buyTab'>
                        <div className='tab-wrap'>
                            <Tabs>
                                <TabPane name="Quick Buy" key="1">
                                    <div className='feedWrap'>

                                        <BuyTab ID={ID} BTC={BTC} ETH={Ethereum}  Dash={Dash} BNB={BNB} Ripple={Ripple}
                                                Tron={Tron} Aave={Aave} BtcCash={BitcoinCash}/>
                                    </div>


                                </TabPane>
                                <TabPane name='Fast Sell' key="2">
                                    <div className='feedWrap'>



                                            <SellTab ID={ID} BTC={BTC} ETH={Ethereum} Dash={Dash} BNB={BNB} Ripple={Ripple}
                                                     Tron={Tron} Aave={Aave} BtcCash={BitcoinCash}/>



                                    </div>
                                </TabPane>

                            </Tabs>
                        </div>
                    </div>

                    <div className='convertCrypto'>


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
                    <div className='mobBuySell'>

                        <div className='tab-wrap'>
                            <Tabs>
                                <TabPane name="Quick Buy" key="1">
                                    <div className='feedWrap'>

                                        <BuyTab ID={ID} BTC={BTC} ETH={Ethereum} Dash={Dash} BNB={BNB} Ripple={Ripple}
                                                Tron={Tron} Aave={Aave} BtcCash={BitcoinCash} buyCrypto={buyCrypto}/>
                                    </div>


                                </TabPane>
                                <TabPane name='Fast Sell' key="2">
                                    <div className='feedWrap'>

                                        <SellTab ID={ID} BTC={BTC} ETH={Ethereum} Dash={Dash} BNB={BNB} Ripple={Ripple}
                                                 Tron={Tron} Aave={Aave} BtcCash={BitcoinCash} sellCrypto={sellCrypto}/>




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
BuySell.propTypes = {
    data: PropTypes.object.isRequired,


}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})


export default connect(mapStateToProps)(BuySell);
