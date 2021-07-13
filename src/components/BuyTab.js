import React, { useState} from 'react';
import {Badge, HStack, useRadioGroup, useToast} from "@chakra-ui/react";
import RadioCard from "./RadioBtn";
import {FaBitcoin, FaEthereum} from "react-icons/fa";
import TextInput from "./TextInput";
import PropTypes from "prop-types";
import {buyCryptoFunc} from "../redux/actions/dataActions";
import {connect, useDispatch} from 'react-redux'
import {CLEAR_CRYPTO_ERRORS} from "../redux/types";
const BuyTab = (props) => {
    const dispatch = useDispatch();
    const toast = useToast()
    const options = ["BTC", "ETH"]
    const [crypTo, setCrypto] = useState('BTC')
    const [amount, setAmount] = useState('0')
    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "crypto",
        defaultValue: "BTC",
        onChange: console.log,
    })



    const group = getRootProps();

    const {member: {ID}} = props.user.userData
    const {loadingData} = props.data
    const {buyCryptoFunc} = props

    const buyCryptoNow = async (event) =>{
        event.preventDefault()
        const cryptoData = new FormData()
        cryptoData.append('UserID', ID)
        cryptoData.append('Crypto', crypTo)
        cryptoData.append('Amount', amount)



        if (amount < 500) {
            toast({
                title: "Amount too small",
                description: 'Minimum buy amount is 500',
                position: "top",
                status: "info",
                duration: 5000,
                isClosable: true,
            })
            return
        }
       await buyCryptoFunc(cryptoData)


            dispatch({
                type: CLEAR_CRYPTO_ERRORS
            })

        //console.log(loadingData)
    }



    return (
        <form className='buyWrap' onSubmit={buyCryptoNow} method='post' encType='multipart/form-data'>


            <div className='title'>
                Which digital currency do you want to buy?
            </div>
            <div className='checkWrap'>
                <HStack {...group} onChange={e => setCrypto(e.target.value)}>
                    {options.map((value) => {
                        const radio = getRadioProps({value})
                        return (
                            <RadioCard key={value} {...radio}
                                       disabled={value !== 'BTC'}>
                                {value === 'BTC' ? (<div className='checkCrypto'>
                                    <FaBitcoin/> &nbsp; BITCOIN</div>) : (
                                    <div className='checkCrypto'>
                                        <FaEthereum/> &nbsp; ETH  &nbsp;
                                    </div>)}
                            </RadioCard>
                        )
                    })}
                </HStack>


            </div>
            <div>
                <Badge variant='subtle' px="1" bg="blue.500"
                       color='white'> Hello</Badge> <small>Other crypto to be available
                soon!</small>
            </div>
            <div>
                <TextInput type='number' value={amount} topLabel='How much crypto?'
                           label={'₦'} name={'amount'} placeHolder='How much crypto?'
                           handleChange={e => setAmount(e.target.value)}/>
            </div>

            <button className='BuyCryptoBtn' type='submit'>
                {
                    loadingData  === true ? 'loading...' : ( 'Buy Now')
                }
            </button>
        </form>
    );
};
BuyTab.propTypes = {
    data: PropTypes.object.isRequired,
    buyCryptoFunc: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})
const mapActionsToProps = {
    buyCryptoFunc,
}

export default connect(mapStateToProps, mapActionsToProps) (BuyTab);
