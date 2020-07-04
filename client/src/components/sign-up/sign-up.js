import React, { useState } from 'react';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { SignUpContainer, TitleContainer } from './sign-up.styles';

const SignUp = () => {
    const [state, setState] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const { displayName, email, password, confirmPassword } = state;

        if (password !== confirmPassword) {
            alert(`Passwords don't match`);
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            createUserProfileDocument(user, { displayName });

            setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (err) {
            console.log(err)
        }
    }

    const { displayName, email, password, confirmPassword } = state;

    return (
        <SignUpContainer>
            <TitleContainer>I do not have an account</TitleContainer>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit} className='sign-up-form'>
                <FormInput
                    type="text"
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Name to display'
                    required
                />

                <FormInput
                    type="email"
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='E-mail address'
                    required
                />

                <FormInput
                    type="password"
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='password'
                    required
                />

                <FormInput
                    type="password"
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm password'
                    required
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </SignUpContainer>
    )
}

export default SignUp;