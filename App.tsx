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
   useWindowDimensions,
} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import {navigationRef} from '@utils/navigate';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ScanOto from '@screens/ScanOto';
import CarErrorSearch from '@screens/CarErrorSearch';
import VinDetect from '@screens/VinDetect';
import WebInApp from '@screens/WebInApp';
import AppInfo from './src/screens/AppInfo';
import CarLib from './src/screens/CarLib';
import ListImages from '@screens/ListImages';
import CarDoc from '@screens/CarDoc';
import EnViLib from '@screens/EnViLib';
import TechCar from '@screens/TechCar';
import TechCarDetail from '@screens/TechCarDetail';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import color from '@styles/color';
import Dashboard from '@screens/Dashboard';
import NewLog from "@screens/NewLog";

const Stack = createNativeStackNavigator();

function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Cập nhật"
                        onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.cli7')}
                        icon={({ color, size }) => <FontAwesome5 color={color} size={size} name={ 'hands-helping'} />} />
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
                drawerLabel: 'Tra cứu mã lỗi', // Error DTC search
                drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={color} size={size} name={focused ? 'search-minus' : 'search-plus'} />,
                headerTitle: 'Tra cứu mã lỗi',
            }} />
            <Drawer.Screen name="VIN Detect" component={VinDetect}  options={{
                drawerLabel: 'Tra cứu mã VIN', // Error DTC search
                drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={ focused ? 'black' : color} size={size} name={ 'truck-monster'} />,
                headerTitle: 'Tra cứu mã VIN',
            }}/>

            <Drawer.Screen name="VIN Scan" component={ScanOto} options={{
                drawerLabel: 'Quét mã VIN',
              drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={ focused ? 'black' : color} size={size} name={ 'camera'} />,
                headerTitle: 'Quét mã VIN',
            }}/>

            <Drawer.Screen name="Car library" component={CarLib} options={{
                drawerLabel: 'Lỗi tổng hợp',
                drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={ focused ? 'black' : color} size={size} name={ 'satellite-dish'} />,
                headerTitle: 'Lỗi tổng hợp',
            }}/>

            <Drawer.Screen name="Tong_hop" component={CarDoc} options={{
                drawerLabel: 'Tổng hợp',
                drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={ focused ? 'black' : color} size={size} name={ 'signal'} />,
                headerTitle: 'Thông tin tổng hợp',
            }}/>

            <Drawer.Screen name="App info" component={AppInfo} options={{
                drawerLabel: 'Thông tin ứng dụng',
                drawerIcon: ({ focused, color, size }) => <FontAwesome5 color={ focused ? 'black' : color} size={size} name={ 'info-circle'} />,
                headerTitle: 'Thông tin ứng dụng',
            }}/>
        </Drawer.Navigator>
    );
}

// const RootTabs = createBottomTabNavigator({
//     screenOptions: {
//         animation: 'fade',
//     },
//     screens: {
//         MyDrawer: MyDrawer,
//     },
// });

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={Dashboard} options={{
                // headerShown: false,
                title: 'Trang chủ',
                headerTitle: 'Tổng hợp bài viết',
                tabBarIcon: ({ focused, color, size }) => (<FontAwesome5Icon color={color} size={size} name={'cloud-download-alt'} />),
            }}/>

            <Tab.Screen name="Home" component={MyDrawer} options={{
                headerShown: false,
                title: 'Tổng hợp',
                tabBarIcon: ({ focused, color, size }) => (<FontAwesome5Icon color={color} size={size} name={'globe-asia'} />),
            }}/>
        </Tab.Navigator>
    );
}

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

    return (
        <NavigationContainer ref={navigationRef}>
            {/*https://reactnavigation.org/docs/drawer-navigator/*/}
            {/*https://dev.to/easybuoy/combining-stack-tab-drawer-navigations-in-react-native-with-react-navigation-5-da*/}
            <Stack.Navigator id={undefined}>
                {/*<Stack.Screen*/}
                {/*    name="MyDrawer"*/}
                {/*    // @ts-ignore*/}
                {/*    component={MyDrawer}*/}
                {/*    options={{headerShown: false}}*/}
                {/*/>*/}

                <Stack.Screen
                    name="MyTabs"
                    // @ts-ignore
                    component={MyTabs}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name="WebInApp"
                    // @ts-ignore
                    component={WebInApp}
                    options={{headerShown: true, headerTitle: 'Car decode'}}
                />
                <Stack.Screen
                    name="EnViLib"
                    // @ts-ignore
                    component={EnViLib}
                    options={{headerShown: true, headerTitle: 'Từ điển chuyên ngành'}}
                />
                <Stack.Screen
                    name="TechCar"
                    // @ts-ignore
                    component={TechCar}
                    options={{headerShown: true, headerTitle: 'Tổng hợp kỹ thuật'}}
                />

                <Stack.Screen
                    name="ListImages"
                    // @ts-ignore
                    component={ListImages}
                    options={{headerShown: true, headerTitle: 'Thư viện ảnh'}}
                />

                <Stack.Screen
                    name="TechCarDetail"
                    // @ts-ignore
                    component={TechCarDetail}
                    options={{headerShown: true, headerTitle: 'Chi tiết kỹ thuật'}}
                />

                <Stack.Screen
                    name="NewLog"
                    // @ts-ignore
                    component={NewLog}
                    options={{headerShown: true, headerTitle: 'Nội dung Chia sẻ'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
