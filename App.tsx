// Native libraries
import React from 'react';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';

// Screens
import HomeScreen from '@screens/Home/index';
import ProductScreen from '@screens/Product/index';

// Store
import { Provider } from 'react-redux'
import { ProductData } from '@src/actions/Product';
import store from '@src/store'

// Stacks
type ProductScreenParams = NavigatorScreenParams<{}> & { data: ProductData };
export type RootStackParamList = {
    Home: undefined;
    Product: ProductScreenParams;
};
const PrincipalStack = createStackNavigator<RootStackParamList>()

// App
const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <PrincipalStack.Navigator initialRouteName={"Home"} screenOptions={{ headerShown: false }}>
                    {/* Home */}
                    <PrincipalStack.Screen name="Home" component={HomeScreen} />

                    {/* Product */}
                    <PrincipalStack.Screen name="Product" component={ProductScreen} />
                </PrincipalStack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
