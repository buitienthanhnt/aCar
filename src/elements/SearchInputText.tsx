import {Pressable, Text, TextInput, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from 'tailwindcss/colors';
import React, {FunctionComponent} from 'react';

type SearchInputTextProps = {
    value: string;
    onChange: (value: string) => void;
    label?: string
}
const SearchInputText: FunctionComponent<SearchInputTextProps> = ({label, onChange, value})=>{
    return(
        <View className={'flex-row p-1 justify-between items-center gap-x-1'}>
            {label && <Text className={'ts-16s text-primaryA500'}>{label}: </Text>}
            <TextInput
                onChangeText={text => {
                    onChange(text);
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
                onChange('');
            }}>
                <FontAwesome5 name="trash" iconStyle="solid" size={24} color={colors.blue['500']} />
            </Pressable>}
        </View>
    );
};

export default SearchInputText;
