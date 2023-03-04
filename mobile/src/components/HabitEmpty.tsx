import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';

  export function HabitEmpty() {

    const { navigate } = useNavigation();

    return (
  
        <Text className="text-zinc-400 text-base">Você ainda não tem nenhum hábito registrado {'\n\n'}
          <Text className="text-violet-400 text-base underline active:text-violet-500" onPress={() => navigate('new')}>Cadastre um hábito aqui</Text>
        </Text>
  
    );
  }