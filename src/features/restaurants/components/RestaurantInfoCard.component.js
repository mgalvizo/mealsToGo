import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import styled from 'styled-components/native';

import Spacer from '../../../components/spacer/Spacer.component';
import open from '../../../../assets/open';
import star from '../../../../assets/star';

const Address = styled.Text`
    /* Write CSS, it will get translated to React Native's ecosystem */
    font-family: ${props => props.theme.FONTS.body};
    font-size: ${props => props.theme.FONT_SIZES.caption};
`;

const Rating = styled.View`
    flex-direction: row;
    padding-top: ${props => props.theme.SPACE[2]};
    padding-bottom: ${props => props.theme.SPACE[2]};
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

const Title = styled.Text`
    font-family: ${props => props.theme.FONTS.heading};
    font-size: ${props => props.theme.FONT_SIZES.body};
    color: ${props => props.theme.COLORS.ui.primary};
`;

const Info = styled.View`
    padding: ${props => props.theme.SPACE[3]};
`;

const RestaurantCard = styled(Card)`
    background-color: ${props => props.theme.COLORS.bg.primary};
`;

const RestaurantCardCover = styled(Card.Cover)`
    padding: ${props => props.theme.SPACE[3]};
    background-color: ${props => props.theme.COLORS.bg.primary};
`;

const RestaurantInfo = ({ restaurant = {} }) => {
    // Example of the data to work with, API shape is different
    const {
        name = 'Some Restaurant',
        icon = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
        photos = [
            'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
        ],
        address = '100 some random street',
        isOpenNow = true,
        rating = 4,
        isClosedTemporarily = true,
    } = restaurant;

    // Create array with "rating" number of elements filled with 0
    const ratingArray = Array.from(new Array(Math.floor(rating)).fill(0));

    const renderRating = ratingArray.map(rating => {
        // Loading svg as xml
        return <SvgXml xml={star} width={20} height={20} />;
    });

    return (
        <RestaurantCard elevation={5}>
            <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
            <Info>
                <Title>{name}</Title>
                <Section>
                    <Rating>{renderRating}</Rating>
                    <SectionEnd>
                        {isClosedTemporarily && (
                            <Text variant="label" style={{ color: 'red' }}>
                                CLOSED TEMPORARILY
                            </Text>
                        )}
                        <Spacer position="left" size="large">
                            {isOpenNow && (
                                <SvgXml xml={open} width={20} height={20} />
                            )}
                        </Spacer>
                        <Spacer position="left" size="large">
                            <Image
                                source={{ uri: icon }}
                                style={{ width: 15, height: 15 }}
                            />
                        </Spacer>
                    </SectionEnd>
                </Section>
                <Address>{name}</Address>
            </Info>
        </RestaurantCard>
    );
};

export default RestaurantInfo;

const styles = StyleSheet.create({});
