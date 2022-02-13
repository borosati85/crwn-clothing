import React from 'react';
import SignIn from '../../components/signin/signin.component';
import SignUp from '../../components/signup/signup.component'
import './SigninPage.styles.scss';

const SignInPage = () => {
    return (
        <div className='sign-in-and-sign-up'>    
            <SignIn />
            <SignUp />
        </div>
    )
}

export default SignInPage;