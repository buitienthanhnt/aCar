import React, {FunctionComponent, useCallback, useEffect, useState} from 'react';
import {Clipboard, FlatList, ListRenderItem, Text, TouchableOpacity, View} from 'react-native';
import SearchInputText from '@elements/SearchInputText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingBtn from '@elements/LoadingBtn';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '@styles/color';
import colors from 'tailwindcss/colors';
import {showMessage} from 'react-native-flash-message';

const EnViLibLocal = ()=>{
    const [data, setData] = useState<{en: string; vi: string}[]>([]);

    const getData = useCallback(async ()=>{
        const list = await AsyncStorage.getItem('localLib');
        const listValue = JSON.parse(list || '[]');
        setData(listValue);
    }, []);

    const onRemove = useCallback(async (en: string)=>{
       await AsyncStorage.setItem('localLib', JSON.stringify([...data.filter(item=> item.en.toLowerCase() !== en.toLowerCase())]));
       await getData();
    }, [data, getData]);

    useEffect(() => {
        getData();
    }, [getData]);

    return(
        <View className={'flex-1 p-1 bg-ink100 dark:bg-ink600'}>
            <AddCom onSuccess={getData}/>
            <ListTranslate data={data} onRemove={onRemove}/>
        </View>
    );
};

type AddComProps = {
onSuccess?: ()=> void
};

const AddCom: FunctionComponent<AddComProps> = ({onSuccess})=>{
    const [loading, setLoading] = useState(false);
    const [vi, setVi] = React.useState('');
    const [en, setEn] = useState('');

    const onAddNewText = useCallback(async ()=>{
        setLoading(true);
       try {
           const oldData = await AsyncStorage.getItem('localLib');
           const newData = [...JSON.parse(oldData || '[]'), {
               vi: vi,
               en: en,
           }];
           await AsyncStorage.setItem('localLib', JSON.stringify(newData));
       }catch (e){}
        onSuccess?.();
        setLoading(false);
    }, [en, onSuccess, vi]);
    return(
        <View>
            <SearchInputText value={en} onChange={setEn} placeholder={'Tiếng Anh'} inputStyle={{borderRadius: 8}}/>
            <View className={'p-1 justify-center items-center'}>
                <FontAwesome5 color={Colors.primaryA700} size={24} name={'arrow-down'} />
            </View>
            <SearchInputText value={vi} onChange={setVi} placeholder={'Tiếng Việt'} inputStyle={{borderRadius: 8}}/>
           <View className={'p-1'}>
               <LoadingBtn onPress={onAddNewText} className={'w-full border rounded-xl border-primaryA500'} loading={loading}>
                   <Text className={'ts-16m text-violet-900'}>Lưu bản ghi</Text>
               </LoadingBtn>
           </View>
        </View>
    );
};

interface ListTranInterface{
    data: {en: string;
    vi: string;}[];
    onRemove?: (en: string)=> void;
}
const ListTranslate: FunctionComponent<ListTranInterface> = ({data, onRemove})=>{
    const renderItem: ListRenderItem<{
        en: string,
        vi: string,
    }> = useCallback(({item, index})=>{
        return(
            <View key={index.toString()} className={'flex-row justify-between'}>
                <TouchableOpacity className={'flex-1'} onLongPress={()=>{
                    Clipboard.setString(item.en);
                    showMessage({
                        message: `Đã sao chép: ${item.en}`,
                        type: 'info',
                    });
                }}>
                    <Text className={'ts-16s text-primaryB500 p-1'}>{item.en}</Text>
                </TouchableOpacity>
               <View className={'flex-1 p-1 flex-row justify-between'}>
                   <TouchableOpacity onLongPress={()=>{
                       Clipboard.setString(item.vi);
                       showMessage({
                           message: `Đã sao chép: ${item.vi}`,
                           type: 'success',
                       });
                   }}>
                       <Text className={'ts-16s text-primaryA500'}>{item.vi}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>{
                       onRemove?.(item.en);
                   }}>
                       <FontAwesome5 name="trash" iconStyle="solid" size={21} color={colors.red['500']} />
                   </TouchableOpacity>
               </View>
            </View>
        );
    }, [onRemove]);

    return(
        <View className={'flex-1 rounded-t-lg'}>
            <FlatList
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent={()=>{
                    return(
                        <View className={'h-1 bg-ink100'} />
                    );}
                }
            />
        </View>
    );
};

export default EnViLibLocal;
