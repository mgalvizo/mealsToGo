import React from 'react';
import { StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import {
    RestaurantCard,
    RestaurantCardCover,
    Info,
    Section,
    SectionEnd,
    Rating,
    Icon,
    Address,
} from './RestaurantInfoCard.styles';
import open from '../../../../assets/open';
import star from '../../../../assets/star';
import Spacer from '../../../components/Spacer/Spacer.component';
import Text from '../../../components/Typography/Text.component';

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

    const renderRating = ratingArray.map((rating, index) => {
        // Loading svg as xml
        return <SvgXml xml={star} width={20} height={20} key={index} />;
    });

    return (
        <RestaurantCard elevation={5}>
            <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
            <Info>
                <Text variant="label">{name}</Text>
                <Section>
                    <Rating>{renderRating}</Rating>
                    <SectionEnd>
                        {isClosedTemporarily && (
                            <Text variant="error">CLOSED TEMPORARILY</Text>
                        )}
                        <Spacer position="left" size="large">
                            {isOpenNow && (
                                <SvgXml xml={open} width={20} height={20} />
                            )}
                        </Spacer>
                        <Spacer position="left" size="large">
                            <Icon source={{ uri: icon }} />
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
