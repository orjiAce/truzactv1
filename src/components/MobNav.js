import React, {useEffect, useState} from 'react';
import {NavLink,useHistory } from "react-router-dom";
import {NavData, SubNavDATA} from "../Data-Center/MobileMenu";
import {gsap, Power3} from "gsap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import useDarkMode from "use-dark-mode";
import {getUserData, logoutUser} from "../redux/actions/userActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const MobileNav = (props) => {
    let history = useHistory();

    const { logoutUser} = props
    const [open, setClosed] = useState(false)
    const activeUrl = window.location.pathname.split('/')

    const darkMode = useDarkMode(true);
    const {value} = useDarkMode(false);


    useEffect(() => {

gsap.to('.activeNavMenu', {
    color:'#ec0634',
    borderBottom:"2px solid #00068A",
    ease: Power3.easeInOut
})

    }, [activeUrl]);

    //user info
    const {userData:{member:{ProfileImage, FirstName, LastName, USDT}}, loading} = props.user

    let money = USDT;


    const openMenu = () => {

        setClosed(!open)
        if (open) {
            gsap.to('.mobileNav', {
                y: '0%',

            })
        } else {
            gsap.to('.mobileNav', {
                y: '-80%',
                ease: Power3.easeOut,


            })
        }

//console.clear()
    }


    const logout = () =>{
        logoutUser(history)
        console.log(history)
    }


    return (
        <nav className='mobileNav'>
            <ul className='topNav'>
                {
                    NavData.map((({link, linkClassName, icon, title, click}, index) => (

                          click ? (<li key={index} className={`${linkClassName} ${link === activeUrl[1] ? 'activeNavMenu' : ''}`} onClick={() => openMenu()}>


                                  {icon}

                          </li>) : (<li key={index} className={`${linkClassName} ${link === activeUrl[1] ? 'activeNavMenu' : ''}`}>

                              <NavLink to={`/${link}`} title={title}>
                                  {icon}
                              </NavLink>
                          </li>)


                    )))
                }
            </ul>
            <nav className='miniNav'>
                <section className='miniMenu'>
                    <ul>
                        {
                            SubNavDATA.map((({link, linkClassName, icon, click, title}, index) => (
                             click ?   ( <li key={index} onClick={logout}>


                                        <div className='linkIcon'>
                                            {icon}
                                        </div>
                                        <div className='linkTitle'>
                                            {link}
                                        </div>

                                </li>) : (<li key={index}>

                                 <NavLink to={`/${link}`} title={title}>
                                     <div className='linkIcon'>
                                         {icon}
                                     </div>
                                     <div className='linkTitle'>
                                         {link}
                                     </div>
                                 </NavLink>

                             </li>)
                            )))
                        }

                    </ul>
                </section>
                <section className='miniProfile'>
                    <div className="navMiniProfileWrap">
                        <NavLink to='/setting' className='userImg'>

                            {
                                !ProfileImage ? (
                                        <img src={'https://www.flaticon.com/svg/static/icons/svg/1077/1077114.svg'}  alt='user'/>)
                                    :

                                    <img src={ProfileImage} alt='user'/>

                            }
                        </NavLink>
                        <div className='infoWrap'>
                            <section className='userName'>
                                {
                                    LastName
                                }
                                &nbsp;
                                {FirstName}
                            </section>
                            <section className='balance'>
                                USDT{money}
                            </section>
                        </div>
                    </div>

                    <section className='toggle'>
                        <button className='themeToggle' onClick={darkMode.toggle}>
                            {value ? <FontAwesomeIcon icon={faSun}/> : <FontAwesomeIcon icon={faMoon}/>}

                        </button>
                    </section>

                </section>
            </nav>

        </nav>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,

});
MobileNav.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    getUserData: PropTypes.func.isRequired,
};

const mapActionsToProps = {
    logoutUser,
    getUserData
}

export default connect(mapStateToProps,mapActionsToProps) (MobileNav);

