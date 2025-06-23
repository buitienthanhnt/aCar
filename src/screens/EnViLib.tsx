import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, ListRenderItem, Text, TouchableOpacity, View} from 'react-native';
import enLib from '@data/oto/enLib.json';
import SearchInputText from '@elements/SearchInputText';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '@styles/color';

const  EnViLib = ()=>{
    const inputWidth = 260; const timeDuration = 1300;
    const [search, setSearch] = useState<string>('');
    const searchWidth = useSharedValue(0);

    const onSearchPress = useCallback(()=>{
        searchWidth.value = withTiming(searchWidth.value === inputWidth ? 0 : inputWidth, {
            duration: timeDuration,
        }, );
    }, [searchWidth]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: searchWidth.value,
            opacity: interpolate(searchWidth.value, [0, inputWidth], [0, 1], Extrapolation.CLAMP),
        };
    }, []);

    const renderItem: ListRenderItem<{ en:string,vi: string,viKey:string }> = useCallback(({item})=>{
        return <View className={'flex-row gap-x-1 justify-between p-1 bg-ink400 rounded'}>
            <Text className={'ts-14s text-primaryB500 flex-1'}>{item.en}</Text>
            <Text className={'ts-15b text-primaryA500 flex-1'}>{item.vi}</Text>
        </View>;
    }, []);

    const data = useMemo(()=>{
        if (search.length >= 2){
            return enLib.filter(item=>item.en.toLowerCase().includes(search.toLowerCase()) || item.viKey.toLowerCase().includes(search.toLowerCase()));
        }
        return enLib;
        // return enLib.slice(0, 60);
    }, [search]);

    return(
            <View className={'flex-1 bg-ink100 dark:bg-ink600 p-1'}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    ItemSeparatorComponent={()=> <View className={'h-1 bg-ink100'} />}
                />
                <View className={'absolute right-[20px]'} style={{
                    justifyContent: 'center',
                    top: 0,
                    bottom: 0,
                    zIndex: 99,
                }}>
                    <View className={'rounded flex-row justify-center items-center p-1 gap-x-1'}>
                            <Animated.View style={[{
                                overflow: 'hidden',
                                display: 'flex',
                                height: 60,
                            }, animatedStyle]}>
                                <SearchInputText className={'flex-1 w-fit'} value={search} onChange={setSearch} placeholder={'Tìm nhanh'} inputStyle={{borderRadius: 8}}/>
                            </Animated.View>
                        <TouchableOpacity onPress={onSearchPress}>
                            <FontAwesome5 name={'search'} color={Colors.primaryA700} size={27}  />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    );
};

export default EnViLib;
