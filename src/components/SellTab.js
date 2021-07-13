import React, { useState} from 'react';
import { HStack, useRadioGroup, useToast} from "@chakra-ui/react";
import RadioCard from "./RadioBtn";

import PortfolioTab from "./PortfolioTab";
import TextInput from "./TextInput";
import {FaShoppingBasket} from "react-icons/fa";
import PropTypes from "prop-types";
import {sellCryptoFunc} from "../redux/actions/dataActions";
import {connect, useDispatch} from 'react-redux'
import {CLEAR_CRYPTO_ERRORS} from "../redux/types";

/*
{value === 'BTC' ? (<div className='checkCrypto'>
    <FaBitcoin/> &nbsp; BITCOIN</div>) : (
    <div className='checkCrypto'>
        <FaEthereum/> &nbsp; {value}
    </div>)*/



const SellTab = (props) => {

const dispatch = useDispatch();

    const toast = useToast();

    const portfolio = ["BTC", "Ethereum", "Aave", "BtcCash", "Dash", "Tron", "BNB", "Ripple"]
    const [sellingCrypto, setSellingCrypto] = useState('BTC')
    const [sellAmount, setSellAmount] = useState('')
    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "portfolio",
        defaultValue: "BTC",
        onChange: console.log,
    })

    const group = getRootProps()


    const {member: {ID}} = props.user.userData
    const {loadingData} = props.data
    const { sellCryptoFunc,Aave, BNB, BTC, BtcCash, Dash, ETH, Ripple, Tron} = props

    const sellCryptoNow = async (event) => {
        event.preventDefault()
        const cryptoData = new FormData()
        cryptoData.append('Crypto', sellingCrypto)
        cryptoData.append('UserID', ID)
        cryptoData.append('Amount', sellAmount)
        if (sellAmount < 500) {
            toast({
                title: "Amount too small",
                description: 'Minimum sell amount is 500',
                position: "top",
                status: "info",
                duration: 5000,
                isClosable: true,
            })
            return
        }
        await sellCryptoFunc(cryptoData)

        dispatch({
            type: CLEAR_CRYPTO_ERRORS
        })

    }






    return (
        <form className='sellWrap' onSubmit={sellCryptoNow}>

<div className='title'>
    Which digital currency do you want to sell
</div>

            <div className='inputWrap'>
                <div className='topLabel'>
                  Crypto wallet
                </div>
                <div className='group'>
                    {/*    <img src={flag} width='30' height='30'/>*/}
                    <select  className='textInput' onChange={e => setSellingCrypto(e.target.value)} >

                                <option value='BTC'>BTC ({BTC})</option>
                                <option value='Ethereum'>Ethereum ({ETH})</option>
                                <option value='BtcCash'>BTC Cash ({BtcCash})</option>
                                <option value='DASH'>Dash ({Dash})</option>
                                <option value='Aave'>Aave ({Aave})</option>
                                <option value='Ripple'>Ripple ({Ripple})</option>
                                <option value='Tron'>Tron ({Tron})</option>
                                <option value='BNB'>BNB ({BNB})</option>

                    </select>
                </div>
            </div>

            <div>
                <TextInput type='number' value={sellAmount} topLabel='How much would you like to sell ?'
                           label={'₦'} name={'amount'} placeHolder='How much crypto?'
                           handleChange={e => setSellAmount(e.target.value)}/>
            </div>

            <button className='BuyCryptoBtn' type='submit'>
                {
                    loadingData ? 'loading...' : ( <><FaShoppingBasket/> Proceed to sell </>)
                }
            </button>
        </form>
    );
};

SellTab.propTypes = {
    data: PropTypes.object.isRequired,
    sellCryptoFunc: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})
const mapActionsToProps = {
    sellCryptoFunc,
}

export default connect(mapStateToProps, mapActionsToProps) (SellTab);
