import React from 'react';

const TextInput = ({handleChange, label, focusOut, icon, name, placeHolder, type, topLabel, handleValidation, customizeClass, value, ...otherProps}) => {
    return (
        <div className='inputWrap'>
            <div className='topLabel'>
                {topLabel}
            </div>
            <div className={`group ${customizeClass}`}>
                {
                    label ?


                        <label className='label' htmlFor={name}>
                            {label}
                        </label> : ''
                }
                <input aria-label={name} id={name} onFocus={focusOut} value={value} placeholder={placeHolder}
                       name={name} type={type} className='textInput' onKeyUp={handleValidation}
                       onChange={handleChange} {...otherProps} />

                {
                    type === 'password' ?
                        <label className='label' htmlFor={name}>
                            {icon}
                        </label>
                        : ''
                }
            </div>

        </div>
    );
};

export default TextInput;
