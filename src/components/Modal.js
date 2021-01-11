import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import '../Style/Modal.scss'



const CloseButton = styled.svg`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 18px;
  top: 8px;
  cursor: pointer;
  background-color:#c7c7c8;
  padding:10px;
  border-radius:100%
`

const Title = styled.h5`
  text-align: center;
  margin-top: 6px;
  margin-left: 6px;
`



const pageAnimation = {
    type:"spring",
}

const modalVariant = {
    initial: { opacity: 0 },
    isOpen: { opacity: 1 },
    exit: { opacity: 0 },
}
const containerVariant = {
    initial: { top: '-50%', transition: { type: 'spring' } },
    isOpen: { top: '50%' },
    exit: { top: '-50%' },
}
const Modal = ({ title, onClose, children, width, height, myClassName, isOpen, selectedFile }) => {

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className='modalOverlay'
                    initial={'initial'}
                    animate={'isOpen'}
                    exit={'exit'}
                    variants={modalVariant}
                >
                    <motion.div className={`modalContainer ${myClassName}`} variants={containerVariant}>
                        <CloseButton
                            onClick={onClose}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20.39 20.39"
                        >
                            <title>close</title>
                            <line
                                x1="19.39"
                                y1="19.39"
                                x2="1"
                                y2="1"
                                fill="none"
                                stroke="#5c3aff"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                            />
                            <line
                                x1="1"
                                y1="19.39"
                                x2="19.39"
                                y2="1"
                                fill="none"
                                stroke="#5c3aff"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                            />
                        </CloseButton>
                        <Title>{title}</Title>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal