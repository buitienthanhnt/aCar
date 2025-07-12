import {FunctionComponent} from 'react';
import {ActivityIndicator, Image, ImageBackground} from 'react-native';

const WaitLoading: FunctionComponent<{isLoadding: boolean}> = ({
  isLoadding = false,
}) => {
  return (
    <ImageBackground
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      source={require('@assets/bgImage/ic_launcher_adaptive_back.png')}>
      <Image
        style={{width: 200, height: 200}}
        source={require('@assets/bgImage/ic_launcher_adaptive_fore.png')}
      />
      {isLoadding && (
        <ActivityIndicator
          style={{position: 'absolute', transform: [{translateY: 50}]}}
          size={30}
          color={'violet'}
        />
      )}
    </ImageBackground>
  );
};

export default WaitLoading;
