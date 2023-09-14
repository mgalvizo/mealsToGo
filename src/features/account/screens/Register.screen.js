import React, { useState, useContext } from 'react';
import { ActivityIndicator } from 'react-native-paper';

import Spacer from '../../../components/Spacer/Spacer.component';
import Text from '../../../components/Typography/Text.component';
import { COLORS } from '../../../infrastructure/theme/colors';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import {
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    ErrorContainer,
    Title,
} from '../components/Account.styles';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { onRegister, isLoading, error } = useContext(AuthenticationContext);

    return (
        <AccountBackground>
            <AccountCover />
            <Title>Meals To Go</Title>
            <AccountContainer>
                <AuthInput
                    label="E-mail"
                    value={email}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={enteredEmail => setEmail(enteredEmail)}
                />
                <Spacer size="large">
                    <AuthInput
                        label="Password"
                        value={password}
                        textContentType="password"
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={enteredPassword =>
                            setPassword(enteredPassword)
                        }
                    />
                </Spacer>
                <Spacer size="large">
                    <AuthInput
                        label="Confirm Password"
                        value={confirmPassword}
                        textContentType="password"
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={enteredConfirmPassword =>
                            setConfirmPassword(enteredConfirmPassword)
                        }
                    />
                </Spacer>
                {error && (
                    <ErrorContainer size="large">
                        <Text variant="error">{error}</Text>
                    </ErrorContainer>
                )}
                <Spacer size="large">
                    {!isLoading ? (
                        <AuthButton
                            icon="email"
                            mode="contained"
                            onPress={() =>
                                onRegister(email, password, confirmPassword)
                            }
                        >
                            Register
                        </AuthButton>
                    ) : (
                        <ActivityIndicator
                            animating
                            color={COLORS.brand.primary}
                        />
                    )}
                </Spacer>
            </AccountContainer>
            <Spacer size="large">
                <AuthButton
                    mode="contained"
                    onPress={() => navigation.goBack()}
                >
                    Back
                </AuthButton>
            </Spacer>
        </AccountBackground>
    );
};

export default Register;
