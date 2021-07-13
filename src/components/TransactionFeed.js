import React from 'react';
import '../Style/Feed.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsAltV, faCircle, faReplyAll} from "@fortawesome/free-solid-svg-icons";

const TransactionFeed = ({tag, date, amount, address, type,label}) => {
    return (
        <div className='feed'>
            <section className='feedTop'>
                <div className={`tag ${type === 'buySell' ? 'buySell' : type === 'withdrawal' ? 'withdrawal' : 'deposit' }`}>
                    {tag}
                </div>
                <div className='date'>
                    {date}
                </div>
            </section>
            <section className='feedBottom'>
                <div className='amount'>
                 <FontAwesomeIcon icon={faCircle} className='icon'/> &nbsp;&nbsp;&nbsp; <div> ₦{amount} </div>
                </div>

                <div className='address'>
                    <div className='icon'>

                    </div>
                    {
                        address
                    }
                </div>

                <div className='label'>
                    {
                        label
                    }

                </div>
            </section>
        </div>
    );
};

export default TransactionFeed;
