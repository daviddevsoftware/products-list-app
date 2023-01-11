// Native Libraries
import React, { useEffect, useState } from 'react';
import { Animated, GestureResponderEvent, StyleSheet, Text, TouchableNativeFeedback, View, ViewStyle } from 'react-native';

// Stiles
import { colors } from '@utilities/styles';

// Interfaces
interface ComponentProps {
    text: string;
    onPress?: ((event: GestureResponderEvent) => void)
    style?: ViewStyle,
    visible: boolean,
}

/**
 * Button
 * @param text: Text to show in the button
 * @param onPress: Function to execute when the button is pressed
 */
const Button = ({ text, onPress, style, visible }: ComponentProps) => {

    const [scaleAnim] = useState(new Animated.Value(1));
    const [opacity] = useState(new Animated.Value(visible ? 1 : 0));

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: visible ? 1 : 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    useEffect(() => {
        const animation = Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
        });
        return () => {
            animation.stop();
        };
    }, []);

    const handlePressIn = () => {
        Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={[styles.container, style, { display: visible ? 'flex' : 'none' }]}>
            <TouchableNativeFeedback 
                style={[{ width: '100%', height: '100%' }]} 
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}>
                <Animated.View 
                    style={[styles.container, { transform: [{ scale: scaleAnim }], opacity: opacity }]}>
                    <Text style={[styles.title]}>{text}</Text>
                </Animated.View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10, 
        backgroundColor: colors.blue, 
        maxHeight: 50,
        minHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    // Title
    title: {
        fontSize: 12,
        fontWeight: '800',
        color: 'white'
    },
});

export default Button;