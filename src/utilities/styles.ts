import { StyleSheet } from "react-native";

// * Colors *
const white = '#FFF';
const green = '#00c466';
const blue = '#334FFA';
const gray = '#9B9898';
const grayLabel = '#cdcdcd';

export const colors = {
    background: white,
    white: white,
    green: green,
    blue: blue,
    gray: gray,
    grayLabel: grayLabel,
};

// * Styles *
export const generalStyles = StyleSheet.create({
    screen: { 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'transparent',
    },
});
