import React, { useState } from 'react';
import FormInput from '../form-input/Form-input';
import CustomButton from '../custom-button/Custom-button';
import './sign-in.styles.scss';

import { signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = () => {
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const { email, password } = state;

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventdefault();

        setState({ email: '', password: '' })
    }

    return (
        <div className='sign-in'>
            <h2 className='title'>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    value={email}
                    name='email'
                    handleChange={handleChange}
                    label='email'
                    required />

                <FormInput
                    type="password"
                    value={password}
                    name='password'
                    handleChange={handleChange}
                    label='password'
                    required />

                <div className="buttons">
                    <CustomButton type="submit" >Sign in</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn;