import React from 'react';
import {Dimensions, Image, ScrollView, Text} from 'react-native';

const ListImages = ()=>{
  return(
    <ScrollView className={'flex-1 bg-ink100'} contentContainerStyle={{
      justifyContent: 'center',
      padding: 2,
      gap: 2
    }}>
      <Image
        style={{width: Dimensions.get('screen').width - 4, height: 240}}
        resizeMode={'cover'}
        source={require('@assets/errorImage/den-bao-loi-tren-o-to1.jpg')}
      />
      <Image
        style={{width: Dimensions.get('screen').width - 4, height: 330}}
        resizeMode={'cover'}
        source={require('@assets/errorImage/den-bao-loi-tren-o-to2.jpg')}
      />
      <Image
        style={{width: Dimensions.get('screen').width - 4, height: 240}}
        resizeMode={'cover'}
        source={require('@assets/errorImage/den-bao-loi-tren-o-to3.jpg')}
      />
      <Image
        style={{width: Dimensions.get('screen').width - 4, height: 300}}
        resizeMode={'cover'}
        source={require('@assets/errorImage/den-bao-loi-tren-o-to4.jpg')}
      />
    </ScrollView>
  );
};

export default ListImages;
