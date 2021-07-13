import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import TextTransition, {presets} from "react-text-transition";
import {HiOutlineArrowNarrowRight, HiLocationMarker} from 'react-icons/hi';
import {FaMobile, FaPiggyBank} from 'react-icons/fa';
import {IoMdMailUnread} from 'react-icons/io';
import {IoWallet} from 'react-icons/io5';
import {BiShieldQuarter, BiSupport} from 'react-icons/bi';
import {FiSend} from 'react-icons/fi';
import {GiTakeMyMoney, GiMoneyStack} from 'react-icons/gi';
import {TimelineLite, Power3, gsap} from 'gsap'
import './Home.scss';
import '../../Style/Responsive/Responsive.Home.scss'
import curveLine from '../../assets/curve-line.svg';
import vectorFrame from '../../assets/banner-vector-shape.svg'
import biCardBrown from '../../assets/bigCard.svg'
import bigCardMilk from '../../assets/bigCardBrown.svg'
import truzactLogo from '../../assets/img/logo1.png'
import truzactLogoW from '../../assets/img/Truzact logo white horinzontal.png'
import introImage from '../../assets/introimage.png'
import introShape from '../../assets/introshape-brown.svg'
import introShapeBlue from '../../assets/inroshape-blue.svg'
import getStartedInfoBack from '../../assets/getStartedInfoback.svg'
import ReactTextTransition from "react-text-transition";
import {toggleHomeMenu} from "../../redux/actions/dataActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {FaTwitter, FaFacebook, FaInstagram, FaTags} from "react-icons/fa"
import {HiUserAdd} from "react-icons/hi"
import googlePlay from "../../assets/img/googleplay.png";
import appleStore from "../../assets/img/applestore.png";
import Fade from 'react-reveal/Fade'
import AuthRoute from "../../components/AuthRoute";
import Auth from "../Auth/Auth";


const TEXTS = [
    "Secure Crypto Savings And Fast Withdrawals",
    "Easy way to buy and sell cryptocurrency",
];

const customers = [
    "Micheal", "Kingsley", "Kayode"
]


const testimonials = [
    " 'Quis commodo velit quis cupidatat non amet aliqua sint veniam labore. Culpa ea laboris consequat mollit proident Lorem cupidatat officia fugiat. Tempor sunt non ullamco irure in proident. Laboris minim esse qui non id et anim commodo. Esse id do irure ut eiusmod aliqua irure dolor in est ullamco culpa enim.' ",
    "Quis deserunt tempor consectetur id ea. Aute sunt eu minim nostrud officia excepteur duis et tempor do dolor culpa. Cillum nostrud quis magna consequat.",
    "Aute in id ullamco laboris aute tempor magna dolore ad laborum.",
    "Exercitation ullamco qui occaecat dolore ex cillum exercitation commodo magna Lorem in laborum do do. Laboris ad mollit adipisicing ad occaecat fugiat tempor commodo irure magna culpa. Culpa eiusmod nisi sit non ipsum."
];


const HomeComponent = (props) => {


    const randomNumber = () => Math.floor(Math.random() * 9999999999 + 10000000000);
    const [index, setIndex] = useState(0);
    const [textIndex, setTextIndex] = useState(0);
    const [paragraphIndex, setParagraphIndex] = useState(0);
    const [number, setNumber] = useState(randomNumber());
    const {homeMenu} = props.data
    const {toggleHomeMenu} = props


    let t1 = new TimelineLite();
    useEffect(() => {


        const intervalId = setInterval(() =>
                setIndex(index => index + 1),
            7000 // every 7 seconds
        );
    }, []);


    useEffect(() => {
        setInterval(() => {
            setNumber(randomNumber())
            setTextIndex(textIndex + 1,)
            setParagraphIndex(paragraphIndex + 1)
        }, 8000);
    }, [paragraphIndex,textIndex])

    useEffect(() => {
        t1.from('.smallText', {
            opacity: 0,
            y: -10,
            ease: Power3.easeInOut,
        }).from('.firstText', {
            opacity: 0,
            y: -10,
            ease: Power3.easeInOut,
        })

    }, [])


    const openMenu = () => {
        //t1.reverse();
        toggleHomeMenu()
        if (homeMenu === false) {
            t1.to(".nav", {
                position: 'fixed',
            });
            gsap.to(".menuStickOne", {
                duration: 0.4,
                y: 8,
                rotation: 45,
                ease: Power3.easeInOut
            })
            gsap.to(".menuStickTwo", {
                y: -8,
                duration: 0.4,
                rotation: -45,
                ease: Power3.easeInOut,
            });

            gsap.to(".mobileMenu", {
                display: 'flex',
                overflow: 'hidden',
                opacity: 1,
                duration: 0.4,
                ease: Power3.easeInOut,
            });

        } else {
            gsap.to(".menuStickOne", {
                y: 0,
                rotation: 0,
                ease: Power3.easeInOut
            });
            gsap.to(".menuStickTwo", {
                y: 0,
                rotation: 0,
                ease: Power3.easeInOut,
            });


            gsap.to(".mobileMenu", {
                display: 'none',
                overflow: 'hidden',
                opacity: 0,
                duration: 0.4,
                ease: Power3.easeInOut,
            });

            gsap.to(".nav", {
                position: 'relative',
            });
        }


    }

    return (


        <div className='home'>


            <div className='homeBannerWrap'>
                <menu className='homeMenu'>
                    <nav className='nav'>
                        <div className='logo'>
                            <LazyLoadImage effect={'blur'} src={truzactLogoW} alt='logo'/>
                        </div>

                        <button className='mobMenuBtn' onClick={openMenu} aria-label="mob Menu Button">
                            <div className='menuStickOne'>

                            </div>

                            <div className='menuStickTwo'>

                            </div>
                        </button>
                        <ul>
                            <li>
                                Home
                            </li>
                            <li>
                                About us
                            </li>
                            <li>
                                Contact us
                            </li>
                            <li>
                                <Link to='/auth'>
                                    Login
                                </Link>
                            </li>
                            <li className='signUp'>
                                <Link to='/auth'>
                                    <HiUserAdd/> Join us for free
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className='mobileMenu'>
                        <ul>
                            <li>
                                Home
                            </li>
                            <li>
                                About us
                            </li>
                            <li>
                                Contact us
                            </li>
                            <li>
                                <Link to='/auth'>
                                    Login
                                </Link>
                            </li>
                            <li className='signUp'>
                                <Link to='/auth'>
                                    Join us for free <HiUserAdd/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </menu>

                <div className='homeBanner'>
                    {/*
                     <div className='particles'>
                        <Particles
                            className='particle'
                            params={{
                                "particles": {
                                    "number": {
                                        "value": 260,
                                        "density": {
                                            "enable": false
                                        }
                                    },
                                    "size": {
                                        "value": 3,
                                        "random": true,
                                        "anim": {
                                            "speed": 4,
                                            "size_min": 0.3
                                        }
                                    },
                                    "line_linked": {
                                        "enable": false
                                    },
                                    "move": {
                                        "random": true,
                                        "speed": 1,
                                        "direction": "top",
                                        "out_mode": "out"
                                    }
                                },
                                "interactivity": {
                                    "events": {
                                        "onhover": {
                                            "enable": true,
                                            "mode": "bubble"
                                        },
                                        "onclick": {
                                            "enable": true,
                                            "mode": "repulse"
                                        }
                                    },
                                    "modes": {
                                        "bubble": {
                                            "distance": 250,
                                            "duration": 2,
                                            "size": 0,
                                            "opacity": 0
                                        },
                                        "repulse": {
                                            "distance": 400,
                                            "duration": 4
                                        }
                                    }
                                }
                            }}/>
                    </div>
                    */}

                    <div className='bannerContent'>
                        <section className='leftContent'>
                            <div className='firstText'>
                                <line/>
                                Next Gen wallet
                            </div>
                            <div className='bigText'>
                                <TextTransition
                                    delay={1}
                                    direction='down'
                                    noOverflow={false}
                                    text={TEXTS[index % TEXTS.length]}
                                    springConfig={presets.wobbly}

                                />
                            </div>
                            <div className='smallText'>
                                Truzact is the Safest and trusted way to buy, sell and save cryptocurrencies and
                                earn 8-10% Interest per annum.
                            </div>
                            <button className='startHere'>
                                <Link to='/auth'>
                                    Join us for free <HiOutlineArrowNarrowRight/>
                                </Link>

                            </button>
                            {/*   <div className='cryptoBox'>

                            </div>*/}

                        </section>
                        <section className='rightContent'>


                            <div className='bigCardBrown'>

                                <img src={biCardBrown} alt='Big Card Brown' className='cardBrown'/>
                                <img src={bigCardMilk} alt='Big Card Brown' className='cardMilk'/>

                            </div>

                        </section>

                    </div>
                    <div className='curveLine'>

                        <img src={curveLine} alt='curve Line'/>
                    </div>

                    <div className='vectorShape'>
                        <img src={vectorFrame} alt='Vector shape'/>
                    </div>


                </div>

            </div>

            <div className='homeContainer'>
                <div className='intro'>
                    <div className='introImages'>
                        <Fade bottom>
                            <div className='imageWrap'>

                                <LazyLoadImage src={introShape} className='introShape' alt='intro Shape'/>

                                <LazyLoadImage effect={'blur'} src={introImage} className='introImage'
                                               alt='intro Image'/>

                                <LazyLoadImage src={introShapeBlue} className='introShapeBlue' alt='intro Shape Blue'/>

                            </div>
                        </Fade>
                    </div>
                    <Fade bottom cascade>
                        <div className='introMessages'>

                            <div className='introHeader'>
                                Why Truzact
                            </div>
                            <div className='introText'>
                                Truzact is a secure way to Buy, Sell and save cryptocurrencies. With wealth growth at
                                heart,
                                we help millennials save their digital assets.
                            </div>
                            <div className='introTextTwo'>
                                With your debit card or your own virtual bank account number, easily save and invest
                                into
                                cryptocurrencies. Convert your local currency to USDT (Crypto USDT) and gain stability
                                with
                                your money. Complete transaction in just few seconds and withdraw your Bitcoin and
                                Altcoins
                                directly into your local bank account without delays.
                            </div>
                            <Link to='/auth'>
                                <button className='createAccount'>
                                    <HiUserAdd/> Join us for free
                                </button>
                            </Link>

                        </div>
                    </Fade>
                </div>

                <div className='features'>
                    <Fade bottom>
                        <div className='featureText'>


                            <div className='featureHeader'>
                                Our Unique Features
                            </div>
                            <div className='featureSubText'>
                                There are just many reasons to stick with Truzact
                            </div>

                        </div>
                    </Fade>
                    <div className='featuresWrap'>
                        <Fade bottom cascade>
                            <div className='featureCont'>

                                <div className='feature'>


                                    <div className='icons'>
                                        <div className='iconBox'>
                                            <FaMobile/>
                                        </div>

                                    </div>
                                    <div className='featureInfoWrap'>
                                        <div className='info'>
                                            <div className='infoHead'>
                                                Mobile Apps
                                            </div>
                                            <div className='infoText'>
                                                Enjoy seamless experience with Truzact mobile application at your own
                                                comfort.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='feature'>


                                    <div className='icons'>
                                        <div className='iconBox'>
                                            <IoWallet/>
                                        </div>

                                    </div>
                                    <div className='featureInfoWrap'>
                                        <div className='info'>
                                            <div className='infoHead'>
                                                Multiple wallets
                                            </div>
                                            <div className='infoText'>
                                                Truzact supports Bitcoin, Ethereum, BNB, and other altcoins with high
                                                liquidity for you power of options.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='feature'>


                                    <div className='icons'>
                                        <div className='iconBox'>
                                            <FaPiggyBank/>
                                        </div>

                                    </div>
                                    <div className='featureInfoWrap'>
                                        <div className='info'>
                                            <div className='infoHead'>
                                                Savings
                                            </div>
                                            <div className='infoText'>
                                                We help users build wealth by encouraging them to save and invest their
                                                digital ass
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                        <Fade bottom cascade>
                            <div className='featureCont'>

                                <div className='feature'>


                                    <div className='icons'>
                                        <div className='iconBox'>
                                            <BiShieldQuarter/>
                                        </div>

                                    </div>
                                    <div className='featureInfoWrap'>
                                        <div className='info'>
                                            <div className='infoHead'>
                                                Safe and Secure
                                            </div>
                                            <div className='infoText'>
                                                Truzact uses the highest levels of Internet Security, and it is secured
                                                by
                                                256 bits SSL security encryption to ensure that your information is
                                                completely protected from fraud.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='feature'>


                                    <div className='icons'>
                                        <div className='iconBox'>
                                            <BiSupport/>
                                        </div>

                                    </div>
                                    <div className='featureInfoWrap'>
                                        <div className='info'>
                                            <div className='infoHead'>
                                                Amazing support
                                            </div>
                                            <div className='infoText'>
                                                Our dedicated support team is ever available 24/7 to attend to your need
                                                if
                                                you ever have any problem with your Truzact account.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='feature'>


                                    <div className='icons'>
                                        <div className='iconBox'>
                                            <GiTakeMyMoney/>
                                        </div>

                                    </div>
                                    <div className='featureInfoWrap'>
                                        <div className='info'>
                                            <div className='infoHead'>
                                                Instant withdrawal
                                            </div>
                                            <div className='infoText'>
                                                Get instant fiat settlement directly into your local bank at the best
                                                market
                                                rates.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fade>

                    </div>


                </div>


                <div className='getStarted'>


                    <div className='getStartedText'>

                        <Fade bottom>
                            <div className='getStartedHeader'>
                                Get Started With Truzact
                            </div>
                            <div className='featureSubText'>
                                Start Investing into cryptocurrencies, learn about Bitcoin with
                                interactive guides. It’s fun, easy, and takes only a few minutes!
                            </div>
                        </Fade>
                    </div>
                    <Fade bottom cascade>
                        <div className='getStartedInfoWrap'>

                            <div className='getStartedInfo'>
                                <img src={getStartedInfoBack} alt='Get started back'/>
                                <div className='getStartedContent'>
                                    <div className='contentIcon'>
                                        <GiMoneyStack/>
                                    </div>

                                    <div className='contentHead'>
                                        Deposit
                                    </div>
                                    <div className='contentText'>
                                        Easily fund your unique bank account number and get
                                        credited with your preferred
                                        crypto instantly.
                                    </div>


                                </div>
                            </div>
                            <div className='getStartedInfo'>
                                <img src={getStartedInfoBack} alt='Get started back'/>


                                <div className='getStartedContent'>
                                    <div className='contentIcon'>
                                        <FaTags/>
                                    </div>

                                    <div className='contentHead'>
                                        Instant Buy and Sell
                                    </div>
                                    <div className='contentText'>
                                        Buy and sell your favourite
                                        cryptocurrencies intantly.
                                        Get started with as little N500.
                                    </div>


                                </div>
                            </div>
                            <div className='getStartedInfo'>
                                <img src={getStartedInfoBack} alt='Get started back'/>
                                <div className='getStartedContent'>
                                    <div className='contentIcon'>
                                        <FiSend/>
                                    </div>

                                    <div className='contentHead'>
                                        Send and Receive Gobally
                                    </div>
                                    <div className='contentText'>
                                        Send and recieve money
                                        instantly from anywhere in
                                        the world and withdraw Naira
                                        instantly into your bank
                                        account.
                                    </div>


                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
                <Fade bottom>
                    <div className='portfolio'>

                        <span>30,000+ </span> &nbsp; people save and trade with Truzact everyday.
                    </div>
                </Fade>


                <div className='subscribe'>
                    <Fade bottom>
                        <div className='subscribeTitle'>
                            Get in touch with us
                        </div>
                        <div className='subscribeInput'>
                            <input placeholder='Enter email address' type='text'/>
                            <button> Talk to us ></button>
                        </div>
                    </Fade>
                </div>

                <div className='testimonial'>
                    <div className='testimonialTitle'>
                        What people are saying about truzact
                    </div>
                    <section className="inline">
                        <blockquote>
                            <ReactTextTransition
                                text={testimonials[paragraphIndex % customers.length]}
                                spring={presets.gentle}
                                className="customerTestimony"
                                //style={{ height: "180px" }}
                            /></blockquote>

                        <ReactTextTransition
                            text={customers[textIndex % customers.length]}
                            spring={presets.gentle}
                            className="customerName"
                            delay={300}
                            inline
                        />
                    </section>
                </div>

                <footer className='footer'>

                    <div className='topFooter'>
                        <section className='companyProfile'>
                            <div className='brandLogo'>
                                <img src={truzactLogo} alt='truzact logo'/>
                            </div>
                            <div className='about'>
                                Truzact is a secure way to Buy,
                                Sell and save cryptocurrencies.
                            </div>

                            <section className='footerContact'>


                                <div><HiLocationMarker/> Nigeria</div>
                                <div><IoMdMailUnread/> contact@truzact.com</div>

                            </section>
                            <div className='socialButtons'>
                                <ul>
                                    <li>
                                        <FaTwitter/>
                                    </li>
                                    <li>
                                        <FaInstagram/>
                                    </li>
                                    <li>
                                        <FaFacebook/>
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <section className='resources'>
                            <div className='title'>
                                Resources
                            </div>
                            <ul>
                                <li>
                                    About us
                                </li>
                                <li>
                                    Contact us
                                </li>
                                <li>
                                    Blog
                                </li>
                                <li>
                                    Privacy policy
                                </li>
                                <li>
                                    Terms
                                </li>
                            </ul>
                        </section>
                        <section className='quickLinks'>
                            <div className='footerFirstSide'>
                                <section className='head'>
                                    Download the Truzact Mobile App
                                </section>
                                <div className='message'>
                                    Buy and sell faster on the Truzact mobile apps,
                                    available on Playstore and App store
                                </div>
                            </div>

                            <div className='footerMiddleSide'>
                                <img src={googlePlay} alt='goggle play'/>
                                <img src={appleStore} alt='apple store link'/>
                            </div>
                        </section>
                    </div>


                    <section className='bottomFooter'>


                        <div className='copy'>
                            Copyright &copy; Truzact&trade;  2021
                        </div>
                    </section>

                </footer>


                {/*
                MOBILE STARTS

                */}

                <div className='mobPortfolio'>
                    <div>30,000+ people save and trade with Truzact everyday.</div>
                </div>

                <div className='mobSubscribe'>

                    <div className='subscribeInput'>
                        <input placeholder='Enter email address' type='text'/>

                    </div>
                    <button> Talk to us ></button>

                </div>

                <div className='mobFooter'>
                    <section className='companyProfile'>
                        <div className='brandLogo'>
                            <img src={truzactLogo} alt='truzact logo'/>
                        </div>

                        <div className='about'>
                            <div>
                                Truzact is a secure way to Buy, Sell and save cryptocurrencies.
                            </div>
                            <div><HiLocationMarker/> Nigeria</div>
                            <div><IoMdMailUnread/> contact@truzact.com</div>
                        </div>
                        <div className='socialButtons'>
                            <ul>
                                <li>
                                    <FaTwitter/>
                                </li>
                                <li>
                                    <FaInstagram/>
                                </li>
                                <li>
                                    <FaFacebook/>
                                </li>
                            </ul>
                        </div>

                        <div className='footerFirstSide'>
                            <section className='head'>
                                Download the Truzact Mobile App
                            </section>
                            <div className='message'>
                                Buy and sell faster on the Truzact mobile apps,
                                available on Playstore and App store
                            </div>
                        </div>

                        <div className='footerMiddleSide'>
                            <img src={googlePlay} alt='goggle play'/>
                            <img src={appleStore} alt='apple store link'/>
                        </div>
                    </section>

                    <section className='bottomFooter'>
                        <div className='copy'>
                            Copyright &copy; Truzact&trade;  2021
                        </div>
                    </section>
                </div>

                {/*
                END MOBILE STARTS

                */}
            </div>


        </div>

    );
};

HomeComponent.prototype = {
    data: PropTypes.object.isRequired,
    toggleHomeMenu: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    toggleHomeMenu,
}

//export default connect(mapStateToProps, mapActionsToProps) (<AuthRoute path={} component={HomeComponent}/>)

export default connect(mapStateToProps, mapActionsToProps)(HomeComponent);
