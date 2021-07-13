import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faSun,
    faMoon,
    faInfoCircle,
    faBell
} from '@fortawesome/free-solid-svg-icons'
import useDarkMode from "use-dark-mode";
import {TimelineLite, Power3, gsap} from 'gsap'

import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {toggleNotification} from "../redux/actions/dataActions";

const Notification = (props) => {
    const darkMode = useDarkMode(true);
    const {value} = useDarkMode(false);


    const [placement, setPlacement] = useState("left")

    const {toggleNotification} = props
    const {notificationState} = props.data

    const toggleNoti = async () =>{

        await toggleNotification()
        if(notificationState === true) {
            gsap.to('.notification', {
                display: 'flex',
                opacity: 1,
                y:0

            })
        }else {
            gsap.to('.notification', {
                display: 'none',
                opacity: 0,
                y: -10
            })
        }
//alert(notificationState)

    }


    return (
        <div className='notificationWrap'>



        <div className='bell' onClick={toggleNoti}>
            <FontAwesomeIcon icon={faBell}/>

        </div>
                <div className='notification'>
                    <div className='notiIcon'>
                        <FontAwesomeIcon icon={faInfoCircle} className='icon'/>
                    </div>
                    <div className='notiContent'>
                        <div className="notiHead">
                            Earn up to 15% on USDT savings
                        </div>
                        <div className='notiMessage'>


                            <div className='message'>
                                Ever wanted to earn money in crypto, here's an opportunity, save USDT on Roqqu and earn up
                                to 15% interest per annum paid daily,
                                update your mobile app now.
                            </div>
                        </div>
                    </div>
                </div>

            <button className='themeToggle' onClick={darkMode.toggle}>
                {value ?<FontAwesomeIcon icon={faSun}/> :  <FontAwesomeIcon icon={faMoon}/> }

            </button>
        </div>
    );
};

Notification.propTypes = {
    data: PropTypes.object.isRequired,
    toggleNotification: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => ({
    data: state.data,
})
const mapActionsToProps = {
    toggleNotification,

}


export default connect(mapStateToProps, mapActionsToProps) (Notification);
