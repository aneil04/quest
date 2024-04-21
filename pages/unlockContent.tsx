import {
  Text, Box, VStack, Button, ButtonText, ButtonIcon, Image
} from '@gluestack-ui/themed';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { CameraIcon } from 'react-native-heroicons/solid';
import {useState, useEffect} from 'react';
import { useQuestContext } from '../contexts/QuestContext';
import { Dimensions } from 'react-native';

const UnlockContentPage = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation()
  const { dailyQuest } = useQuestContext()

 

  function goToCamera() {
    navigation.navigate("QuestUpload")
  }

  return (
    <Box bgColor='#000' borderBottomWidth={0.5} borderBottomColor="$backgroundDark800" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start"}} h={"$full"} p={"$5"}>
      <Box alignItems='center' mb={"$1"} mt={0} pt={0}>
        <Image style={{width: 100, height: 25}} source={require('../assets/logo.png')} alt="logo"/>
      </Box>
      
      <Box flex={1} justifyContent="center" width="100%">
        <VStack alignItems='center' mb={"$3"}>
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
      
      
    </Box>
  )
}

export default UnlockContentPage;