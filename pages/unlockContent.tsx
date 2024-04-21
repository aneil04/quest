import {
  Text, Box, VStack, Button, ButtonText, ButtonIcon, Image
} from '@gluestack-ui/themed';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { CameraIcon } from 'react-native-heroicons/solid';
import { useState, useEffect } from 'react';
import { useQuestContext } from '../contexts/QuestContext';

const UnlockContentPage = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation()
  const { dailyQuest } = useQuestContext()

  function goToCamera() {
    navigation.navigate("QuestUpload")
  }

  return (
    <Box bgColor='#000' style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }} h={"$full"} p={"$5"}>
      <Box alignItems='center' mb={"$1"} mt={0} pt={0}>
        <Image style={{ width: 100, height: 25 }} source={require('../assets/logo.png')} alt="logo" />
      </Box>
      <Box flex={1} justifyContent="center" width="100%" mt={-40}>
        <VStack alignItems='center' mb={"$3"}>
          <Text color="$backgroundDark400" fontSize={"$md"}>Today's quest</Text>
          <Text color="#FFF" fontSize={"$5xl"} textAlign='center' fontWeight='semibold'>{dailyQuest}</Text>
        </VStack>
        <Countdown />
        <Button mx={"$20"} onPress={() => goToCamera()} rounded={"$full"} size="xl" backgroundColor={"$pink600"} $active-backgroundColor={"$pink800"}>
          <ButtonText mr={"$2"}>Upload</ButtonText>
          <ButtonIcon size={"xl"} as={CameraIcon} />
        </Button>
      </Box>
    </Box>
  )
}

const Countdown = () => {
  const [currentTime, setCurrentTime] = useState<number>(getTimeTillNext10am());

  // Function to get the time remaining until the next 10am
  function getTimeTillNext10am() {
    const now = new Date();
    const easternOffset = 0; // Eastern Time offset from UTC
    const easternNow = new Date(now.getTime() + easternOffset * 3600 * 1000);
    const next10am = new Date(easternNow);
    next10am.setHours(10, 0, 0, 0);

    if (easternNow.getHours() >= 10) {
      next10am.setDate(next10am.getDate() + 1);
    }

    const timeDiff = next10am.getTime() - easternNow.getTime();
    return timeDiff;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTimeTillNext10am());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to format time as hh:mm:ss
  function formatTime(time: number) {
    const hours = Math.floor(time / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((time % (1000 * 60)) / 1000).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <VStack alignItems='center' mb={"$3"}>
      <Text color="$backgroundDark400" fontSize={"$md"}>Time left</Text>
      <Text color="#FFF" fontSize={"$3xl"} textAlign='center' fontWeight='semibold'>{formatTime(currentTime)}</Text>
    </VStack>
  )
}

export default UnlockContentPage;