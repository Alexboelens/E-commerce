import React from 'react';
import CustomButton from '../custom-button/Custom-button'
import './cart-dropdown.styles.scss'

const CardDropDown = () => {
    return (
        <div className='cart-dropdown'>
            <div className='cart-items' />
            <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

export default CardDropDown;