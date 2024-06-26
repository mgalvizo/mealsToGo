import React from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';

import Text from '../Typography/Text.component';

const CompactImage = styled.Image`
    border-radius: 10px;
    width: 120px;
    height: 100px;
`;

// Webview for the image to show on first render on Android
const CompactWebview = styled(WebView)`
    border-radius: 10px;
    width: 120px;
    height: 100px;
`;

const Item = styled.View`
    padding: 10px;
    max-width: 120px;
    align-items: center;
`;

const isAndroid = Platform.OS === 'android';

const CompactRestaurantInfo = ({ restaurant, isMap }) => {
    const Image = isAndroid && isMap ? CompactWebview : CompactImage;

    return (
        <Item>
            <Image source={{ uri: restaurant.photos[0] }} />
            <Text center variant="caption" numberOfLines={3}>
                {restaurant.name}
            </Text>
        </Item>
    );
};

export default CompactRestaurantInfo;
