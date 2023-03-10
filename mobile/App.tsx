import { StatusBar, Button } from "react-native";
import "./src/lib/dayjs";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_600SemiBold,
  });

  async function scheduleNotification() {
    const trigger = new Date(Date.now());
    trigger.setMinutes(trigger.getMinutes() + 1);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Olá",
        body: "Você praticou seus hábitos hoje? 💪",
      },
      trigger,
    });
  }

  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <>
      <Routes />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </>
  );
}
