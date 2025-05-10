/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import './global.css';
import {
    Linking,
    StyleSheet,
    useColorScheme, useWindowDimensions,
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
import {navigationRef} from '@utils/navigate';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ScanOto from '@screens/ScanOto';
import CarErrorSearch from '@screens/CarErrorSearch';
import VinDetect from '@screens/VinDetect';
import WebInApp from '@screens/WebInApp';
import AppInfo from "./src/screens/AppInfo";
import CarLib from "./src/screens/CarLib";
import ListImages from "@screens/ListImages";

const Stack = createNativeStackNavigator();

function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Update app"
                        onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.cli7')}
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
                drawerStyle: {
                    width :isLargeScreen ? null :  '55%',
                    backgroundColor: '#c6cbef',
                },
                overlayColor: 'transparent',
                // drawerActiveTintColor: 'violet',
                drawerActiveBackgroundColor: '#9dd3c8',
                drawerLabelStyle: {
                    // backgroundColor: '#9dd3c8',
                    // opacity: 0.6,
                },
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Error DTC" component={CarErrorSearch} options={{
                drawerLabel: 'Error DTC search',
                drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={color} size={size} name={focused ? 'search-minus' : 'search-plus'} />,
            }} />
            <Drawer.Screen name="VIN Detect" component={VinDetect}  options={{
                drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={color} size={size} name={ 'truck-monster'} />,
            }}/>

            <Drawer.Screen name="VIN Scan" component={ScanOto} options={{
              drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={color} size={size} name={ 'camera'} />,
            }}/>

            <Drawer.Screen name="Car library" component={CarLib} options={{
                drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={color} size={size} name={ 'satellite-dish'} />,
            }}/>

            <Drawer.Screen name="Car images" component={ListImages} options={{
              drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={color} size={size} name={ 'image'} />,
            }}/>

            <Drawer.Screen name="App info" component={AppInfo} options={{
                drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={color} size={size} name={ 'info-circle'} />,
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
            {/*https://reactnavigation.org/docs/drawer-navigator/*/}
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
