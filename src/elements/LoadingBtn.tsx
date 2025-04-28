import React, {FunctionComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
// import { Image } from "react-native-elements"; // dùng này bị lỗi nháy ảnh khi chuyển trang thái.
import FastImage from 'react-native-fast-image';

interface LoadingBtnProps {
  children: React.ReactNode;
  onPress?: () => void;
  loading?: boolean;
  loadingSize?: number;
  style?: StyleProp<ViewStyle>;
  className?: string;
  disable?: boolean;
}
const LoadingBtn: FunctionComponent<LoadingBtnProps> = ({
  children,
  onPress,
  loadingSize,
  loading,
  style,
  className,
  disable = false,
}) => {
  const _onPress = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity
      className={`justify-center ${className}`}
      style={[css.btn, style, loading || disable ? {opacity: 0.5} : {}]}
      onPress={_onPress}
      disabled={loading || disable}>
      {children}
      {loading && (
        <View style={css.loadding}>
          <FastImage
            source={require('@assets/Rolling-1s-200px.gif')}
            style={{
              width: loadingSize || 24,
              height: loadingSize || 24,
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default LoadingBtn;

const css = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    minWidth: 10,
    alignSelf: 'flex-start', // fit conten for btn.
  },
  loadding: {
    position: 'absolute',
  },
});
