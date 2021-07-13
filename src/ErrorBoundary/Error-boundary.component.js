import React from 'react';
import './error-boundary.scss'

import {Link} from "react-router-dom";

//this component handles errors in any of our pages wrapped in the Suspense
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return(
                <div className="ErrorImageOverlay">
                    <div className='ErrorImageContainer'>


                    </div>
                    <h2 className='ErrorImageText'>Heyy this is broken</h2>
                    <Link to='/'>Go home</Link>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary