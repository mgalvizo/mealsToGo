import LottieView from 'lottie-react-native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import Spacer from '../../../components/Spacer/Spacer.component';
import { SPACE } from '../../../infrastructure/theme/spacing';
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
            <View style={styles.animationWrapper}>
                <LottieView
                    key="animation"
                    autoPlay
                    loop
                    resizeMode="cover"
                    source={require('../../../../assets/watermelon.json')}
                />
            </View>
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

const styles = StyleSheet.create({
    animationWrapper: {
        width: '100%',
        height: '40%',
        position: 'absolute',
        top: 30,
        padding: SPACE[2],
    },
});
