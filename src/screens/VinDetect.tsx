import React, {FunctionComponent, useMemo, useState} from 'react';
import {
    Keyboard,
    Pressable,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {formatVinCode, otoCountry, otoYearProduction} from '@utils/helper';
import {ValueCode} from '@type/DataType';
import Accordion from '../elements/Accordion';
import {Navigate} from "@utils/navigate";

type TypeProps = {
    type: string;
    title: string;
    length?: number;
    desc?: string;
};
const typeList: TypeProps[] = [
    {
        type: 'year',
        title: 'Năm sản xuất',
        desc: 'Vị trí số 10',
        length: 1,
    },
    {
        type: 'country',
        title: 'Nơi sản xuất',
        desc: 'Từ vị trí số 1 đến vị trí số 3',
        length: 3,
    },
    {
        type: 'all',
        title: 'Tất cả thông tin',
        desc: 'VIN bao gồm 17 ký tự',
        length: 17,
    },
];

function VinDetect() {
    const [value, setValue] = useState<ValueCode>();
    const [type, setType] = useState<TypeProps>();

    const searchValue = useMemo(() => {
        if (!value?.textValue) {
            return '';
        }
        switch (type?.type) {
            case 'year':
                return otoYearProduction(value?.textValue);
            case 'country':
                return otoCountry(value?.textValue);
        }
    }, [type?.type, value?.textValue]);

    const valueInfo = useMemo(() => {
        if (!value?.textValue) {
            return '';
        }

        if (type?.type === 'all') {
            return (
                <View>
                    <Text className={'ts-18s text-primaryB500 underline'}>
                        Nơi sản xuất: {otoCountry(value?.textValue.slice(0, 3) || '')}
                    </Text>
                    {value?.textValue.length >= 10 && (
                        <Text className={'ts-18s text-primaryB500 underline'}>
                            Năm sản xuất:{' '}
                            {otoYearProduction(value?.textValue.slice(9, 10) || '')}
                        </Text>
                    )}
                </View>
            );
        }
        return (
            <Text className={'ts-18s text-primaryB500 underline'}>
                {type?.title}: {searchValue}
            </Text>
        );
    }, [searchValue, type?.title, type?.type, value?.textValue]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className={'flex-1 p-1 bg-ink100 dark:bg-ink600 gap-y-1'}>
                <View className={'flex'}>
                    <Accordion title={'Loại thông tin'}>
                        <ListType
                            selected={type}
                            onPress={(type: TypeProps) => {
                                setType(type);
                                setValue({
                                    textValue: '',
                                    len: 0,
                                    index: 0,
                                    value: '',
                                    yearValue: '',
                                });
                            }}
                        />
                    </Accordion>
                </View>
                <View className={'flex-row justify-between items-center'}>
                    <Text className={'ts-16s text-primaryA500'}>Nhập mã VIN: </Text>
                    <TextInput
                        placeholder={type?.desc}
                        maxLength={type?.length}
                        value={value?.textValue}
                        onChangeText={text => {
                            setValue({
                                textValue: formatVinCode(text),
                                len: text.length,
                                index: 0,
                                value: text,
                                yearValue: otoYearProduction(text),
                            });
                        }}
                        style={{
                            flex: 1,
                            fontSize: 20,
                            color: 'blue',
                            borderWidth: 1,
                            borderRadius: 8,
                            borderColor: 'green',
                            minHeight: 48,
                            paddingHorizontal: 4
                        }}
                    />
                </View>
                <View className={'p-1 border border-primaryA500 rounded-lg'}>
                    <Text className={'ts-16s text-primaryA500'}>
                        Chuỗi xác định: {value?.textValue}
                    </Text>

                    <View className={'flex-row items-baseline'}>
                        <Text className={'ts-16s text-green600'}>
                            Độ dài chuỗi: {value?.len}{' '}
                        </Text>
                        {value?.textValue && (
                            <Pressable
                                onPress={() => {
                                    if (value.textValue.length === 17) {
                                        Navigate('WebInApp', {
                                            storeUrl: `https://www.vindecoderz.com/EN/check-lookup/${value.textValue}`,
                                        });
                                    }
                                }}>
                                <Text
                                    className={`ts-12s ${
                                        value.textValue.length === 17
                                            ? 'underline text-primaryB500'
                                            : 'text-red-800'
                                    }`}>
                                    {value.textValue.length === 17 ? 'xem chi tiết' : ''}
                                </Text>
                            </Pressable>
                        )}
                    </View>
                    {valueInfo}
                </View>
                <Text className={'ts-10b text-orange500'}>
                    Lưu ý: Nên sử dụng tính năng{' '}
                    <Text className={'text-primaryA700'}>[Nhập mã VIN]</Text> trực tiếp để
                    có kết quả chính xác. Việc{' '}
                    <Text className={'text-green900'}>[Chọn ảnh từ thư viện]</Text> hoặc{' '}
                    <Text className={'text-primaryB500'}>[Dùng máy ảnh] </Text>
                    kết quả có thể không chính xác do chữ trên ảnh bị mờ.
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

type ListTypeProps = {
    onPress?: (type: TypeProps) => void;
    selected?: TypeProps
};

const ListType: FunctionComponent<ListTypeProps> = ({onPress, selected}) => {
    return (
        <View className={'gap-y-0.5'}>
            {typeList.map((item, index) => {
                return (
                    <Pressable
                        className={`${selected?.type === item.type ? 'bg-primaryB300' : 'bg-primaryA100'} p-1 rounded`}
                        key={index}
                        onPress={() => {
                            onPress?.(item);
                        }}>
                        <Text className={`${selected?.type === item.type ? 'text-ink100' : 'text-black900'} ts-18s`}>{item.title}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
};
export default VinDetect;
