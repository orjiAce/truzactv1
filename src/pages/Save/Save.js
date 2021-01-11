import React, {useState} from 'react';
import './Save.scss'
import '../../Style/Responsive/Responsive.Save.scss'
import Menu from "../../components/Menu";
import {motion} from "framer-motion";
import Notification from "../../components/Notification";

import {Box, Badge, Divider, List, ListItem, ListIcon,Switch} from "@chakra-ui/react"
import Footer from "../../components/Footer";

import TextInput from "../../components/TextInput";

import {CgLock} from "react-icons/cg";
import brandLogo from "../../assets/img/Truzact logo white horinzontal.png";
import MobTop from "../../components/MobTop";
import MobileNav from "../../components/MobNav";
import Modal from "../../components/Modal";
import {MdSettings, MdDateRange} from "react-icons/md";


const mobPageTransition = {

    in: {
        opacity: 1,
        x: 0,
    },
    out: {
        opacity: 0,
        x: "10vw",
    }
}

const pageTransition = {

    in: {
        opacity: 1,
        y: 0
    },
    out: {
        opacity: 0,
        y: "-10vh",
    }
}

const InnerTransition = {

    in: {
        opacity: 1,
        x: 0
    },
    out: {
        opacity: 0,
        x: "-50vw",
    }
}


const Save = (props) => {

    //tpo lock money
    const [amount, setAmount] = useState('')
    const [duration, setDuration] = useState('')
    const [lockPeriod, setLockPeriod] = useState(null)
    const [payableAmount, setPayableAmount] = useState('')

    const [modalOpen, setModalOpen] = useState(false)


    const SavingOptions = [
        {
            duration: '1 Month',
            message: 'Earn 0.8% for the duration, paid monthly',
            time: 'monthly',
            percentage: 0.8,
            period: 1
        },
        {
            duration: '3 Month',
            message: 'Earn 3% for the duration, paid monthly',
            time: 'quarterly',
            percentage: 3,
            period: 3
        },
        {
            duration: '6 Month',
            message: 'Earn 7% for the duration, paid monthly',
            time: 'semiannual',
            percentage: 7,
            period: 6
        },
        {
            duration: '12 Month',
            message: 'Earn 15% for the duration, paid monthly',
            time: 'annually',
            percentage: 15,
            period: 12
        }
    ]

    const validateName = (e, duration, period, percentage) => {
        e.preventDefault()

        //calculate total amount plus percentage

        const percentageAmount = (amount / 100) * percentage
        const a = percentageAmount
            const newPayableAmount =  parseInt(amount)+ parseInt(a)

        console.log(amount)
        console.log(newPayableAmount)
        console.log(percentageAmount)
        console.log(a)


        const currentDate = new Date();

       /* const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
        const currentYear = currentDate.getFullYear();

        const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
*/
        //properly format date
        const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });


//
        const d = currentDate.getDate();
        currentDate.setMonth(currentDate.getMonth() + +period);
        if (currentDate.getDate() !== d) {
            currentDate.setDate(0);
        }
        //console.log(addMonths(currentDate, period))
//console.log(duration)
        setModalOpen(!modalOpen)
        // setLockPeriod(currentDate)
        setDuration(duration)
        setPayableAmount(newPayableAmount)


//console.log(currentDate)
        setLockPeriod(longEnUSFormatter.format(currentDate));

    }




    const addMonths = (date, months) => {
        var d = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() !== d) {
            date.setDate(0);
        }
        return date;
    }

    const modalToggle = () => {

        setModalOpen(!modalOpen)
    }


    return (
        <div className="App">

            <Modal isOpen={modalOpen} onClose={modalToggle} myClassName='saveModalContainer'>
                <div className='confirmSaving'>
                    <div className='confirmModalContent'>


                        <div className='title'>
                            Confirm savings of ₦{amount}
                        </div>
                        <Divider orientation="horizontal"/>
                        <List spacing={3}>
                            <ListItem>
                                <ListIcon as={MdDateRange} color="green.500"/>
                                <span>Duration: </span> {duration}
                            </ListItem>
                            <ListItem>
                                <ListIcon color="green.500"/>
                                <span>Release date: </span> {lockPeriod}
                            </ListItem>
                            <ListItem>
                                <ListIcon color="blue.500"/>
                                <span>You get:</span> ₦{payableAmount}
                            </ListItem>
                            {/* You can also use custom icons from react-icons */}
                            <ListItem>
                                <small>
                               The funds will be placed under lock and keys for the duration and will
                                become available for withdrawal on the release date, requesting for it sooner will attract a 3% fee
                                </small>
                            </ListItem>
                            <ListItem>
                               <span>By clicking the button below you accept this terms and condition</span>
                            </ListItem>
                            <button className='sendBtn'>
                                Lock <CgLock/>
                            </button>
                        </List>
                    </div>
                </div>
            </Modal>
            <Menu/>
            <motion.div exit="out" initial="out" animate="in" variants={pageTransition} className='savePage'>
                <Notification/>

                <div className='savingWrap'>
                    <div className='saveNote'>
                        <Badge variant='subtle' px="1" bg="brand.500" color='white'>Savings</Badge> help you lock down funds in crypto, unaccessible by no one else but you, free from devaluation and depreciation, you also earn monthly up to 15% per anum.
                    </div>

                    <Box as="button" borderRadius="md" bgGradient="linear(to-r, brand.100,purple.500)" color="white" px={4} h={8} className='optionNote'>
                        Options that fit all budgets
                    </Box>
                    <div className='optionsWrap'>


                        {
                            SavingOptions.map((({duration, message, time, period, percentage}, index) => (


                                <Box maxW="sm" borderWidth="2px" key={index} borderRadius="lg" className='optionBox'
                                     overflow="hidden">

                                    <Box p="6">
                                        <Box d="flex" alignItems="baseline">
                                            <Badge variant='outline' px="2" colorScheme="blue">
                                                Duration
                                            </Badge>
                                            <Box
                                                color="gray.500"
                                                fontWeight="semibold"
                                                letterSpacing="wide"
                                                fontSize="xs"
                                                textTransform="uppercase"
                                                ml="2"
                                            >
                                                {
                                                    duration
                                                }
                                            </Box>
                                        </Box>

                                        <Box
                                            mt="1"
                                            fontWeight="semibold"
                                            as="h5"
                                        >
                                            {message}
                                        </Box>

                                        <Box>

                                            <Box as="span" color="gray.600" fontSize="sm">
                                                <small>  {time} </small>
                                            </Box>
                                        </Box>


                                        <form method='post' action='' className='saveForm'
                                              onSubmit={(event) => validateName(event, duration, period, percentage)}>

                                            <TextInput label='₦' type='number' placeHolder='Amount'
                                                       handleChange={e => setAmount(e.target.value)} required/>
                                            <Box d="flex" mt="2" alignItems="left">

                                                <button className='lockMoneyBtn' type='submit'>
                                                    Save <CgLock/>
                                                </button>
                                            </Box>
                                        </form>


                                    </Box>
                                </Box>

                            )))
                        }
                    </div>


                </div>
                <Footer/>
            </motion.div>
            <div className='mobDash'>

                <div className='mobileHeader'>
                    <section className='brandLogo'>
                        <img src={brandLogo} alt='brand logo'/>
                    </section>
                </div>
                <MobTop/>
                <motion.div exit="out" initial="out" animate="in" variants={mobPageTransition} className='mobContent'>

                    <div className='saveNote'>
                        <Badge variant='subtle' px="1" bg="brand.500" color='white'>Savings</Badge> help you lock down funds in crypto, unaccessible by no one else but you, free from devaluation and depreciation, you also earn monthly up to 15% per anum.
                    </div>

                    <Box as="button" borderRadius="md" bgGradient="linear(to-r, brand.100,purple.500)" color="white" px={4} h={8} className='optionNote'>
                        Options that fit all budgets
                    </Box>
                    <div className='optionsWrap'>


                        {
                            SavingOptions.map((({duration, message, time, period, percentage}, index) => (


                                <Box maxW="sm" borderWidth="2px" key={index} borderRadius="lg" className='optionBox'
                                     overflow="hidden">

                                    <Box p="6">
                                        <Box d="flex" alignItems="baseline">
                                            <Badge variant='outline' px="2" colorScheme="blue" color='brand.100'>
                                                Duration
                                            </Badge>
                                            <Box
                                                color="gray.500"
                                                fontWeight="semibold"
                                                letterSpacing="wide"
                                                fontSize="xs"
                                                textTransform="uppercase"
                                                ml="2"
                                            >
                                                {
                                                    duration
                                                }
                                            </Box>
                                        </Box>

                                        <Box
                                            mt="1"
                                            fontWeight="semibold"
                                            as="h5"
                                        >
                                            {message}
                                        </Box>

                                        <Box>

                                            <Box as="span" color="gray.600" fontSize="sm">
                                                <small>  {time} </small>
                                            </Box>
                                        </Box>


                                        <form method='post' action='' className='saveForm'
                                              onSubmit={(e) => validateName(e, duration, period, percentage)}>

                                            <TextInput label='₦' handleChange={e => setAmount(e.target.value)}
                                                       type='number' placeHolder='Amount' required/>
                                            <Box d="flex" mt="2" alignItems="left">

                                                <button className='lockMoneyBtn' type='submit'>
                                                    Save <CgLock/>
                                                </button>
                                            </Box>
                                        </form>


                                    </Box>
                                </Box>

                            )))
                        }
                    </div>


                </motion.div>

            </div>
            <MobileNav/>
        </div>
    );
};


export default Save;
