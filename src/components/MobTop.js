import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import {FaBell, FaTimes} from "react-icons/all";
import {toggleNotification} from "../redux/actions/dataActions";
import {gsap, Power3} from "gsap";

const MobTop = (props) => {
    const {title} = props
    const {userData: {member: {ProfileImage}}} = props.user
    const {toggleNotification} = props;
    const {notificationState} = props.data
    const activeUrl = window.location.pathname.split('/')

    const toggleNoti = () => {
        toggleNotification()
        notificationState ? (
            gsap.to('.notificationMob', {
                display: 'flex',
                opacity: 1,
                ease: Power3.easeInOut,
                y:10

            })
        ) : gsap.to('.notificationMob', {
            display: 'none',
            opacity: 0,
            ease: Power3.easeInOut,
            y:-10
        })

    }
    return (
        <div className='mobTop'>
            <div className='notificationMob'>
                <div className='closeBtn' onClick={toggleNoti}>
                    <FaTimes/>
                </div>

                <div className='mobNotiContent'>
                    <div className="mobNotiHead">
                        Earn up to 15% on USDT savings
                    </div>
                    <div className='mobNotiMessage'>


                        <div className='message'>
                            Ever wanted to earn money in crypto, here's an opportunity, save USDT on Roqqu and earn up
                            to 15% interest.
                        </div>
                    </div>
                </div>
            </div>
            <section className='wrap'>

                <div className='pageTitle'>
                    {
                        title ? title : activeUrl
                    }
                </div>

                <div className='notifyMob' onClick={toggleNoti}>
                    <FaBell/>

                </div>
                {/*<Link to='/setting' className='userImg'>

                    {
                        ProfileImage === null ? (
                                <img src={'https://www.flaticon.com/svg/static/icons/svg/1077/1077114.svg'}  alt='user'/>)
                            :

                            <img src={userImage} alt='user'/>

                    }
                </Link>*/}
            </section>


        </div>
    );
};

MobTop.propTypes = {
    user: PropTypes.object.isRequired,
    toggleNotification: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data,

});
const mapActionsToProps = {
    toggleNotification,

}


export default connect(mapStateToProps, mapActionsToProps)(MobTop);
