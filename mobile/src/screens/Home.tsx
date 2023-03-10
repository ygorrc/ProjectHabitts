import { View, Text, ScrollView } from "react-native";

import { HabitDay, day_size } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";

const weekDays = [ 'D','S','T','Q','Q','S','S']
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = 18*7;
const ammountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

export function Home(){
    return(
        <View className='flex-1 bg-background px-8 pt-16'>
            <Header/>
            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay,i) =>(
                        <Text key={`${weekDay}-${i}`}
                        className='text-zinc-400 text-xl font-bold text-center mx-1'
                        style={ {width: day_size}}
                        >
                            {weekDay}
                        </Text>
                    ))
                }
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:100}}
            >
                <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date =>(
                            <HabitDay
                                key={date.toISOString()}
                            />
                        ))
                    }
                    {
                        ammountOfDaysToFill > 0  && Array.from({length:ammountOfDaysToFill}).map((_,index) => (
                            <View
                                key={index}
                                style={{width: day_size, height:day_size}} 
                                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                            />
                        ))
                    }
                </View>
            </ScrollView>



        </View>
    )
}