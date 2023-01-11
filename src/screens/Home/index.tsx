// Native Libraries
import React, { useEffect, useState } from 'react';
import { SectionList, Text, TouchableNativeFeedback } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Global Styles
import { generalStyles } from '@utilities/styles';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import TaskItem from './components/ProductCard';
import Button from '@components/Button';
import { ProductData } from '@src/actions/Product';

// Navigation
import { CommonActions } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';

// Hooks
import { useFetchProducts } from '@hooks/useFetchProducts';
import ProductList from './components/ProductList';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import PointsCard from './components/PointsCard';

// Interfaces
interface SectionTasks {
    title: string;
    data: number[];
}

// ScreenProps
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {

    // State
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [filter, setFilter] = useState<boolean>(false);

    // Products charge
    useFetchProducts();

    // Store
    const { products, loading, error } = useSelector((state: RootState) => state.product);

    const data: SectionTasks[] = [
        {
            title: 'Completed tasks',
            data: [],
        },
        {
            title: 'Pending tasks',
            data: [],
        },
    ];

        
    useEffect(() => {
        console.log(loading);
    }, [loading])

    const getProducts = () => {
        useFetchProducts
    }

    const handleSetFilter = (filter: boolean) => {
        setShowFilter(true);
        setFilter(filter);
    }

    const handleHideFilter = () => {
        setShowFilter(false);
    }

    return (
        <View style={[generalStyles.screen]}>
            <SafeAreaView style={[ styles.container ]}>
                <View style={[ styles.container ]}>
                    {/* Header */}
                    <View style={[ styles.header ]}>
                        {/* Title */}
                        <View style={[ styles.titleContainer ]}>
                            <Text style={[ styles.title ]}>Bienvenido de vuelta!</Text>
                            <Text style={[ styles.name ]}>David Elias</Text>
                        </View>
                    </View>

                    {/* Content */}
                    <View style={[styles.content]}>
                        
                        {/* Sections of Points */} 
                        <View style={{flex: 2}}>
                            <PointsCard products={products}/>
                        </View>         
                        
                        
                        {/* Sections of Products */}   
                        <View style={{flex: 5}}>
                            <ProductList navigation={navigation} products={products}/>
                        </View>       
                        

                        {/* Buttons */}
                        <View style={styles.buttonContainer}>
                            <Button visible={showFilter} text='Aceptar' onPress={() => handleHideFilter()}/>
                            <Button visible={!showFilter} style={{ marginRight: 5 }} text='Ganados' onPress={() => handleSetFilter(true)}/>
                            <Button visible={!showFilter} style={{ marginLeft: 5 }} text='Canjeados' onPress={() => handleSetFilter(false)}/>
                        </View>

                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
    },
    content: {
        flex: 7,
        paddingHorizontal: 20,
    },
    actionsContainer: { 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around',
        paddingRight: 10,
    },
    // Title
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    name: {
        fontSize: 15,
        fontWeight: '300',
        marginTop: 5
    },
    containerIcon: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        paddingHorizontal: 30,
    },
    buttonContainer: { 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
});

export default HomeScreen;