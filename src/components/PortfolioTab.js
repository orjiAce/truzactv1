import React from 'react';
import {FaBitcoin, FaEthereum,FaBtc } from "react-icons/fa";
let MyBox;
const PortfolioTab = ({value, Aave, BNB, BTC, BtcCash, Dash, ETH, Ripple, Tron}) => {

    if (value === 'BTC') {
        MyBox = <div className='sellBox'>
            <FaBitcoin/> &nbsp; Bitcoin  &nbsp; <small>{BTC}</small>
        </div>
    }
    if (value === 'Ethereum') {
        MyBox = <div className='sellBox'>
            <FaEthereum/> &nbsp; Ethereum  &nbsp; <small>{ETH}</small>
        </div>
    }
    if (value === 'Dash') {
        MyBox = <div className='sellBox'>
            Dash  &nbsp; <small>{Dash}  </small>
        </div>
    }
    if (value === 'Aave') {
        MyBox = <div className='sellBox'>
            Aave &nbsp; <small>{Aave}</small>
        </div>
    }
    if (value === 'BNB') {
        MyBox = <div className='sellBox'>
            BNB &nbsp; <small>{BNB}</small>
        </div>
    }
 if (value === 'BtcCash') {
        MyBox = <div className='sellBox'>
            <FaBtc/> &nbsp; BTC Cash &nbsp; <small>{BtcCash}</small>
        </div>
    }if (value === 'Tron') {
        MyBox = <div className='sellBox'>
            Tron &nbsp; <small>{Tron}</small>
        </div>
    }if (value === 'Ripple') {
        MyBox = <div className='sellBox'>
            Ripple &nbsp; <small>{Ripple}</small>
        </div>
    }

    return (
        <div>
            {
                MyBox
            }
        </div>
    );
};

export default PortfolioTab;
