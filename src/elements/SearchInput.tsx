import React, {useState, useCallback, FunctionComponent} from 'react';
import {View, ScrollView, Text, TextInput} from 'react-native';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchInput: FunctionComponent<any> = props => {
  const opacity = useSharedValue(0);
  const [value, setValue] = useState(props.inputSource || []);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const onPressValue = useCallback(
    (item: any) => {
      setSearch(item.title);
      opacity.value = withSpring(0);
      setVisible(false);
    },
    [opacity],
  );

  const onChange = useCallback(
    (text: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setSearch((old: string) => text);
      if (text.length === 0) {
        setValue(props.inputSource);
      }
      if (text.length >= 3) {
        const searchValue = props.inputSource.filter((item: any) => {
          return item.title.toLowerCase().search(search.toLowerCase()) != -1;
        });
        setValue(searchValue);
      }
    },
    [props.inputSource, search],
  );

  return (
    <View style={props.style || {}}>
      <View className={'px-5 h-auto'}>
        <View
          className={
            'border rounded-2xl border-primaryA500 flex-row px-2 items-center'
          }>
          <TextInput
            placeholder="search..."
            className={'flex-1 px-2 h-[40px] py-1'}
            onFocus={() => {
              setVisible(true);
              opacity.value = withSpring(1);
            }}
            value={search}
            onChangeText={onChange}
          />
          {search && (
            <Icon
              name="remove"
              size={24}
              color="black"
              onPress={() => {
                setSearch('');
              }}
            />
          )}
        </View>

        {visible && (
          <Animated.View
            className={
              'w-full h-[160px] border rounded-2xl absolute mt-[50px] mx-5 px-2 py-1'
            }
            style={{
              borderColor: '#68bcff',
              zIndex: 999,
              elevation: 999,
              opacity,
            }}>
            <ScrollView style={{}} showsVerticalScrollIndicator={false}>
              {value &&
                value.map((item: any, index: number) => {
                  return (
                    <Text
                      key={index}
                      onPress={() => {
                        onPressValue(item);
                      }}
                      className={'ts-16s text-primaryA500'}>
                      {item.title}
                    </Text>
                  );
                })}
            </ScrollView>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default SearchInput;
