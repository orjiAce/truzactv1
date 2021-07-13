import React from 'react';

const Portfolio = ({amount, name, cryptoIcon, action}) => {
    return (
        <div className='portfolioBox'>
<section className='cryptoIcon'>
    <section className='cryptoIconWrap'>
        <img src={cryptoIcon} alt="" />
    </section>

</section>
            <section className="others">
                <section className='crypto'>
                    {name}
                </section>
                <section className='amount'>
                    {amount}
                </section>
            </section>
        </div>
    );
};

export default Portfolio;
