import React, {FunctionComponent, useCallback, useEffect, useState} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import DOMParser from 'react-native-html-parser';
import RenderHtml from 'react-native-render-html';
import WebView from 'react-native-webview';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

type DetailProps = {
    remoteSource?: {
        url: string;
        type: string;
    }
}

const TechCarDetail: FunctionComponent<any> = ({route:{params: {remoteSource}}})=>{
    const [val, setVal] = useState<any>();

    const loadData = useCallback(async ()=>{
        if (!remoteSource) {return;}
        const response = await fetch(remoteSource?.url);
        const data = await response.text();

        const parser = new DOMParser.DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        // console.log('----+', doc.getElementsByClassName('post-content', false).item());
        var ulResults = Array.from(doc.getElementsByClassName('post-content', false));

        // ulResults.forEach(el => console.log('?????', el.toString()));
        ulResults.forEach(el => {
            setVal(el as unknown);
        });
    }, [remoteSource]);

    useEffect(()=>{
        // remoteSource && loadData();
    }, [remoteSource, loadData]);

    return(
        <View className={'bg-ink100 flex-1 p-1 pt-2'}>
            {/*{val &&  <RenderHtml*/}
            {/*    contentWidth={Dimensions.get('window').width - 8}*/}
            {/*    source={{html: val.toString()}}*/}
            {/*/>}*/}
            {remoteSource && <WebView // open webview in app by url
                source={{uri: decodeURIComponent(remoteSource?.url)}}
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
                            }} />
                    );
                }}
            />}
        </View>
    );
};

export default TechCarDetail;
