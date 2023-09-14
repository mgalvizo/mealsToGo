import LottieView from 'lottie-react-native';
import { Button, TextInput } from 'react-native-paper';
import styled from 'styled-components/native';

import Text from '../../../components/Typography/Text.component';
import { COLORS } from '../../../infrastructure/theme/colors';

const AccountBackground = styled.ImageBackground.attrs({
    source: require('../../../../assets/home_bg.jpg'),
})`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const AccountCover = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
`;

const AccountContainer = styled.View`
    background-color: rgba(255, 255, 255, 0.7);
    padding: ${({ theme }) => theme.SPACE[4]};
    margin-top: ${({ theme }) => theme.SPACE[2]};
`;

const AuthButton = styled(Button).attrs({
    color: COLORS.brand.primary,
})`
    padding: ${({ theme }) => theme.SPACE[2]};
`;

const AuthInput = styled(TextInput)`
    width: 300px;
`;

const Title = styled(Text)`
    font-size: 30px;
`;

const ErrorContainer = styled.View`
    max-width: 300px;
    align-items: center;
    align-self: center;
    margin-top: ${({ theme }) => theme.SPACE[2]};
    margin-bottom: ${({ theme }) => theme.SPACE[2]};
`;

export {
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    Title,
    ErrorContainer,
};
