import React, {FunctionComponent} from 'react';
import {StyleProp, TouchableOpacity, View, ViewProps} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '@styles/color';

const ChecBoxInput: FunctionComponent<{
  selected: boolean;
  onSelect: () => void;
  style?: StyleProp<ViewProps>;
}> = ({selected, onSelect}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect();
      }}
      className={
        'bg-ink100 border-[2px] border-primaryA500 rounded p-1 dark:bg-orange200 '
      }>
      {selected ? (
        <FontAwesome5Icon name={'check'} size={15} color={Colors.primaryA500} />
      ) : (
        <View className={'h-[15px] w-[15px]'} />
      )}
    </TouchableOpacity>
  );
};
export default ChecBoxInput;
