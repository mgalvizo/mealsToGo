import React from 'react';
import styled, { useTheme } from 'styled-components';

// An index of the SPACING array in the theme
const SIZE_VARIANT = {
    small: 1,
    medium: 2,
    large: 3,
};

const POSITION_VARIANT = {
    top: 'margin-top',
    right: 'margin-right',
    bottom: 'margin-bottom',
    left: 'margin-left',
};

// Returns a string e.g. 'margin-top:16px'
const getVariant = (position, size, theme) => {
    const sizeIndex = SIZE_VARIANT[size];
    const property = POSITION_VARIANT[position];
    const value = theme.SPACE[sizeIndex];

    return `${property}:${value}`;
};

const SpacerView = styled.View`
    ${({ variant }) => variant}
`;

// Fixes rendering on Android
const Spacer = ({ position, size, children }) => {
    const theme = useTheme();
    const variant = getVariant(position, size, theme);

    return <SpacerView variant={variant}>{children}</SpacerView>;
};

// Default props for styled component
Spacer.defaultProps = {
    position: 'top',
    size: 'small',
};

export default Spacer;
