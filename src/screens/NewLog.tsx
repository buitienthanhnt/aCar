import React, {FunctionComponent, useCallback, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import FormInput from '@elements/FormInput';
import firestore from '@react-native-firebase/firestore';
import {aCar} from '@screens/Dashboard';
import LoadingBtn from '@elements/LoadingBtn';
import Colors from '@styles/color';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewLog: FunctionComponent<any> = ({route:{params: {onSuccess}}})=>{
    const [loading, setLoading] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');
    const [causal, setCausal] = useState<string>('');
    const [repair, setRepair] = useState<string>('');

    const onAddContent = useCallback(async ()=>{
        if (!title || !causal){
            return;
        }
        const now = new Date();
        const value = await AsyncStorage.getItem(aCar.FIRESTORE_KEY);
        const jsonValue = value ? JSON.parse(value) : null;
        if (jsonValue?.date === now.toLocaleDateString() && jsonValue?.count > 1){
            showMessage({
                message: 'Số lượng tối đa mỗi ngày là 2 bài viết!',
                type: 'warning',
            });
            return;
        }

        console.log('loadding')
        setLoading(true);
        firestore()
            .collection(aCar.FIRESTORE_KEY)
            .add({
                title: title,
                causal: causal,
                repair: repair,
                createdAt: now.toLocaleDateString(),
            })
            .then(async () => {
                const jsonSave = JSON.stringify({
                    date: now.toLocaleDateString(),
                    count: jsonValue?.count ? jsonValue.count + 1 : 1,
                });
                await AsyncStorage.setItem(aCar.FIRESTORE_KEY, jsonSave);
                showMessage({
                    message: 'Đã gửi đề xuất!',
                    type: 'success',
                });
                onSuccess?.();
                setLoading(false);
            }).catch(()=>{
            setLoading(false);
        });
    }, [causal, onSuccess, repair, title]);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View className={'flex-1 bg-ink100 p-1'}>
                <FormInput placeholder={'Vấn đề'} onChangeText={setTitle} numberOfLines={2} placeholderTextColor={Colors.primaryA500} inputStyle={{
                    borderRadius: 8,
                    borderColor: 'green',
                }}/>

                <FormInput placeholder={'Nguyên nhân'} placeholderTextColor={Colors.primaryA500} onChangeText={setCausal} numberOfLines={3} inputStyle={{
                    borderRadius: 8,
                    marginTop: 6,
                    borderColor: 'green',
                }}/>

                <FormInput placeholder={'Giải pháp'} placeholderTextColor={Colors.primaryA500} onChangeText={setRepair} numberOfLines={2} inputStyle={{
                    borderRadius: 8,
                    marginTop: 6,
                    borderColor: 'green',
                }}/>
                <LoadingBtn className={'border border-primaryA500 rounded-xl w-full mt-2'} disable={!title || !causal} onPress={onAddContent} loading={loading}>
                    <Text className={'ts-15b text-black900'}>Tải lên</Text>
                </LoadingBtn>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default NewLog;
