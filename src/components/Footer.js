import React from 'react';
import googlePlay from '../assets/img/googleplay.png';
import appleStore from '../assets/img/applestore.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <div className='bottom'>
            <div className='firstSide'>
                <section className='head'>
                    Download the Truzact Mobile App
                </section>
                <div className='message'>
                    Buy and sell faster on the Roqqu mobile apps,
                    available on Playstore and App store
                </div>
            </div>

            <div className='middleSide'>
<img src={googlePlay} alt='goggle play'/>
<img src={appleStore} alt='apple store link'/>
            </div>

            <div className='lastSide'>
<div className='help'>
    <section className='icon'>  <FontAwesomeIcon icon={faQuestionCircle}/></section>

  <section className='note'>
      Need help with truzact?</section>
</div>
            </div>
        </div>
    );
};

export default Footer;
