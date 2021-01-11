import React, { useEffect, useState, useRef } from "react";
import '../Style/Dropdown.scss'
const Dropdown = ({ value, cryptoName, options, handleImg, placeholder = "Select", onChange }) => {
    const node = useRef();

    const [open, setOpen] = useState(false);
const [crypto, setCrypto] = useState(cryptoName)
const [cryptoImage, setCryptoImage] = useState('https://app.roqqu.com/static/media/btc.d9c1768c.png')
    const handleClickOutside = e => {
        console.log("clicking anywhere");
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setOpen(false);
    };

    const handleChange = (selectedValue, selectedKey,selectedCryptoImage) => {
        onChange(selectedValue);
        setCrypto(selectedKey)
        setCryptoImage(selectedCryptoImage)
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div ref={node} className="dropdown">
            <button className="dropdown-toggler" onClick={e => setOpen(!open)}>
              <img src={cryptoImage} className='cryptoImg'/> {crypto}
            </button>
            {open && (
                <ul className="dropdown-menu">
                    {options.map(opt => (
                        <li className="dropdown-menu-item" onClick={e => handleChange(opt.value, opt.key, opt.image)}>
                          <img alt='crypto' className='cryptoImg' src={opt.image}/>  {opt.key}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
