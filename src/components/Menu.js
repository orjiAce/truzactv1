import React, {useEffect, useState} from 'react';
import '../Style/menu.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChartArea, faWallet, faMoneyCheck, faPiggyBank, faCommentDots, faShieldAlt, faCogs
} from '@fortawesome/free-solid-svg-icons'

import {Link, useHistory} from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logoutUser} from "../redux/actions/userActions";
import brandLogo from "../assets/img/Truzact logo white horinzontal.png";

import { SkeletonText } from "@chakra-ui/react"
import {gsap, Power3, TimelineLite} from "gsap";




const Menu = (props) => {
    const activeUrl = window.location.pathname.split('/')
    const [menuState, setMenuState] = useState(false)
    let t1 = new TimelineLite();

    let history = useHistory();

    const {logoutUser} = props
    //user info
    const {user, loading} = props
const {userData} = props.user
const {member: { LastName, ProfileImage}} = props.user.userData




    const logout = () =>{
        logoutUser(history)
        console.log(history)
    }
    const toggleMenu = () =>{


        if (menuState === true) {
            gsap.to(".tabMenuStickOne", {
                y: 0,
                rotation: 0,
                ease: Power3.easeInOut
            });
            gsap.to(".tabMenuStickTwo", {
                y: 0,
                rotation: 0,
                ease: Power3.easeInOut,
            });
            gsap.to(".tabMenuStickThree", {
                y: 0,
                rotation: 0,
                opacity: 1,
                ease: Power3.easeInOut,
            });


            gsap.to(".menuCont", {
                ease: Power3.easeInOut,
                x:'-300px',
            });

            gsap.to(".tabMenuBtn", {
                x: '0',
                ease: Power3.easeInOut
            })


        } else {



            //menu open
            gsap.to(".tabMenuBtn", {
                ease: Power3.easeInOut
            })

            t1.to(".menuCont", {
                ease: Power3.easeInOut,
                x:'0px',
            });
            gsap.to(".tabMenuStickOne", {
                duration: 0.4,
                y: 8,
                rotation: 45,
                ease: Power3.easeInOut
            })
            gsap.to(".tabMenuStickTwo", {
                y: -8,
                duration: 0.4,
                rotation: -45,
                ease: Power3.easeInOut,
            });
            gsap.to(".tabMenuStickThree", {
                opacity: 0,
                ease: Power3.easeInOut,
            });

            gsap.to(".mobileMenu", {
                display: 'flex',
                overflow: 'hidden',
                opacity: 1,
                duration: 0.4,
                ease: Power3.easeInOut,
            });


        }

    }
    return (
        <menu className='menuWrap'>
            <button className='tabMenuBtn' onClick={() => toggleMenu(setMenuState(!menuState))} aria-label="mob Menu Button">
                <div className='tabMenuStickOne'>

                </div>

                <div className='tabMenuStickTwo'>

                </div> <div className='tabMenuStickThree'>

            </div>
            </button>
            <div className='menuCont'>

                <div className='menu'>

                    <section className='brandLogo'>
                        <Link to='/'>
                        <img src={brandLogo} alt='brand logo'/>
                        </Link>
                    </section>

                    <section className='userMini'>
                        <section className='profileImg'>
                            {
                                Object.keys(userData).length > 0 && !ProfileImage  ? (
                                        <img src={'https://www.flaticon.com/svg/static/icons/svg/1077/1077114.svg'}  alt='user'/>)
                                    :

                                    <img src={ProfileImage} alt='user'/>

                            }
                        </section>
                        <section className='userName'>

                            {
                                loading?  <SkeletonText mt="4" noOfLines={1} spacing="4" /> :      ( LastName.toUpperCase())
                            }





                        </section>
                    </section>

                    <section className='mainMenu'>
                        <div className='menuTitle'>
                            Menu
                        </div>

                        <menu className=''>
                            <Link to='/dashboard' className={`${'dashboard' === activeUrl[1] ? 'activeMenu' : ''}`}>
                                <section className='icon'>
                                    <FontAwesomeIcon icon={faChartArea}/>
                                </section>
                                <section className='text' >
                                    Dashboard
                                </section>
                            </Link>

                            <Link to='/wallets'>
                                <section className='icon'>
                                    <FontAwesomeIcon icon={faWallet}/>
                                </section>
                                <section className='text'>
                                    Wallets
                                </section>
                            </Link>

                            <Link to='/transactions'>
                                <section className='icon'>
                                    <FontAwesomeIcon icon={faMoneyCheck}/>
                                </section>
                                <section className='text'>
                                    Transactions
                                </section>
                            </Link>

                            <Link to='/savings'>
                                <section className='icon'>
                                    <FontAwesomeIcon icon={faPiggyBank}/>
                                </section>
                                <section className='text'>
                                    My savings
                                </section>
                            </Link>
                        </menu>

                        <div className='subMenu'>

                            <Link to='/setting'>
                                <section className='icon'>
                                    <FontAwesomeIcon icon={faCogs}/>
                                </section>
                                <section className='text' >
                                    Settings
                                </section>
                            </Link>

                            <Link to='/security' title='Security'>
                                <section className='icon'>
                                    <FontAwesomeIcon icon={faShieldAlt}/>
                                </section>
                                <section className='text'>
                                    Security
                                </section>
                            </Link>

                            <Link to='/transactions'>
                                <section className='icon'>
                                    <FontAwesomeIcon icon={faCommentDots}/>
                                </section>
                                <section className='text'>
                                    Support
                                </section>
                            </Link>

                        </div>
                    </section>

<button className='logoutBtn' onClick={logout}>Logout</button>
                </div>
            </div>

        </menu>
    );
};

Menu.prototypes = {
    data: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})
const mapActionsToProps = {
    logoutUser
}


export default connect(mapStateToProps, mapActionsToProps)(Menu);
