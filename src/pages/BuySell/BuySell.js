import React from 'react';
import Menu from "../../components/Menu";
import {motion} from "framer-motion";
import Notification from "../../components/Notification";

const pageAnimation = {
    type:"spring",
}


const mobPageTransition = {

    in:{
        opacity:1,
        x:0,
    },
    out:{
        opacity:0,
        x:"10vw",
    }
}

const pageTransition = {

    in:{
        opacity:1,
        y:0
    },
    out:{
        opacity:0,
        y:"-10vh",
    }
}



const BuySell = () => {
    return (
        <div className='app'>
            <Menu/>

            <motion.div exit="out" initial="out" animate="in" variants={pageTransition} className='BuySell'>

                <Notification/>
       </motion.div>


        </div>
    );
};

export default BuySell;
