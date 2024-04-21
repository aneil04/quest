import {
  Text, Box, VStack, Button, ButtonText, ButtonIcon
} from '@gluestack-ui/themed';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { CameraIcon } from 'react-native-heroicons/solid';
import {useState, useEffect} from 'react';
import { useQuestContext } from '../contexts/QuestContext';

const UnlockContentPage = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation()
  const { dailyQuest } = useQuestContext()

 

  function goToCamera() {
    navigation.navigate("QuestUpload")
  }

  return (
    <Box bgColor='#000' borderBottomWidth={0.5} borderBottomColor="$backgroundDark800" h={"$full"} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} p={"$5"}>
      <VStack alignItems='center' mb={"$3"} mt={-70}>
        <Text color="$backgroundDark400" fontSize={"$md"}>Today's quest</Text>
        <Text color="#FFF" fontSize={"$5xl"} textAlign='center' fontWeight='semibold'>{dailyQuest}</Text>
      </VStack>
      <VStack alignItems='center' mb={"$3"}>
        <Text color="$backgroundDark400" fontSize={"$md"}>Time left</Text>
        <Text color="#FFF" fontSize={"$3xl"} textAlign='center' fontWeight='semibold'>08:23</Text>
      </VStack>
      <Button onPress={() => goToCamera()} rounded={"$full"} size="xl" backgroundColor={"$pink600"} $active-backgroundColor={"$pink800"}>
        <ButtonText mr={"$2"}>Upload</ButtonText>
        <ButtonIcon size={"xl"} as={CameraIcon} />
      </Button>
    </Box>
  )
}

export default UnlockContentPage;