import React, {createContext, FunctionComponent, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {FlatList, ListRenderItem, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import colors from 'tailwindcss/colors';
import firestore from '@react-native-firebase/firestore';
import Colors from '@styles/color';
import {Navigate} from '@utils/navigate';
import SearchInputText from '@elements/SearchInputText';

export enum aCar {
    FIRESTORE_KEY = 'carLog',
}

type CarLog = {
    title: string;
    causal: string;
    repair: string;
    createdAt: string;
    userName: string;
};

const CarLogContext = createContext<any>({});

const Dashboard = () => {
    const [data, setData] = useState<any>([]);

    const fecthData = useCallback(async ()=>{
        let carLog: any[] = [];
        firestore()
            .collection(aCar.FIRESTORE_KEY)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    carLog.push(documentSnapshot.data());
                });
                setData([...carLog]);
            });
    }, []);

    useEffect(() => {
        fecthData();
    }, [fecthData]);

    return(
        <CarLogContext.Provider value={{
            data: data,
            loadData: fecthData,
        }}>
            <View className={'flex-1 bg-ink100 pt-1 px-1'}>
                <Content />
                <AddStatus />
            </View>
        </CarLogContext.Provider>
    );
};

const Content: FunctionComponent = ()=>{
    const {data, loadData} = useContext(CarLogContext);
    const [searchText, setSearchText] = useState('');

    const loadedData = useMemo(()=>{
        if (searchText.length < 2){
            return data;
        }
        return data.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
    }, [data, searchText]);

    const renderItem: ListRenderItem<CarLog> = useCallback(({item})=>{
        return(
            <View className={'bg-primaryA200 p-1 rounded-xl shadow-sm'} style={{
                elevation: 3,
                shadowColor: Colors.primaryA200,
                shadowOpacity: 0.4,
                shadowOffset: { width: 4, height: 4},
                shadowRadius: 10,
            }}>
                <Text className={'ts-16s text-ink100 underline'}>{item.title}</Text>
                {item.causal &&
                    <Text className={'ts-15b text-green-700 pl-1 mt-1'}>{item.causal}</Text>
                }
                {item.repair &&
                    <Text className={'ts-14b pl-1'}>{item.repair}</Text>
                }
                <View className={'justify-between flex-row items-center'}>
                    <Text className={'ts-14s text-right text-orange500'}>{item.userName || ''}</Text>
                    <Text className={'ts-14s text-right text-violet-700'}>{item.createdAt}</Text>
                </View>
            </View>
        );
    }, []);

    return(
        <View className={'flex-1 pb-0.5'}>
            {data && <SearchInputText value={searchText} onChange={setSearchText} inputStyle={{
                borderRadius: 8,
            }}/>}
            <FlatList
                data={loadedData}
                renderItem={renderItem}
                onRefresh={loadData}
                refreshing={false}
                ItemSeparatorComponent={() => <View className={'h-1 bg-ink100'} />}
                ListEmptyComponent={()=>{
                    return(
                        <View className={'items-center p-2'}>
                            <Text className={'ts-16b text-black900'}>Không có nội dung!</Text>
                        </View>
                    );
                }}
             />
        </View>
    );
};

const AddStatus = ()=>{
    const {loadData} = useContext(CarLogContext);

    const onAddContent = useCallback(()=>{
        Navigate('NewLog', {onSuccess: loadData});
    }, [loadData]);

    return(
        <View className={'justify-center items-center rounded-t-[12px] pb-1 bg-ink400'}>
            <View className={'p-1 bg-primaryA50 rounded-full'}>
                <View className={'p-1 bg-primaryA100 rounded-full'}>
                    <TouchableOpacity className={'p-1 bg-primaryA200 rounded-full'} onPress={onAddContent}>
                        <FontAwesome5Icon name={'plus-circle'} size={36} color={colors.blue['500']} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Dashboard;
