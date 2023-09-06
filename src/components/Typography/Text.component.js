import styled from 'styled-components/native';

const defaultTextStyles = theme => `
	font-family: ${theme.FONTS.body};
	font-weight: ${theme.FONT_WEIGHTS.regular};
	color: ${theme.COLORS.text.primary};
	flex-wrap: wrap;
	margin-top: 0px;
	margin-bottom: 0px;
`;

const body = theme => `
    font-size: ${theme.FONT_SIZES.body};
`;

const hint = theme => `
    font-size: ${theme.FONT_SIZES.body};
`;

const error = theme => `
    color: ${theme.COLORS.text.error};
`;

const caption = theme => `
    font-size: ${theme.FONT_SIZES.caption};
    font-weight: ${theme.FONT_WEIGHTS.bold};
`;

const label = theme => `
    font-family: ${theme.FONTS.heading};
    font-size: ${theme.FONT_SIZES.body};
    font-weight: ${theme.FONT_WEIGHTS.medium};
`;

const variants = {
    body,
    label,
    caption,
    error,
    hint,
};

// Overwrites styles, do NOT write comments inside the template literal or it will cause an error
const Text = styled.Text`
    ${({ theme }) => defaultTextStyles(theme)}
    ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
    variant: 'body',
};

export default Text;
