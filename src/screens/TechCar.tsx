import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, Text, TouchableOpacity, View} from 'react-native';
import techList from '@data/oto/techcar';
import Colors from '@styles/color';
import {Navigate} from '@utils/navigate';
const TechCar = ()=>{

    const renderItem: ListRenderItem<{ title: string; detail: string, remoteSource?: any }> = useCallback(({item})=>{
        return (
            <TouchableOpacity className={'flex p-1'} style={{backgroundColor: Colors.green200, borderRadius: 6}} onPress={()=>{
            Navigate('TechCarDetail', {remoteSource: item?.remoteSource});
            }}>
                <Text className={'ts-15b text-primaryA700 underline'}>{item.title}</Text>
                <Text className={'ts-14s mt-1'} style={{paddingLeft: 8, color: Colors.ink900}}>{item.detail}</Text>
            </TouchableOpacity>
        );
    }, []);

    return(
        <View className={'flex-1 bg-ink100 dark:bg-ink600 p-1'}>
            <FlatList
                data={techList as {title: string; detail: string}[]}
                renderItem={renderItem}
                ItemSeparatorComponent={()=> <View style={{height: 2, marginVertical: 2, borderEndStartRadius: 2}} />}
            />
        </View>
    );
};

export default TechCar;
