import React from 'react';

const Alert = ({Message, Title}) => {
    return (
        <div className='alertWrap'>
            <div className='alert'>
                {Message}

            </div>
        </div>
    );
};

export default Alert;
