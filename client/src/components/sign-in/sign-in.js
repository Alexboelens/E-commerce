import React, { useState } from 'react';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import { SignInContainer, ButtonsContainer, TitleContainer } from './sign-in.styles';


const SignIn = () => {
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const { email, password } = state;

    const handleChange = e => setState({ ...state, [e.target.name]: e.target.value })


    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            setState({ email: '', password: '' })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SignInContainer>
            <TitleContainer>I already have an account</TitleContainer>
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

                <ButtonsContainer>
                    <CustomButton type="submit" >Sign in</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignIn;

