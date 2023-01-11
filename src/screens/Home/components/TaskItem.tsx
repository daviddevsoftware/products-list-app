// Native Libraries
import React, { useEffect, useState } from 'react';
import { Animated, Text } from 'react-native';
import { StyleSheet } from 'react-native';

// Interfaces
interface ComponentProps {
    id: number,
    index: number,
    isCompleted?: boolean,
}

const TaskItem = ({ id,  index }: ComponentProps) => { 

    if(id == -1) return null;

    // Store
    const item = {
        id: 1,
        title: 'Test',
        completed: false
    }

    if(!item) return null;

    // State
    const [toggleCheckBox, setToggleCheckBox] = useState(item.completed)

    // Animated
    const opacity = new Animated.Value(0);
    useEffect(() => {
        if(toggleCheckBox == item.completed) handleOpacityAnimation(1);
    }, [toggleCheckBox, opacity]);

    const handleOpacityAnimation = (newValue: number) => {
        // Turn off Opacity
        Animated.timing(opacity, {
            toValue: newValue,
            duration : 600,
            delay: 50,
            useNativeDriver: true,
        }).start();
    }

    // Listeners    
    const handleChange = (value: boolean) => {
        setToggleCheckBox(value)
    }

    const animStyle = { opacity: opacity };

    return (
        <Animated.View key={`${item.id}-${index}`} style={[styles.container, animStyle]}>
            <Text style={[styles.label]}>{item.title}</Text>
        </Animated.View>
    );
};

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
    },
    label: {
        marginLeft: 20,
        fontSize: 17,
        fontWeight: '300'
    },
    checkbox: {
        marginLeft: 5
    }
});

export default TaskItem;