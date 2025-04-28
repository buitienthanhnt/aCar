import React, {
  forwardRef,
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  TextInput,
  View,
  StyleProp,
  Text,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '@styles/color';
// @ts-ignore
import {debounce} from 'lodash';

export interface FormInputComponentRef {
  onClear: () => void;
  setDefaultValue: (value: string) => void;
}

export type FormInputProps = TextInputProps & {
  label?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  numberOfLines?: number;
  icon?: React.ReactElement<FontAwesome5Icon>;
  inputStyle?: StyleProp<ViewStyle>;
};

const FormInput: ForwardRefExoticComponent<
  FormInputProps & RefAttributes<FormInputComponentRef>
> = forwardRef(
  (
    {
      label,
      onChangeText,
      numberOfLines,
      icon,
      inputStyle,
      secureTextEntry,
      ...props
    },
    ref: Ref<FormInputComponentRef> | null,
  ) => {
    const [value, setValue] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(
      secureTextEntry || false,
    );

    useImperativeHandle(ref, () => ({
      onClear: () => {
        setValue('');
      },
      setDefaultValue: (value: string) => {
        setValue(value);
      },
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateValue = useCallback(
      debounce(
        (text: string) => {
          onChangeText?.(text);
        },
        400,
        // {leading: true, trailing: false},
      ),
      [onChangeText],
    );

    useEffect(() => {
      updateValue(value);
    }, [updateValue, value]);

    useEffect(() => {
      updateValue(props.defaultValue);
    }, [props.defaultValue, updateValue]);

    return (
      <View className={'space-y-1'}>
        {label && <Text className={'ts-20s text-primaryA700'}>{label}</Text>}
        <View
          style={[{}, inputStyle]}
          className={
            'flex-row border border-gray-500 justify-center items-center px-2'
          }>
          <TextInput
            value={value ? value : undefined}
            className={'flex-1 ts-20r p-1 min-h-[48px] leading-6'}
            onChangeText={setValue}
            multiline={!!numberOfLines}
            numberOfLines={numberOfLines}
            secureTextEntry={showPassword}
            style={{flex: 1, fontSize: 20, minHeight: 48}}
            {...props}
          />
          <View className={'flex'}>{icon}</View>
          {numberOfLines && value && (
            <TouchableOpacity
              onPress={() => {
                setValue('');
              }}
              className={'absolute top-2 right-2 p-1 rounded-lg'}>
              <FontAwesome5Icon name="times" size={18} color={Colors.ink900} />
            </TouchableOpacity>
          )}
          {secureTextEntry && (
            <TouchableOpacity
              onPress={() => {
                setShowPassword(!showPassword);
              }}>
              <FontAwesome5Icon
                name={showPassword ? 'eye' : 'eye-slash'}
                size={24}
                color={
                  (inputStyle as ViewStyle)?.borderColor || Colors.black900
                }
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

export default FormInput;
