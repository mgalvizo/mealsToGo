import { Card } from 'react-native-paper';
import styled from 'styled-components/native';

/* Write CSS, it will get translated to React Native's ecosystem */
const Icon = styled.Image`
    width: 15px;
    height: 15px;
`;

const RestaurantCard = styled(Card)`
    background-color: ${({ theme }) => theme.COLORS.bg.primary};
    width: 95%;
    align-self: center;
`;

const RestaurantCardCover = styled(Card.Cover)`
    padding: ${({ theme }) => theme.SPACE[3]};
    background-color: ${({ theme }) => theme.COLORS.bg.primary};
`;

const Address = styled.Text`
    font-family: ${({ theme }) => theme.FONTS.body};
    font-size: ${({ theme }) => theme.FONT_SIZES.caption};
`;

const Info = styled.View`
    padding: ${({ theme }) => theme.SPACE[3]};
`;

const Rating = styled.View`
    flex-direction: row;
    padding-top: ${({ theme }) => theme.SPACE[2]};
    padding-bottom: ${({ theme }) => theme.SPACE[2]};
`;

const Section = styled.View`
    flex-direction: row;
    align-items: center;
`;

const SectionEnd = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`;

export {
    Icon,
    RestaurantCard,
    RestaurantCardCover,
    Address,
    Info,
    Rating,
    Section,
    SectionEnd,
};
