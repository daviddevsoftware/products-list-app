// Libraries
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

// Components
import ProductCard from './ProductCard';

// Store
import { ProductData } from '@actions/Product';
import { colors } from '@utilities/styles';
import { CommonActions } from '@react-navigation/native';
import { useCallback } from 'react';

// Props
interface ComponentProps {
    products: ProductData[];
    navigation: any,
    filterActive: boolean,
    is_redemption: boolean,
}

const ProductList = ({products, navigation, is_redemption, filterActive}: ComponentProps) => {

    const goToProductDetail = (data: ProductData) => {
        const navigateAction = CommonActions.navigate({
            name: 'Product',
            params: {
                data: data
            }
        });
        navigation.dispatch(navigateAction);
    }

    const handleFilter = useCallback((item: ProductData) => {
        return filterActive && is_redemption == item.is_redemption;
    }, [filterActive, is_redemption])
    
    return (
        <View style={{ flex: 1, paddingBottom: 20 }}>
            <Text style={styles.title}>Tus Movimientos</Text>
            <View style={[styles.container]}>
                { products.length > 0 ?
                    <FlatList
                        data={products}
                        renderItem={({ item }) => (
                            <ProductCard filtered={handleFilter} onPress={(item) => {goToProductDetail(item)}} product={item} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                : 
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.title}>Loading...</Text>
                    </View>
                }
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: colors.white,
        padding: 20,
    },
    title: {
        fontSize: 14,
        fontWeight: '800',
        color: colors.gray,
        marginBottom: 20 
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
    }
});

export default ProductList;
