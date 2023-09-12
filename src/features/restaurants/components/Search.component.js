import React, { useContext, useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';

import { LocationContext } from '../../../services/location/location.context';

// A theme can also be passed down to a component using the theme prop
const SearchContainer = styled.View`
    padding: ${({ theme }) => theme.SPACE[3]};
`;

const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {
    const { keyword, search } = useContext(LocationContext);
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    useEffect(() => {
        setSearchKeyword(keyword);
    }, [keyword]);

    return (
        <SearchContainer>
            <Searchbar
                icon={isFavouritesToggled ? 'heart' : 'heart-outline'}
                onIconPress={onFavouritesToggle}
                placeholder="Search for a location"
                value={searchKeyword}
                // Callback that is called when the text input's submit button is pressed.
                onSubmitEditing={() => {
                    search(searchKeyword);
                }}
                // Callback that is called when the text input's text changes. Changed text is passed as a single string argument to the callback handler
                onChangeText={text => {
                    setSearchKeyword(text);
                }}
            />
        </SearchContainer>
    );
};

export default Search;
