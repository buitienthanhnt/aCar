import React, {FunctionComponent, useMemo, useState} from 'react';
import {Keyboard, ScrollView, SectionList, Text, TouchableWithoutFeedback, View} from 'react-native';
import LibErrror from '@data/oto/lib.json';
import FormInput from '@elements/FormInput';
import Colors from '@styles/color';
// @ts-ignore
import {groupBy, deburr} from 'lodash';

type CarLibProps = {
};

type ErrorItemType = {
    title: string;
    error: string;
    fix: string;
    type: string;
};

type LibErrorType = {
    type: string;
    items: ErrorItemType[]
}

const CarLib: FunctionComponent<CarLibProps> = ()=>{
  const [search, setSearch] = useState<string| undefined>();

  const listData = useMemo(()=>{
    if (search && search.length > 2){
      const bSearch = deburr(search.toLowerCase());
      const searchData = LibErrror.filter(item => {
        return deburr(item.type.toLowerCase()).includes(bSearch) || deburr(item.title.toLowerCase()).includes(bSearch);
      });
      return groupBy(searchData, 'type', []);
    }
    return groupBy(LibErrror, 'type', []);
  }, [search]);

  const dataFormat = useMemo(()=>{
      let formatValues = [];
      for (const property in listData) {
          formatValues.push({
              title: property,
              data: listData[property],
          });
      }
      return formatValues;
  }, [listData]);

  const renderData = useMemo(() =>{
    let renderItem: any = [];
    let index = 1;
    for (const property in listData) {
      renderItem.push(<CarLibItem items={listData[property]} type={property} index={index} key={index}/>);
      index++;
    }
    return renderItem;
  }, [listData]);

  return(
       <View className={'flex-1 bg-ink100 dark:bg-ink700 gap-y-1 p-1'}>
         <Text className={'ts-16s underline text-orange500 '}>Danh sách các lỗi thường gặp:</Text>
         <TouchableWithoutFeedback className={'flex-1'} onPress={()=>{
           Keyboard.dismiss();
         }}>
           <FormInput key={'search-error'}
              inputStyle={{
               borderRadius: 8,
               borderColor: Colors.primaryA500,
              }}
              numberOfLines={1}
              placeholder={'Tìm nhanh'}
              onChangeText={setSearch}
           />
         </TouchableWithoutFeedback>
           <SectionList
               sections={dataFormat}
               keyExtractor={(item, index) => item + index}
               renderItem={({item}) => (
                   <View className={'pl-2 bg-primaryA100 rounded-lg '} style={{
                       marginVertical: 2
                   }}>
                       <Text className={'ts-15b text-primaryB500 dark:text-ink100'}>{item.title}</Text>
                       <Text className={'ts-14b text-black900'}>Nguyên nhân: {item.error}</Text>
                       <Text className={'ts-14s text-orange500'}>Giải pháp: {item.fix}</Text>
                   </View>
               )}
               renderSectionHeader={({section: {title}}) => (
                   <Text className={'ts-18s text-violet-700 rounded'} style={{backgroundColor: Colors.green400, paddingTop: 6}}>{title.toUpperCase()}</Text>
               )}
           />

         {/*<ScrollView contentContainerStyle={{*/}
         {/*  gap: 4,*/}
         {/*}}>*/}
         {/*  {renderData}*/}
         {/*</ScrollView>*/}
       </View>

  );
};

const CarLibItem: FunctionComponent<LibErrorType & {index: number}> = ({type, items, index})=>{
    return(
        <View>
            <Text className={'ts-18s text-violet-700'}>{index}.{type.toUpperCase()}: </Text>
            <View className={'gap-y-1'}>
                {items && items.map((item, index) => (
                    <View key={index.toString() + type} className={'pl-2 bg-primaryA100 rounded-lg'}>
                        <Text className={'ts-15b text-primaryB500 dark:text-ink100'}>{item.title}</Text>
                        <Text className={'ts-14b text-black900'}>Nguyên nhân: {item.error}</Text>
                        <Text className={'ts-14s text-orange500'}>Giải pháp: {item.fix}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export  default CarLib;
