import React, { useContext } from 'react';
import { List, Avatar } from 'react-native-paper';
import styled from 'styled-components/native';

import Spacer from '../../../components/Spacer/Spacer.component';
import Text from '../../../components/Typography/Text.component';
import SafeArea from '../../../components/Utils/SafeArea.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

const SettingsItem = styled(List.Item)`
    padding: ${({ theme }) => theme.SPACE[3]};
`;
const AvatarContainer = styled.View`
    align-items: center;
`;

const SettingsScreen = ({ navigation }) => {
    const { onLogout, user } = useContext(AuthenticationContext);

    return (
        <SafeArea>
            <AvatarContainer>
                <Avatar.Icon size={180} icon="human" color="#2182BD" />
                <Spacer position="top" size="large">
                    <Text variant="label">{user.email}</Text>
                </Spacer>
            </AvatarContainer>
            <List.Section>
                <SettingsItem
                    title="Favourites"
                    description="View your favourites"
                    left={props => (
                        <List.Icon {...props} color="black" icon="heart" />
                    )}
                    onPress={() => navigation.navigate('Favourites')}
                />
                <SettingsItem
                    title="Logout"
                    left={props => (
                        <List.Icon {...props} color="black" icon="door" />
                    )}
                    onPress={onLogout}
                />
            </List.Section>
        </SafeArea>
    );
};

export default SettingsScreen;
