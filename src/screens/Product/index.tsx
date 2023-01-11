import React, { useEffect, useMemo } from 'react';
import { Image, Text, TouchableNativeFeedback } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

// Global Styles
import { colors, generalStyles } from '@utilities/styles';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import Button from '@components/Button';

// Navigation
import { CommonActions } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';

// ScreenProps
type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;

const ProductScreen =  ({ navigation, route }: Props) => {

    const { data } = route.params;
    
    if(!data) return null;

    const date = useMemo(() => {
        const date = new Date(data.createdAt);
        const day = date.getDate();
        const monthName = [
            'enero',
            'febrero',
            'marzo',
            'abril',
            'mayo',
            'junio',
            'julio',
            'agosto',
            'septiembre',
            'octubre',
            'noviembre',
            'diciembre'
        ];
        return `Comprado el ${day} de ${monthName[date.getMonth()]}`;
    }, [data.createdAt]);

    const labelSell = useMemo(() => data.is_redemption ? `Con esta compra gastaste:` : `Con esta compra acumulaste:`, [data.is_redemption]);

    const icon = useMemo(() => (
        <Icon name={data.is_redemption ? 'minus' : 'plus'} size={10} color={data.is_redemption ? colors.red : colors.green} />
    ), [data.points, data.is_redemption]);

    useEffect(() => {
    }, []);

    const goBack = () => {
        navigation.dispatch(CommonActions.goBack());
    }

    return (
        <View style={[generalStyles.screen]}>
            <SafeAreaView style={[ styles.container ]}>
                <View style={[ styles.container ]}>
                    {/* Header */}
                    <View style={[ styles.header ]}>
                        
                        {/* Back */}
                        <View style={[ styles.containerIcon ]}>
                            <TouchableNativeFeedback onPress={goBack}>
                                <View style={[ styles.containerIcon ]}>
                                    <Icon name="chevron-left" size={20} color="gray" />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                            
                        {/* Title */}
                        <Text style={[ styles.title ]}>{data.product}</Text>

                    </View>

                    {/* Content */}
                    <View style={[ styles.content ]}>

                        {/* Info */}
                        <View style={[ styles.card ]}>
                            <View style={[ styles.imageContainer ]}>
                                <Image source={{ uri: data.image }} style={[ styles.image ]} />
                            </View>
                        </View>

                        <View style={[ styles.infoContainer ]}>
                            <Text style={[ styles.label ]}>Detalles de producto:</Text>
                            <Text style={[ styles.text ]}>{date}</Text>
                            <Text style={[ styles.label ]}>{labelSell}</Text>
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                {icon}<Text style={[ styles.textPoints ]}>{data.points} puntos</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }} >
                            <Button visible={true} text='Aceptar' onPress={goBack}/>
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
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 1,
        elevation: 5,
        alignItems: 'center',
        paddingLeft: 20
    },
    content: {
        flex: 6,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },

    // Title
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginLeft: 20,
        color: colors.black
    },

    containerIcon: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    card: {
        flex: 5,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 1,
        elevation: 5
    },

    imageContainer: {
        flex: 3,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    infoContainer: {
        flex: 5,
        paddingHorizontal: 20,
        paddingVertical: 5,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    
    label: {
        fontSize: 14,
        color: colors.gray,
        fontWeight: '800'
    },

    text: {
        fontSize: 16,
        fontWeight: '800'
    },

    textPoints: {
        fontSize: 24,
        fontWeight: '800',
        marginLeft: 10,
    }
});

export default ProductScreen;