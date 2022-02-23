import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './signin.styles.scss';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setUserCredentials] = useState({email: '', password: ''});

    const {email, password} = userCredentials;

    const handleSubmit = event => {
        event.preventDefault();
        emailSignInStart({email, password});
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value})
    }

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form>
                <FormInput
                    type='email' 
                    name='email' 
                    label='email' 
                    value={email} 
                    onChange={handleChange} 
                    required>
                </FormInput>
                <FormInput 
                    type='password'
                    name='password'
                    label='password'
                    value={password}
                    onChange={handleChange}
                    required>
                </FormInput>
                <div className='button'>
                    <CustomButton type='button' onClick={handleSubmit}>Sign In</CustomButton>
                    <CustomButton type='button' isGoogleSignin onClick={googleSignInStart}>Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    emailSignInStart: emailAndPassword => dispatch(emailSignInStart(emailAndPassword)),
    googleSignInStart: ()=> dispatch(googleSignInStart())
})

export default connect(null,mapDispatchToProps)(SignIn);