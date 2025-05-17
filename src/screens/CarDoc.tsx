import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {Navigate} from '@utils/navigate';
import LoadingBtn from '@elements/LoadingBtn';

const CarDoc: FunctionComponent<any> = ()=>{
    return(
        <View className={'flex-1 p-2 bg-ink200 dark:bg-ink600'}>
            <LoadingBtn
                onPress={()=>{Navigate('EnViLib');}}
                className={'items-center p-1 border border-primaryA500 rounded-lg w-full'}>
                <Text className={'text-primaryB500 ts-15b'}>Từ điển chuyên ngành</Text>
            </LoadingBtn>
        </View>
    );
};

export default CarDoc;
