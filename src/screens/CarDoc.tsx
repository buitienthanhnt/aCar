import React, {FunctionComponent} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Navigate} from '@utils/navigate';
import LoadingBtn from '@elements/LoadingBtn';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '@styles/color';

const CarDoc: FunctionComponent<any> = ()=>{
    return(
        <ScrollView className={'flex-1 p-2 bg-ink200 dark:bg-ink600'} contentContainerStyle={{gap: 6}}>
            <LoadingBtn
                onPress={()=>{Navigate('EnViLib');}}
                className={'items-center p-1 border border-ink900 rounded-lg w-full'}>
                <View className={'flex-row justify-between flex-1'}>
                    <Text className={'text-ink900  ts-15b'}>Từ điển chuyên ngành</Text>
                    <FontAwesome5Icon name="chevron-right" size={24} color={Colors.ink900} />
                </View>
            </LoadingBtn>

            <LoadingBtn
                onPress={()=>{Navigate('TechCar');}}
                className={'items-center p-1 border border-ink900 rounded-lg w-full'}>
                <View className={'flex-row justify-between flex-1'}>
                    <Text className={'text-ink900 ts-15b'}>Tổng hợp kỹ thuật</Text>
                    <FontAwesome5Icon name="chevron-right" size={24} color={Colors.ink900} />
                </View>
            </LoadingBtn>

            <LoadingBtn
                onPress={()=>{Navigate('ListImages');}}
                className={'items-center p-1 border border-ink900 rounded-lg w-full'}>
                <View className={'flex-row justify-between flex-1'}>
                    <Text className={'text-ink900 ts-15b'}>Thư viện ảnh</Text>
                    <FontAwesome5Icon name="chevron-right" size={24} color={Colors.ink900} />
                </View>
            </LoadingBtn>
        </ScrollView>
    );
};

export default CarDoc;
