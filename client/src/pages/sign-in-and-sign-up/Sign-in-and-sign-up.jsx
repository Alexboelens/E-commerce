import React from 'react'
import SignIn from '../../components/sign-in/Sign-in';
import SignUp from '../../components/sign-up/Sign-up'
import './Sign-in-and-sign-up.styles.scss';

const SignInAndSignUpPage = () => {

    return (
        <div className='sign-in-and-sign-up'>
            <SignIn />
            <SignUp />
        </div>
    )
}

export default SignInAndSignUpPage;