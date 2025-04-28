import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import {upperFirst, sortBy} from 'lodash';

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
        <View className={'flex-1 bg-ink100 dark:bg-ink600 gap-y-1'}>
            <View className={'flex-row p-1 justify-between items-center'}>
                <Text className={'ts-16s text-primaryA500'}>Nhập mã lỗi: </Text>
                <TextInput
                    onChangeText={text => {
                        setValue(text);
                    }}
                    style={{
                        flex: 1,
                        fontSize: 20,
                        color: 'blue',
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: 'green',
                    }}
                />
            </View>
            {errors.length > 0 && (
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
            )}
        </View>
    );
};

export default CarErrorSearch;
