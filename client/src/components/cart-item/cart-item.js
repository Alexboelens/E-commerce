import React from 'react';

import { CartItemContainer, ItemDetailsContainer, ItemImage, ItemName } from './cart-item.styles'

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
    return (
        <CartItemContainer>
            <ItemImage src={imageUrl} alt='item' />
            <ItemDetailsContainer className='item-details'>
                <ItemName className='name'>{name}</ItemName>
                <span>{quantity} x ${price}</span>
            </ItemDetailsContainer>
        </CartItemContainer>
    )
}

export default CartItem;