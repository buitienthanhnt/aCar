import React, {useCallback, useMemo, useState} from 'react';
import {useCameraDevice} from 'react-native-vision-camera';
import {
    Camera,
    PhotoRecognizer,
} from 'react-native-vision-camera-text-recognition';
import {
    Clipboard,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {codeNumber} from '@utils/helper';
import LoadingBtn from '@elements/LoadingBtn';
import ImageViewer from 'react-native-image-zoom-viewer';
import {PERMISSIONS} from 'react-native-permissions';
import Colors from '@styles/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {requestPermisssion} from '@utils/permission';
import {showMessage} from 'react-native-flash-message';
import {Navigate} from '@utils/navigate';
import {useIsFocused} from '@react-navigation/native';

// https://www.vindecoderz.com/EN/check-lookup/RL4BT9135B9511751

function ScanOto() {
    const [flash, setFlash] = useState<'off' | 'on' | undefined>('off');
    const [activeCam, setActiveCam] = useState<number>(0);
    const [imagePath, setImagePath] = useState<string>('');
    const [textSearch, setTextSearch] = useState<string>();
    const device = useCameraDevice('back');

    const isFocused = useIsFocused();

    /**
     * chọn ảnh từ thư viện ảnh trên mobile
     */
    const pickImage = useCallback(async () => {
        Keyboard.dismiss();
        // No permissions request is necessary for launching the image library
        let result = await launchImageLibrary({
            // @ts-ignore
            mediaTypes: 'photo',
            allowsEditing: true,
            quality: 1,
            selectionLimit: 0,
        });

        if (!result.didCancel) {
            const target_image: string[] = [];
            // @ts-ignore
            result?.assets.map(imageItem => {
                // @ts-ignore
                target_image.push(imageItem?.uri.toString());
            });
            if (!target_image.length) {
                return;
            }
            setImagePath(target_image[0]);
            try {
                const Textval = await PhotoRecognizer({
                    uri: target_image[0],
                    orientation: 'portrait',
                });

                Textval.resultText && setTextSearch(Textval.resultText);
            } catch (error) {
                showMessage({
                    type: 'warning',
                    message: 'không xác định!',
                });
            }
        }
    }, []);

    /**
     * mở máy ảnh
     */
    const onPressCam = useCallback(async () => {
        requestPermisssion(PERMISSIONS.ANDROID.CAMERA, () => {
            setActiveCam(old => (old === 0 ? 1 : old === 1 ? 2 : 1));
        });
    }, []);

    /**
     * tính giá trị của chuỗi đã tìm.
     */
    const value = useMemo(() => {
        if (!textSearch) {
            return;
        }
        const decodeValue = codeNumber(textSearch);
        return decodeValue[0];
    }, [textSearch]);

    const textDetail = useMemo(() => {
        return !value ? null : (
            <View className={'flex-row'}>
                <Text className={'ts-16s text-primaryA500'}>Chuỗi xác định: </Text>
                <Text className={'ts-16s text-orange500'}>
                    {value.textValue?.slice(0, 3)}
                </Text>
                <Text className={'ts-16s text-violet-700'}>
                    {value.textValue?.slice(3, value?.index)}
                </Text>
                <Text className={'ts-16s text-primaryA500'}>
                    {value.textValue?.substr(value?.index, 1)}
                </Text>
                <Text className={'ts-16s text-green-700'}>
                    {value.textValue?.slice(value?.index + 1)}
                </Text>
            </View>
        );
    }, [value]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className={'flex-1 p-1 bg-ink100 dark:bg-ink600 gap-y-1'}>
                {device && isFocused && activeCam !== 0 && (
                    <Camera
                        torch={flash}
                        style={[styleSheet.absoluteFill]}
                        device={device}
                        isActive={isFocused && activeCam === 1}
                        options={{
                            language: 'latin',
                        }}
                        mode={'recognize'}
                        callback={(d: any) => {
                            if (
                                !d ||
                                (typeof d === 'object' && !d?.resultText) ||
                                d.length < 15 ||
                                d.resultText.length < 15
                            ) {
                                return;
                            }
                            setTextSearch(typeof d === 'string' ? d : d?.resultText);
                        }}
                    />
                )}
                <View className={'flex-row justify-between'}>
                    <LoadingBtn
                        className={'p-2 bg-orange300 rounded-lg'}
                        onPress={pickImage}>
                        <Text className={'ts-16s text-ink900'}>Chọn ảnh từ thư viện</Text>
                    </LoadingBtn>

                    <View className={'flex-row gap-x-2'}>
                        {activeCam === 1 && (
                            <LoadingBtn
                                className={'p-0'}
                                style={{padding: 4}}
                                onPress={() => {
                                    setFlash(old => (old === 'on' ? 'off' : 'on'));
                                }}>
                                <Icon
                                    name={'flash'}
                                    size={34}
                                    color={flash === 'on' ? Colors.primaryB500 : Colors.ink500}
                                />
                            </LoadingBtn>
                        )}

                        <LoadingBtn
                            className={'p-2 bg-primaryA500 rounded-lg'}
                            onPress={onPressCam}>
                            <Text className={'ts-16s text-ink100'}>
                                {activeCam !== 1 ? 'Dùng máy ảnh' : 'Tắt máy ảnh'}
                            </Text>
                        </LoadingBtn>
                    </View>
                </View>
                <View className={'p-1 border border-primaryA500 rounded-lg gap-y-1'}>
                    <Pressable
                        onLongPress={() => {
                            value?.textValue && Clipboard.setString(value?.textValue);
                            showMessage({
                                type: 'success',
                                message: 'Đã sao chép!',
                            });
                        }}>
                        {textDetail}
                    </Pressable>

                    {value?.textValue && (
                        <TextInput
                            maxLength={17}
                            defaultValue={value?.textValue}
                            onChangeText={text => {
                                setTextSearch(text);
                            }}
                            style={{
                                fontSize: 20,
                                color: 'blue',
                                borderWidth: 1,
                                borderRadius: 8,
                                borderColor: 'green',
                            }}
                        />
                    )}

                    <View className={'flex-row items-baseline'}>
                        <Text className={'ts-16s text-green600 leading-5'}>
                            Độ dài chuỗi: {value?.len}
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
                                    {value.textValue.length === 17
                                        ? 'xem chi tiết'
                                        : `(Thiếu: ${
                                            17 - value?.len || 0
                                        } ký tự, hãy kiểm tra lại)`}
                                </Text>
                            </Pressable>
                        )}
                    </View>

                    <View className={'flex-row justify-between'}>
                        <Text className={'ts-16s text-primaryA500'}>
                            Ký tự lựa chọn: {value?.value}
                        </Text>
                        {value?.index && (
                            <Text className={'ts-16s text-orange500'}>
                                Thứ tự lựa chọn: {value?.index + 1}
                            </Text>
                        )}
                    </View>
                    <Text className={'ts-18s text-primaryB500 underline'}>
                        Năm sản xuất: {value?.yearValue}
                    </Text>
                </View>
                {!!imagePath && (
                    <ImageViewer
                        imageUrls={[
                            {
                                url: imagePath,
                                props: {},
                                freeHeight: true,
                            },
                        ]}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styleSheet = StyleSheet.create({
    absoluteFill: {
        width: '100%',
        height: 210,
    },
});
export default ScanOto;
