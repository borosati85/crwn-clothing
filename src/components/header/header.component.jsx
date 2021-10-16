import React from 'react';
import './header.styles.scss';
import { ReactComponent as Logo } from './crown.svg';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';


const Header = ( {currentUser} ) => {
    return (
        <div className='header'>
            <div className='logo-container'>
                <Link to='/'>
                    <Logo />   
                </Link>
            </div>
            <div className='options'>
                <Link className='option' to='/shop'>SHOP</Link>
                <Link className='option' to='/contacts'>CONTACT</Link>
                {
                    currentUser ?
                    <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className='option' to='/signin'>SIGN IN</Link>
                }
                <CartIcon />                
            </div>
            <CartDropDown />
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);