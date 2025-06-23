/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {FunctionComponent, useCallback, useEffect, useState, PropsWithChildren} from 'react';
import './global.css';
import {
  Appearance,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Base from "@theme/Base";
import {
    translate,
} from 'google-translate-api-x';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer} className={'bg-red-600'}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
    const [result, setResult] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

    const tranText =  useCallback(async ()=>{
        try {
            const tran = await translate(
                'bạn nghĩ sao về vấn đề này',
                { to: 'en'}
            );
            setResult( typeof tran === 'object' ? ('text' in tran ? (typeof tran?.text === 'string' ? tran?.text : '') : '') : '');
        }catch (error){
            console.log('>>>>>>>>>>>>>', error);
        }
    }, []);

    useEffect(() => {
        tranText();
    }, [tranText]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
        <Base />
        <Text>{result}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
