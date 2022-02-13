import React from 'react';
import { clearItemFromCart } from '../../redux/cart/cart.actions'
import { connect } from 'react-redux';
import { addItem, removeItem } from '../../redux/cart/cart.actions'
import './checkout-item.styles.scss';

const CheckoutItem = ({ item, clearItemFromCart, addItem, removeItem }) => {
    const { name, quantity, price, imageUrl } = item;
    return (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='product-picture'/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div className='arrow' onClick={()=>removeItem(item)}>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={()=>addItem(item)}>&#10095;</div>
        </span>
        <span className='price'>${price}</span>
        <div className='remove-button' onClick={()=> clearItemFromCart(item)}>&#10005;</div>
    </div>
    )
}

const mapDispatchToProps = dispatch => ({
    clearItemFromCart: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);