import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

//takes a wrapped component, and returns a new component
const WithSpinner = WrappedComponent => {
    const Spinner = ({ isLoading, ...otherProps}) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer/>
            </SpinnerOverlay>
        )
        :
        <WrappedComponent {...otherProps} />
    }
    return Spinner;
}
export default WithSpinner;