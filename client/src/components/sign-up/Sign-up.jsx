import React, { useState } from 'react';
import './Sign-up.styles.scss';
import FormInput from '../../components/form-input/Form-input';
import CustomButton from '../custom-button/Custom-button';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

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
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your emal and password</span>

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
        </div>
    )
}

export default SignUp;