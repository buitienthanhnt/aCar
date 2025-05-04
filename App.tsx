/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { PropsWithChildren} from 'react';
import './global.css';
import {
    StyleSheet,
    Text,
    useColorScheme, useWindowDimensions,
    View,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import CarErrorSearch from './src/screens/CarErrorSearch';
import VinDetect from './src/screens/VinDetect';
import {navigationRef} from '@utils/navigate';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WebInApp from './src/screens/WebInApp';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ScanOto from "./src/screens/ScanOto";

const Stack = createNativeStackNavigator();

function Article() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Article-[Vin scan] Screen</Text>
        </View>
    );
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Help"
                        onPress={() => alert('Link to help')}
                        icon={({ focused, color, size }) => <FontAwesome5 color={color} size={size} name={ 'hands-helping'} />} />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
    const dimensions = useWindowDimensions();

    const isLargeScreen = dimensions.width >= 768;
    return (
        <Drawer.Navigator id={undefined}
            defaultStatus="closed"
            screenOptions={{
                drawerType: isLargeScreen ? 'permanent' : 'back',
                drawerStyle: isLargeScreen ? null : { width: '55%' },
                overlayColor: 'transparent',
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Error DTC" component={CarErrorSearch} options={{
                drawerLabel: 'Error DTC search',
                drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={color} size={size} name={focused ? 'search-minus' : 'search-plus'} />,
            }} />
            <Drawer.Screen name="VIN Detect" component={VinDetect}  options={{
                drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={color} size={size} name={ 'info-circle'} />,
            }}/>
            <Drawer.Screen name="VIN Scan" component={ScanOto} options={{
                drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={color} size={size} name={ 'camera'} />,
            }}/>
        </Drawer.Navigator>
    );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

    return (
        <NavigationContainer ref={navigationRef}>
            {/*https://dev.to/easybuoy/combining-stack-tab-drawer-navigations-in-react-native-with-react-navigation-5-da*/}
            <Stack.Navigator id={undefined}>
                <Stack.Screen
                    name="MyDrawer"
                    // @ts-ignore
                    component={MyDrawer}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name="WebInApp"
                    // @ts-ignore
                    component={WebInApp}
                    options={{headerShown: true, headerTitle: 'car decode'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
