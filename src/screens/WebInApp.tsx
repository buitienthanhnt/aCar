import React, {useEffect} from 'react';
import {View, Image, Button} from 'react-native';
import WebView from 'react-native-webview';
import {Navigate} from "../utils/navigate";

const WebInApp = (props: any) => {
    useEffect(() => {
        console.log(decodeURIComponent(props?.route?.params?.storeUrl));
    }, [props?.route?.params?.storeUrl]);
    return (
        <View style={{flex: 1}}>
            {props?.route?.params?.storeUrl ? (
                <WebView // open webview in app by url
                    source={{uri: decodeURIComponent(props?.route?.params?.storeUrl)}}
                    renderLoading={() => {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                    // position: 'absolute',
                                }}>
                            </View>
                        );
                    }}
                />
            ) : (
                <View>
                    {/*<Button title={'to MyDrawer'} onPress={()=>{*/}
                    {/*    Navigate('MyDrawer')*/}
                    {/*}}></Button>*/}
                    <Image
                        source={require('@assets/anh-amua.jpg')}
                        style={{width: '100%', height: '100%'}}
                    />
                </View>
            )}
        </View>
    );
};

export default WebInApp;
