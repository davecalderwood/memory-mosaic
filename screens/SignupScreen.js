import { useState, useContext } from 'react';
import { Alert } from 'react-native'
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay'
import { AuthContext } from '../store/AuthContext';

function SignupScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    async function signupHandler({ email, password }) {
        setIsAuthenticating(true);

        try {
            const token = await createUser(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert('Authentication Failed', 'Could not create user, please check your inputs and try again')
        }

        setIsAuthenticating(false);
    }

    if (isAuthenticating) {
        return <LoadingOverlay />
    }

    return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;