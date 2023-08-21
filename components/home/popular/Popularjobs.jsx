import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import { useRouter } from 'expo-router'
import useFetch from '../../../hooks/useFetch'
const Popularjobs = () => {
  const router = useRouter()
  const {refetch,loading,error,data} = useFetch('search',{
    query:'React developer',
    num_pages:1
  })
  const [selectedJob,setSelectedJob] = useState()

  const handleCardPress = (item) => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
             <Text style={styles.headerTitle}> Popular Jobs</Text>
             <TouchableOpacity>
                <Text style={styles.headerBtn}>Show all</Text>
             </TouchableOpacity>
      </View>

     <View style={styles.cardsContainer}>
      {loading?(
        <ActivityIndicator size={'large'} color={COLORS.primary}/>
      ):error?(
        <Text>Something went wrong</Text>
      ) :<FlatList
         data={data}
         renderItem={({item})=>(
              <PopularJobCard
               item={item}
               handleCardPress={handleCardPress}
               selectedJob={selectedJob}
               />
         )}
         horizontal
         contentContainerStyle={{columnGap:SIZES.medium}}
      />}

     </View>
    </View>
  )
}

export default Popularjobs