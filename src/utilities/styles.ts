import { StyleSheet } from "react-native";

// * Colors *
const white = '#FFF';
const green = '#00B833';
const blue = '#334FFA';
const gray = '#9B9898';
const grayLabel = '#cdcdcd';
const black = '#000';
const red = '#FF0000';

export const colors = {
    background: white,
    white: white,
    green: green,
    blue: blue,
    gray: gray,
    grayLabel: grayLabel,
    black: black,
    red: red,
};

// * Styles *
export const generalStyles = StyleSheet.create({
    screen: { 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'transparent',
    },
});
