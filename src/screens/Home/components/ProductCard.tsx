// Libraries
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

// Store
import { ProductData } from '@actions/Product';
import { useMemo } from 'react';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '@src/utilities/styles';

// Props
interface ComponentProps { 
    product: ProductData,
    onPress: (item: ProductData) => void,
    filtered: (item: ProductData) => boolean,
};

import * as Animatable from 'react-native-animatable';

const ProductCard = ({ product, onPress, filtered }: ComponentProps) => {

    if(filtered(product)) return null;

    // Parsed date to new format
    const date = useMemo(() => (new Date(product.createdAt)).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }), [product.createdAt]);

    const PointsTextComponent = useMemo(() => (
        <View style={styles.containerPoints}>
            <Icon name={product.is_redemption ? 'minus' : 'plus'} size={10} color={product.is_redemption ? colors.red : colors.green} />
            <Text style={{fontSize: 10, fontWeight: '800', marginLeft: 5}}>{product.points}</Text>
        </View>
    ), [product.points, product.is_redemption]);

    return (
        <View style={{flex: 1}}>
            {/* Item */}
            <Animatable.View
                animation="bounceIn"
                duration={700}
                useNativeDriver={true}
            >
                <TouchableOpacity onPress={() => onPress(product)}>
                    <View style={[{ flex: 1, flexDirection: 'row' }]}>
                        {/* Image container */}
                        <View style={{ flex: 1 }}>
                            <FastImage
                                source={{
                                    uri: product.image,
                                    priority: FastImage.priority.high,
                                }}
                                style={styles.image}
                            />
                        </View>

                        {/* Information container */}
                        <View style={styles.containerInfo}>
                            <Text style={styles.title}>{product.product}</Text>
                            <Text style={styles.subTitle}>{date}</Text>
                        </View>

                        {/* Points */}
                        {PointsTextComponent}

                        {/* Icon */}
                        <View style={[styles.center]}>
                            <View style={[ styles.containerIcon ]}>
                                <Icon name="angle-right" size={25} color="black" />
                            </View>
                        </View>
                        
                    </View>
                </TouchableOpacity>
            </Animatable.View>

            {/* Div */}
            <View style={styles.div}></View>
        </View>
       

        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    div: {
        borderColor: colors.grayLabel,
        width: "100%",
        borderTopWidth: 1,
        alignSelf: 'center',
        height: 1,
        marginVertical: 10
    },
    containerIcon: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerInfo: { 
        flex: 3, 
        paddingLeft: 30,
        paddingRight: 20,
        justifyContent: 'space-evenly',
    },
    containerPoints: { 
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    title: {
        fontSize: 12,
        fontWeight: '800',
    },
    subTitle: {
        fontSize: 10,
        fontWeight: '400',
    }
});

export default ProductCard;
