import { Stack, router, useLocalSearchParams } from 'expo-router'
import React,{useState} from 'react'
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { COLORS, SIZES, icons } from '../../constants'
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn'
import useFetch from '../../hooks/useFetch'
import Company from '../../components/jobdetails/company/Company'
import JobTabs from '../../components/jobdetails/tabs/Tabs'
function JobDetails() {

    const params = useLocalSearchParams()
    const { data, loading, error } = useFetch('job-details', {
        job_id: params.id
    })

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = () => {

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension={'60%'}
                            handlePress={() => router.back()}
                        />
                    ), headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension={'60%'}

                        />
                    ),
                    headerTitle: ''
                }} />
            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {loading ? (
                        <ActivityIndicator size={'large'} color={COLORS.primary} />
                    ) : error ? (
                        <Text>Something went wtrong</Text>
                    ) : data.length === 0 ? (
                        <Text>No data</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            <Company
                            companyLogo={data[0].employer_logo}
                            jobTitle={data[0].job_title}
                            companyName={data[0].employer_name}
                            location={data[0].job_country}
                            />
                        </View>
                    )}
                </ScrollView>
            </>

        </SafeAreaView>
    )
}

export default JobDetails