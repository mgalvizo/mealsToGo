import React from 'react';

import Spacer from '../../../components/Spacer/Spacer.component';
import {
    AccountBackground,
    AccountContainer,
    AccountCover,
    AuthButton,
    Title,
} from '../components/Account.styles';

const Account = ({ navigation }) => {
    return (
        <AccountBackground>
            <AccountCover />
            <Title>Meals To Go</Title>
            <AccountContainer>
                <AuthButton
                    icon="lock-open-outline"
                    mode="contained"
                    onPress={() => navigation.navigate('Login')}
                >
                    Login
                </AuthButton>
                <Spacer size="large">
                    <AuthButton
                        icon="email"
                        mode="contained"
                        onPress={() => navigation.navigate('Register')}
                    >
                        Register
                    </AuthButton>
                </Spacer>
            </AccountContainer>
        </AccountBackground>
    );
};

export default Account;
