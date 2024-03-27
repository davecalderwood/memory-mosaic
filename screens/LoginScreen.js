import { useState, useContext } from 'react';
import { Alert } from 'react-native'
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay'
import { login } from '../util/auth';
import { AuthContext } from '../store/AuthContext';

function LoginScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    async function loginHandler({ email, password }) {
        setIsAuthenticating(true);

        try {
            const token = await login(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert('Authentication Failed', 'Could log in, please check your inputs and try again')
        }
        setIsAuthenticating(false);
    }

    if (isAuthenticating) {
        return <LoadingOverlay />
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;