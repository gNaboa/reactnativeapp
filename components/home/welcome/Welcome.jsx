import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import { icons, SIZES } from '../../../constants'
import styles from './welcome.style'
import { TextInput } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
const Welcome = ( {searchTerm,setSearchTerm,handleClick}) => {

   const jobTypes = ['Full-time', 'Part-time', 'Contractor']
   const [activeJobType, setactiveJobType] = useState('Full-time')
   const router = useRouter()

   return (
      <View>
         <View style={styles.container}>
            <Text style={styles.userName}>Hello Guilherme</Text>
            <Text style={styles.welcomeMessage} >Find your perfect job</Text>
         </View>
         <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
               <TextInput style={styles.searchInput}
                  value={searchTerm}
                  onChange={(text) => { setSearchTerm(text.target.value)}}
                  placeholder='What are you looking for ?'
               />
            </View>
            <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
               <Image
                  source={icons.search}
                  resizeMode='contain'
                  style={styles.searchBtnImage}
               />
            </TouchableOpacity>
         </View>
         <View style={styles.tabsContainer}>
            <FlatList
               data={jobTypes}
               renderItem={({ item }) => (
                  <TouchableOpacity
                     onPress={() => {
                         setactiveJobType(item);
                         router.push(`search/${item}`)
                         }}
                     style={styles.tab(activeJobType, item)}>
                     <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
                  </TouchableOpacity>

               )}
               keyExtractor={item => item}
               contentContainerStyle={{ columnGap: SIZES.small }}
               horizontal
            />
         </View>
      </View>
   )
}

export default Welcome