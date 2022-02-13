import React from 'react';
import { CartItemContainer, ImgContainer, ItemDetails, NameContainer } from './cart-item.styles'

const CartItem = ({item: {imageUrl, price, name, quantity }}) => (
    <CartItemContainer>
        <ImgContainer src={imageUrl} alt='product'/>
        <ItemDetails>
            <NameContainer>{name}</NameContainer>
            <span className='price'>{quantity} x ${price}</span>
        </ItemDetails>
    </CartItemContainer>
)

export default CartItem;