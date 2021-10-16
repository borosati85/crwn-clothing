import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './signin.styles.scss'
import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    hanandleSubmit = event => {
        event.preventDefault();
        this.setState({email: '', password:''})
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value})
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form>
                    <FormInput
                        type='email' 
                        name='email' 
                        label='email' 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        required>
                    </FormInput>
                    <FormInput 
                        type='password'
                        name='password'
                        label='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        required>
                    </FormInput>
                    <div className='button'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton type='button' isGoogleSignin onClick={signInWithGoogle}>Sign In with Google</CustomButton>
                    </div>
                </form>
            </div>

        )
    }

}

export default SignIn;