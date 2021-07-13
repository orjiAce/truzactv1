import React, {useEffect, useState, useMemo} from 'react';
import axios from 'axios'
import NumberFormat from "react-number-format";
import Dropdown from './DropDown'
import {Tooltip} from "@chakra-ui/react"
import MyCryptoChart from "./CryptoChart";
import MyCryptoCharts from "./CryptoChart";

const cryptoList = [
    {
        key: 'Bitcoin',
        text: 'BTC',
        value: 'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=10',
        image:  'https://app.roqqu.com/static/media/btc.d9c1768c.png',
    },
    {
        key: 'Ethereum',
        text: 'ETH',
        value: 'https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=10',
        image: 'https://app.roqqu.com/static/media/eth.73579dcc.png'
    },
    {
        key: 'Aave',
        text: 'Aave',
        value: 'https://min-api.cryptocompare.com/data/histoday?fsym=AAVE&tsym=USD&limit=10',
        image: 'https://aave.com/static/media/aave.aadf289d.svg',
    },
  /*  {
        key: 'TRON',
        text: 'TRON',
        value: 'https://min-api.cryptocompare.com/data/histoday?fsym=CTE&tsym=USD&limit=10',
        image: 'https://app.roqqu.com/static/media/xrp.6684b41b.png',
    },*/{
        key: 'BITCOIN CASH',
        text: 'BTC CASH',
        value: 'https://min-api.cryptocompare.com/data/histoday?fsym=BCH&tsym=USD&limit=10',
        image: 'https://app.roqqu.com/static/media/eos.5929c6f7.png',
    },
]

const PriceHistory = () => {

    const [priceData, setPriceData] = useState([])
    const [todayPrice, setTodayPrice] = useState(new Map());
    const [value, setValue] = useState('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=5');
    const [cryptoName, setCryptoKey] = useState('Bitcoin');


    const getData = (url) => {

        axios.get(url)
            .then((res) => {

                setPriceData(res.data.Data);
                console.log(priceData)

                // console.log(res.data.Data.slice(-1)[0])
                setTodayPrice(res.data.Data.slice(-1)[0])
                console.log(res.data.Data.slice(-1)[0])
            }).catch((err) => {
            console.log(err)
        })

    }


    useMemo( () => {
        getData(value);

    }, [value])

    // console.log(todayPrice)
    const increase = todayPrice.high - todayPrice.low;
    const priceChange = increase / 100

    const onChange = (event) => {

      //  console.log(event.target.value)

    };


    return (
        <div className='priceHistory'>

            <div className='price'>
             {/*   <div className='cryptoLogo'>
                    <img alt='btc logo' src='https://app.roqqu.com/static/media/btc.d9c1768c.png'/>
                </div>*/}
                <Dropdown
                    placeholder="Select Vegetable"
                    value={value}
                    cryptoName={cryptoName}
                    handleName={v => setCryptoKey(v)}
                    onChange={v => setValue(v)}
                    options={cryptoList}
                />

                <br/>
                <div className='amount'>

                    <NumberFormat value={todayPrice.high} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
                </div>
                <div className={priceChange > 1 ? 'priceChangeUp' : 'priceChangeDown'}>


                    {priceChange.toFixed(2)}%
                </div>

            </div>

          <div className='chart'>
               {/* {
                    priceData.map((({time, low, high}, index) => (

                        <Tooltip key={index} hasArrow label={high} bg="blue.600">
                            <div className='bars'
                                 style={{height: (Math.round(high * 100) / todayPrice.high + '%')}}>
                                <div className='barBatch'>
                                    ${high}
                                </div>
                            </div>
                        </Tooltip>

                    )))
                }
*/}
<MyCryptoCharts chartData={priceData}/>

            </div>

        </div>

    );
};

export default PriceHistory;
