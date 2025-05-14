import React, {useCallback, useMemo, useState} from 'react';
import {
    Dimensions,
    Image,
    Keyboard,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
// @ts-ignore
import {upperFirst, sortBy} from 'lodash';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from 'tailwindcss/colors';

const errorData: ErrorOto[] = require('@data/oto/error-code.json');

type ErrorOto = {
    key: string;
    message: {
        en: string;
        vi: string;
    };
};

const CarErrorSearch = () => {
    const [value, setValue] = useState<string>('');
    const [selectedValue, setSelectedValue] = useState<string[]>([]);

    const errors = useMemo(() => {
        const selectedItems = errorData.filter((e: any) => {
            return selectedValue.includes(e.key.toLowerCase());
        });

        if (value.length < 2) {
            return selectedValue.length === 0 ? [] : selectedItems;
        }

        return [...sortBy(selectedItems, ['key']), ...sortBy(errorData.filter((e: any) => {
            return e.key.toLowerCase().includes(value.toLowerCase()) && !selectedValue.includes(e.key.toLowerCase());
        }), ['key'])];
    }, [selectedValue, value]);

    const onPressError = useCallback((error: ErrorOto)=>{
        if (selectedValue.includes(error.key.toLowerCase())) {
            setSelectedValue([...selectedValue.filter((e: any) => e !== error.key.toLowerCase())]);
        }else{
            setSelectedValue([...selectedValue, error.key.toLowerCase()]);
        }
    }, [selectedValue]);

    return (
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           <View className={'flex-1 bg-ink100 dark:bg-ink600 gap-y-1'}>
               <View className={'flex-row p-1 justify-between items-center gap-x-1'}>
                   <Text className={'ts-16s text-primaryA500'}>Nhập mã lỗi: </Text>
                   <TextInput
                       onChangeText={text => {
                           setValue(text);
                       }}
                       placeholder={'Tối thiểu 2 ký tự'}
                       value={value}
                       style={{
                           flex: 1,
                           fontSize: 20,
                           color: 'blue',
                           borderWidth: 1,
                           borderRadius: 4,
                           borderColor: 'green',
                       }}
                   />
                   {value && <Pressable className={'p-1'} onPress={()=>{
                       setValue('');
                   }}>
                       <FontAwesome5 name="trash" iconStyle="solid" size={24} color={colors.blue['500']} />
                   </Pressable>}
               </View>
               {errors.length > 0 ? (
                   <ScrollView contentContainerStyle={{
                       paddingHorizontal: 2,
                   }}>
                       {errors.map((e, index) => {
                           return (
                               <TouchableOpacity onLongPress={()=>{
                                   onPressError(e);
                               }}
                                                 key={index}
                                                 className={`flex-row w-full gap-x-1 py-1 rounded border-b ${selectedValue.includes(e.key.toLowerCase()) ? 'bg-violet-300' : ''}`}>
                                   <Text className={'ts-16s text-black900 dark:text-ink100 w-fit'}>
                                       {e.key}
                                   </Text>
                                   {e.message.en && <Text className={'ts-13s text-orange500 flex-1'}>
                                       {upperFirst(e.message.en)}
                                   </Text>}
                                   {e.message.vi && <Text className={'ts-14s text-primaryA500 flex-1'}>
                                       {upperFirst(e.message.vi)}
                                   </Text>}
                               </TouchableOpacity>
                           );
                       })}
                   </ScrollView>
               ) : (<Image source={require('@assets/errorImage/oto.jpg')}
                           style={{width: '100%', height: 220, resizeMode: 'cover'}}
               />)}
               {/*<Button title={'to vin'} onPress={()=>{*/}
               {/*    Navigate('VIN Detect')*/}
               {/*}}></Button>*/}
               {/*<Text></Text>*/}
               {/*<Button title={'to WebInApp'} onPress={()=>{*/}
               {/*    Navigate('WebInApp')*/}
               {/*}}></Button>*/}
           </View>
       </TouchableWithoutFeedback>
    );
};

export default CarErrorSearch;
