// Libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Store
import { ProductData } from '@actions/Product';
import { colors } from '@utilities/styles';
import { useMemo } from 'react';

// Props
interface ComponentProps {
    products: ProductData[];
    filterActive: boolean;
    is_redemption: boolean;
}

const CurrentMonth = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('es-ES', { month: 'long' });
    return <Text style={styles.date}>{month.replace(/^\w/, c => c.toUpperCase())}</Text>;
};

const PointsCard = ({products, filterActive, is_redemption}: ComponentProps) => {

    // Summary of the points
    const total = useMemo(() => {
        // Get array of numbers
        let numbers = products.map((item) => item.is_redemption ? -item.points : item.points);

        // Sum of the array
        let sumPositive = 0;
        let sumNegative = 0;
        numbers.forEach(function(number) {
            if (number >= 0) {
                sumPositive += number;
            } else {
                sumNegative += number;
            }
        });
        let sum = sumPositive + sumNegative;
        if(filterActive) {
            sum = is_redemption ? Math.abs(sumNegative) : sumPositive;
        } 

        // Parse to formatted string
        let parsedSum = sum.toLocaleString('en-US', {
            style: 'decimal',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        }) + ' pts'

        return parsedSum;
    }, [products, filterActive, is_redemption]);

    return (
        <View style={{ flex: 1, flexDirection: 'column', paddingBottom: 20 }}>
            <Text style={styles.title}>Tus Puntos</Text>
            <View style={styles.container}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {/* Month */}
                    <CurrentMonth/>

                    {/* Points */}
                    <Text style={styles.points}>{total}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
    },
    container: {
        borderRadius: 10,
        backgroundColor: colors.blue,
        flex: 1,
        marginHorizontal: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    },
    title: {
        fontSize: 14,
        fontWeight: '800',
        color: colors.gray,
        marginBottom: 20 
    },
    points: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.white,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    date: {
        fontSize: 15,
        fontWeight: '800',
        color: colors.white,
        position: 'absolute',
        left: 15,
        top: 10,
        justifyContent: 'center'
    },
});

export default PointsCard;
