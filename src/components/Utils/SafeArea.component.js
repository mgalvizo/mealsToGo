import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

/* Guard for iOS, StatusBar does NOT exist on iOS */
const SafeArea = styled.SafeAreaView`
    flex: 1;
    ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px;`}
    background-color: ${({ theme }) => theme.COLORS.bg.primary};
`;

export default SafeArea;
