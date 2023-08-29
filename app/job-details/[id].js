import { Stack, router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { COLORS, SIZES, icons } from '../../constants'
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn'
import useFetch from '../../hooks/useFetch'
import Company from '../../components/jobdetails/company/Company'
import JobTabs from '../../components/jobdetails/tabs/Tabs'
import Specifics from '../../components/jobdetails/specifics/Specifics'
import JobAbout from '../../components/jobdetails/about/About'
import { JobFooter } from '../../components'

const tabs = ['About', 'Qualifications', 'Responsibilities']

function JobDetails() {

    const params = useLocalSearchParams()
    const { data, loading, error } = useFetch('job-details', {
        job_id: params.id
    })

    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[0])

    const onRefresh = () => {

    }

    const displayTabContent = () => {
        switch (activeTab) {
            case 'Qualifications':
                return <Specifics
                    title="Qualifications"
                    points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                />
            case 'About':
                return <JobAbout
                    info={data[0].job_description ?? "No data provided"}
                />
            case 'Responsibilities':
                return <Specifics
                    title="Responsibilities"
                    points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                />
            default:
                break;
        }
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

                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            {displayTabContent()}
                        </View>
                    )}
                </ScrollView>

                <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />

            </>

        </SafeAreaView>
    )
}

export default JobDetails