import {View,Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons, images } from '../constants'
import { Stack, useRouter } from 'expo-router'
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn'
import { ScrollView } from 'react-native-gesture-handler'
import Welcome from '../components/home/welcome/Welcome'
import PopularJobs from '../components/home/popular/Popularjobs'
import NearbyJobs from '../components/home/nearby/Nearbyjobs'
import { useState } from 'react'
const Home = () =>{

 const [ searchTerm,setSearchTerm] = useState('')
 console.log(searchTerm)
const router = useRouter()
    return(
     <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>
          <Stack.Screen
           options={{
            headerStyle:{backgroundColor:COLORS.lightWhite},
            headerShadowVisible:false,
            headerLeft:()=>(
                <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
            ),
            headerRight:()=>(
                <ScreenHeaderBtn iconUrl={images.profile} dimension="60%" />
            ),
            headerTitle :""
           }}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
             <View style={{flex:1,padding:SIZES.medium}}>
                 <Welcome
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  handleClick={()=>{
                    if(searchTerm){
                        router.push(`/search/${searchTerm}`)
                    }
                  }}
                 />
                 <PopularJobs/>
                 <NearbyJobs/>
             </View>
          </ScrollView>
     </SafeAreaView>
    )
}
export default Home