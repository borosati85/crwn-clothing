import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './signin.styles.scss';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;
        emailSignInStart({email, password});
        this.setState({email: '', password:''})
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value})
    }

    render() {
        const { googleSignInStart } = this.props;
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
                        <CustomButton type='button' onClick={this.handleSubmit}>Sign In</CustomButton>
                        <CustomButton type='button' isGoogleSignin onClick={googleSignInStart}>Sign In with Google</CustomButton>
                    </div>
                </form>
            </div>

        )
    }

}

const mapDispatchToProps = dispatch => ({
    emailSignInStart: emailAndPassword => dispatch(emailSignInStart(emailAndPassword)),
    googleSignInStart: ()=> dispatch(googleSignInStart())
})

export default connect(null,mapDispatchToProps)(SignIn);