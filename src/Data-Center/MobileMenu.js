import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import {RiDashboardLine,RiUserSettingsFill} from 'react-icons/ri'
import {CgArrowsExchangeAlt} from 'react-icons/cg';
import {BiMenuAltLeft} from 'react-icons/bi';
import {IoIosWallet,IoIosHome,IoIosPower} from 'react-icons/io';
import {BsFillShieldLockFill} from 'react-icons/bs';
import {GiToken} from 'react-icons/gi';
import {FaCommentAlt} from 'react-icons/fa';


export const NavData = [
    {
        link:'dashboard',
        title:'Dashboard',
        icon:<i><RiDashboardLine className='navIcon'/></i>,
        linkClassName: 'normalLink'
    },
    {
        link:'transactions',
        title:'Transactions',
        icon:<i><CgArrowsExchangeAlt className='navIcon'/></i>,
        linkClassName: 'normalLink'
    },
    {
        link:'savings',
        title:'Savings',
        icon:<i><FontAwesomeIcon icon={faPiggyBank} className='navIcon'/></i>,
        linkClassName:'raised'
    }, {
        link:'setting',
        title:'User Setting',
        icon:<i><RiUserSettingsFill/> </i>,
        linkClassName:'normalLink'
    }, {
        link:'',
        title:'more',
        icon:<i><BiMenuAltLeft/></i>,
        linkClassName:'normalLink',
        click: true
    },
]
export const SubNavDATA = [
    {
        link:'wallets',
        title:'Wallet',
        icon:<i><IoIosWallet className='navIcon'/></i>,
        linkClassName: 'subLink'
    },
    {
        link:'security',
        title:'Security',
        icon:<i><BsFillShieldLockFill className='navIcon'/></i>,
        linkClassName: 'subLink'
    },
    {
        link:'support',
        title:'Support',
        icon:<i> <FaCommentAlt className='navIcon'/> </i> ,
        linkClassName:'subLink'
    }, {
        link:'home',
        title:'Home',
        icon:<i><IoIosHome/> </i>,
        linkClassName:'subLink'
    }, {
        link:'token',
        title:'Token',
        icon:<i><GiToken/></i>,
        linkClassName:'subLink',
        click: false
    },{
        link:'logout',
        title:'Logout',
        icon:<i><IoIosPower/></i>,
        linkClassName:'subLink',
        click: true
    },
]