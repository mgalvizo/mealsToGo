import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import styled from 'styled-components/native';

import Spacer from '../../../components/Spacer/Spacer.component';
import Text from '../../../components/Typography/Text.component';
import SafeArea from '../../../components/Utils/SafeArea.component';
import { COLORS } from '../../../infrastructure/theme/colors';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

const TransparentSafeArea = styled(SafeArea)`
    background-color: transparent;
`;

const SettingsBackground = styled.ImageBackground.attrs({
    source: require('../../../../assets/home_bg.jpg'),
})`
    position: absolute;
    height: 100%;
    width: 100%;
`;

const SettingsItem = styled(List.Item)`
    padding: ${({ theme }) => theme.SPACE[3]};
    background-color: rgba(255, 255, 255, 0.5);
`;
const AvatarContainer = styled.View`
    align-items: center;
`;

const SettingsScreen = ({ navigation }) => {
    const { onLogout, user } = useContext(AuthenticationContext);
    const [photo, setPhoto] = useState(null);

    const getProfilePicture = async currentUser => {
        const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
        setPhoto(photoUri);
    };

    useFocusEffect(
        useCallback(() => {
            getProfilePicture(user);
        }, [user]),
    );

    return (
        <SettingsBackground>
            <TransparentSafeArea>
                <AvatarContainer>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Camera')}
                    >
                        {!photo && (
                            <Avatar.Icon
                                size={180}
                                icon="human"
                                color={COLORS.brand.primary}
                            />
                        )}
                        {photo && (
                            <Avatar.Image
                                size={180}
                                source={{ uri: photo }}
                                color={COLORS.brand.primary}
                            />
                        )}
                    </TouchableOpacity>
                    <Spacer position="top" size="large">
                        <Text variant="label">{user.email}</Text>
                    </Spacer>
                </AvatarContainer>
                <List.Section>
                    <SettingsItem
                        title="Favourites"
                        description="View your favourites"
                        left={props => (
                            <List.Icon
                                {...props}
                                color={COLORS.ui.error}
                                icon="heart"
                            />
                        )}
                        onPress={() => navigation.navigate('Favourites')}
                    />
                    <SettingsItem
                        title="Payment"
                        left={props => (
                            <List.Icon
                                {...props}
                                color={COLORS.ui.secondary}
                                icon="cart"
                            />
                        )}
                        onPress={() => null}
                    />
                    <SettingsItem
                        title="Past Orders"
                        left={props => (
                            <List.Icon
                                {...props}
                                color={COLORS.ui.secondary}
                                icon="history"
                            />
                        )}
                        onPress={() => null}
                    />
                    <SettingsItem
                        title="Logout"
                        left={props => (
                            <List.Icon
                                {...props}
                                color={COLORS.ui.secondary}
                                icon="door"
                            />
                        )}
                        onPress={onLogout}
                    />
                </List.Section>
            </TransparentSafeArea>
        </SettingsBackground>
    );
};

export default SettingsScreen;
