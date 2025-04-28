import React, {FunctionComponent} from 'react';
import {Image, View} from 'react-native';

const LoadingFull: FunctionComponent = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('@assets/Ripple-1s-200px.gif')}
        style={{width: 60, height: 60}}
      />
    </View>
  );
};

export default LoadingFull;
