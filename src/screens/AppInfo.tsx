import Colors from '@styles/color';
import React, {useCallback, useState} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Linking,
    ListRenderItem,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

type SocialItemType = {
    url: string;
    image?: string;
    type: string;
};

const appLink =
    Platform.OS === 'android'
        ? 'https://play.google.com/store/apps/details?id=com.cli7'
        : '';

const AppInfo = () => {
    const data: SocialItemType[] = [
        {
            url: 'https://join.skype.com/invite/wTgVZgXygNR7',
            type: 'skype',
        },
        {
            url: 'https://zalo.me/0702032201',
            type: 'zalo',
        },
        {
            url: 'https://t.me/thanh_nt_b',
            type: 'tele',
        },
        {
            url: 'https://www.youtube.com/channel/UCgLNTcps0zAPfaz74YGsplA',
            type: 'youtube',
        },
    ];

    const ImageIcon = useCallback((item: SocialItemType) => {
        switch (item.type) {
            case 'skype':
                return (
                    <Image
                        resizeMode={'cover'}
                        style={{width: 40, height: 40}}
                        source={require('@assets/socialIcon/skype.png')}
                    />
                );
            case 'tele':
                return (
                    <Image
                        resizeMode={'cover'}
                        style={{width: 40, height: 40}}
                        source={require('@assets/socialIcon/telegram.png')}
                    />
                );
            case 'youtube':
                return (
                    <Image
                        resizeMode={'cover'}
                        style={{width: 40, height: 40}}
                        source={require('@assets/socialIcon/youtube.png')}
                    />
                );
            case 'zalo':
                return (
                    <Image
                        width={80}
                        height={80}
                        source={require('@assets/socialIcon/zalo.png')}
                    />
                );
        }
        return null;
    }, []);

    const onPressItem = useCallback((item: any) => {
        Linking.openURL(item.url);
    }, []);

    const renderItem: ListRenderItem<SocialItemType> = useCallback(
        ({item, index}) => {
            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        onPressItem(item);
                    }}
                    className={
                        'flex-1 items-center justify-center bg-ink100 p-4 m-[1px] rounded dark:bg-ink500'
                    }>
                    {ImageIcon(item)}
                </TouchableOpacity>
            );
        },
        [ImageIcon, onPressItem],
    );

    return (
        <View className={'flex-1 p-3 gap-2 dark:bg-ink600'}>
            <Text className={'ts-16s text-primaryB300'}>
                acar Global: Ứng dụng hỗ trợ kỹ thuật ô tô.
            </Text>
            <Text className={'ts-14s text-primaryB300'}>
                * Hỗ trợ tính năng:
            </Text>

            <Text className={'ts-14s text-black600 pl-2'}>
                - Quét, xem thông tin mã vin xe.
            </Text>
            <Text className={'ts-14s text-black600 pl-2'}>
                - Tra mã lỗi thông báo của máy chẩn đoán sự cố.
            </Text>
            <Text className={'ts-14s text-black600 pl-2'}>
                - Tra cứu nhanh các lỗi thường gặp và giải pháp xử lý.
            </Text>

            <Text className={'ts-16s text-black900'}>Chủ nhiệm: Bùi Tiến Thành</Text>
            <Text className={'ts-14b text-black900'}>
                Địa chỉ: Nam Tân - Trực Nội - Trực Ninh - Nam Định
            </Text>

            <View className={'flex-row w-full justify-between py-1'}>
                <Text className={'ts-18s text-black900'}>
                    Email: buitienthanhnt@gmail.com
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL('mailto:buitienthanhnt@gmail.com');
                    }}>
                    <FontAwesome5Icon
                        name="mail-bulk"
                        size={24}
                        color={Colors.primaryA500}
                    />
                </TouchableOpacity>
            </View>

            <View className={'flex-row w-full justify-between py-1'}>
                <Text className={'ts-18s text-black900'}>Sdt: 0702032201 </Text>
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL('tel:0702032201');
                    }}>
                    <FontAwesome5Icon name="phone" size={24} color={Colors.primaryA500} />
                </TouchableOpacity>
            </View>

            <FlatList
                ListHeaderComponent={
                    <View className={'py-2'}>
                        <Text className={'ts-16s text-green-600'}>Thông tin liên hệ:</Text>
                    </View>
                }
                keyExtractor={item => item.type.toString()}
                horizontal={false}
                numColumns={2}
                data={data}
                renderItem={renderItem}
                ListFooterComponent={()=>{
                    return(
                        <View className={'justify-center items-center p-1'}>
                            <Image source={require('@assets/a-car.png')} style={{width: Dimensions.get('screen').width/2, height: Dimensions.get('screen').width/2}} />
                        </View>
                    );
                }}
            />

            <View className={'ts-10s items-center'}>
                <Text className={'ts-12b text-ink700 dark:text-ink100'}>
                    version: {1.1}
                </Text>
            </View>
        </View>
    );
};

export default AppInfo;
