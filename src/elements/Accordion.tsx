import React, {FunctionComponent, useCallback} from 'react';
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Pressable, Text, View} from 'react-native';
import Colors from '@styles/color';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const AnimatePress = Animated.createAnimatedComponent(Pressable);

const Accordion: FunctionComponent<any> = ({
  show,
  children,
  onPress,
  title,
}) => {
  const viewRef = useAnimatedRef<View>();
  const curentH = useSharedValue(0);
  const height = useSharedValue(0);
  const padding = 4;

  const style = useAnimatedStyle(() => {
    return curentH.value === 0
      ? {}
      : {
          height: height.value,
        };
  });

  const rotate = useDerivedValue(() => {
    if (curentH.value === 0 && height.value === 0) {
      return show ? 90 : 0;
    }
    return (height.value / curentH.value) * 90;
  });

  const rotateStyles = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rotate.value}deg`}],
  }));

  const _onPress = useCallback(() => {
    runOnUI(() => {
      'worklet';
      // measure cho phép lấy kích thước cho thẻ được truyền Ref vào
      // (thẻ đó cần có chứa nội dung rồi)
      const hei = measure(viewRef)?.height || 0;
      if (hei && curentH.value === 0) {
        const _hei = hei + padding * 2;
        curentH.value = _hei;
        if (show) {
          height.value = _hei;
        }
      }
      if (height.value) {
        height.value = withTiming(0, {duration: 500});
        return;
      }
      height.value = withTiming(curentH.value, {
        duration: 500,
      });
    })();
  }, [viewRef, curentH, height, show]);

  return (
    <View className={'px-1'}>
      <View
        className={
          'p-3 items-center rounded-lg flex-row justify-between border-primaryA500 border gap-x-[20px]'
        }
      >
        <Pressable onPress={onPress || _onPress} className={'flex-1'}>
          <Text className={'ts-16s text-orange500 p-1'}>{title || 'Click content'}</Text>
        </Pressable>
        <AnimatePress style={[{padding: 6}, rotateStyles]} onPress={_onPress}>
          <FontAwesome5Icon
            name={'chevron-right'}
            size={18}
            color={Colors.orange500}
          />
        </AnimatePress>
      </View>
      <Animated.View style={[style, {overflow: 'hidden'}]}>
        <View
          className={'w-full rounded-lg border-primaryA500 border'}
          style={{
            position: show ? undefined : 'absolute', // lưu ý giá trị này quan trọng trong việc định hình nội dung khi kết hợp: overflow: 'hidden'
            padding: padding,
            marginTop: padding,
          }}
          collapsable={false}
          ref={viewRef}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};
export default Accordion;
