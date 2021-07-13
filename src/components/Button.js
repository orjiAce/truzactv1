import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";

const Button = ({action, name}) => {
    return (
        <button className='depositBtn' onClick={action}>
            <section className='icon'>
                <FontAwesomeIcon icon={faArrowUp}/>
            </section>
            <section className='text'>
                Deposit
            </section>

        </button>
    );
};

export default Button;
