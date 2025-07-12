import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import enLib from '@data/oto/enLib.json';
import SearchInputText from '@elements/SearchInputText';

const  EnViLib = ()=>{

    const [searchText, setSearchText] = useState('');

    const renderItem: ListRenderItem<{ en:string,vi: string,viKey:string }> = useCallback(({item})=>{
        return <View className={'flex-row gap-x-1 justify-between p-1 bg-ink400 rounded'}>
            <Text className={'ts-14s text-primaryB500 flex-1'}>{item.en}</Text>
            <Text className={'ts-15b text-primaryA500 flex-1'}>{item.vi}</Text>
        </View>;
    }, []);

    const data = useMemo(()=>{
        if (searchText.length >= 2){
            return enLib.filter(item=>item.en.toLowerCase().includes(searchText.toLowerCase()) || item.viKey.toLowerCase().includes(searchText.toLowerCase()));
        }
        return enLib;
        // return enLib.slice(0, 60);
    }, [searchText]);

    return(
        <View className={'flex-1 bg-ink100 dark:bg-ink600 p-1'}>
            <SearchInputText value={searchText} onChange={setSearchText} />
            <FlatList
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent={()=> <View className={'h-1 bg-ink100'} />}
            />
        </View>
    );
};

export default EnViLib;
