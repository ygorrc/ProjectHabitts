import { Dimensions, TouchableOpacity } from "react-native";

const week_days = 7;
const screen_horizontal_padding = (32*2) / 5;

export const day_margin_between =8;
export const day_size = (Dimensions.get('screen').width / week_days) - (screen_horizontal_padding + 5);
export function HabitDay(){
    return(
        <TouchableOpacity 
            style={{width: day_size, height:day_size}} 
            className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
            activeOpacity={0.7}
        />
    )
}