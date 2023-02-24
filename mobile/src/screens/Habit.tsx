import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { Text, View, ScrollView } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { ProgressBar } from "../components/ProgressBar";

interface Params {
  date: string;
}
export function Habit() {
  
  const route = useRoute();
  const {date} = route.params as Params;
  
  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');
  
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        <BackButton/>

        <Text className="text-base font-semibold text-zinc-400 mt-6 lowercase">
          {dayOfWeek}
        </Text>
        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={50}/>
        <View className="mt-6">
          <CheckBox title="Beber 6L de água" checked={true}/>
          <CheckBox title="Exercitar" checked={false}/>
        </View>
      </ScrollView>
    </View>
  );
}
