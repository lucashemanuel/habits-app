import { useState } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import {Feather} from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function New() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert('Criar hábito', 'Informe o nome do hábito e os dias recorrentes')
      }

      await api.post('/habits', { title, weekDays, })
      setTitle('')
      setWeekDays([])
      Alert.alert('Criar hábito', 'Hábito criado com sucesso')
    } catch (error) {
      console.log(error);    
      Alert.alert('Opa', 'Não foi possível criar o hábito')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{paddingBottom: 100}}>
        <BackButton/>
        <Text className="text-white mt-6 font-extrabold text-3xl">Criar hábito</Text>

        <Text className="text-white mt-6 font-semibold text-base">Qual seu comprometimento?</Text>

        <TextInput className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-zinc-800 border-2 focus:border-green-600" placeholder="Exercícios, dormir bem, etc..." placeholderTextColor={colors.zinc[400]} onChangeText={setTitle} value={title}/>
        <Text className="text-white mt-4 mb-3 font-semibold text-base">Qual a recorrência?</Text>

        {
          availableWeekDays.map((weekDay, index) => (
            <CheckBox key={weekDay} title={weekDay} checked={weekDays.includes(index)} onPress={() => handleToggleWeekDay(index)}/>

          ))
        }

        <TouchableOpacity activeOpacity={0.7} className="w-full flex-row h-14 bg-green-600 items-center justify-center rounded-md mt-6" onPress={handleCreateHabit}>
          <Feather name="check" size={20} color={colors.white}/>
          <Text className="text-white text-base ml-2 font-semibold">
            Confirmar
          </Text>
        </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
}
