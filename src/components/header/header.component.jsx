import React from 'react';
import './header.styles.scss';
import { ReactComponent as Logo } from './crown.svg';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import selectCurrentUser from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './header.styles';


const Header = ({ currentUser, hidden, signOutStart }) => {
    return (
        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo />   
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>SHOP</OptionLink>
                <OptionLink className='option' to='/contacts'>CONTACT</OptionLink>
                {
                    currentUser ?
                    <OptionDiv onClick={()=> signOutStart()}>SIGN OUT</OptionDiv>
                    :
                    <OptionLink to='/signin'>SIGN IN</OptionLink>
                }
                <CartIcon />                
            </OptionsContainer>
            {
                hidden ? null : <CartDropDown/>
            }
        </HeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart: ()=> dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);