import React from 'react';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart-selectors';
import { selectCurrentUser } from '../../redux/user/user-selector';

import { auth } from '../../firebase/firebase.utils';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = ({ currentUser, hidden }) => {
    return (
        <HeaderContainer>

            <LogoContainer to='/'>
                <Logo className='logo' />
            </LogoContainer>

            <OptionsContainer>
                <OptionLink to='/shop'>SHOP</OptionLink>
                <OptionLink to='/contact'>CONTACT</OptionLink>
                {
                    currentUser
                        ? <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
                        : <OptionLink to='/signin' className='option'>SIGN IN</OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {!hidden && <CartDropdown />}
        </HeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);