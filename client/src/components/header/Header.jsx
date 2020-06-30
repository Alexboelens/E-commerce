import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { connect } from 'react-redux';
import './Header.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart-selectors';
import { selectCurrentUser } from '../../redux/user/user-selector';

import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser, hidden }) => {
    return (
        <div className='header'>

            <Link to='/' className='logo-container'>
                <Logo className='logo' />
            </Link>

            <div className="options">
                <Link to='/shop' className='option'>SHOP</Link>
                <Link to='/contact'>CONTACT</Link>
                {
                    currentUser
                        ? <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                        : <Link to='/signin' className='option'>SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {!hidden && <CartDropdown />}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);