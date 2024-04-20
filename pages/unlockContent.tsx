import {
  Text, Box, VStack, Button, ButtonText, ButtonIcon
} from '@gluestack-ui/themed';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { CameraIcon } from 'react-native-heroicons/solid';

const UnlockContentPage = ({ }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation()

  function goToCamera() {
    navigation.navigate("CameraScreen")
  }

  return (
    <Box h={"$full"} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} p={"$5"}>
      <VStack alignItems='center' mb={"$3"} mt={-70}>
        <Text color="#000" fontSize={"$5xl"} textAlign='center' fontWeight='semibold'>Take a picture of the stars</Text>
        <Text color="$backgroundDark400" fontSize={"$md"}>Today's quest</Text>
      </VStack>
      <VStack alignItems='center' mb={"$3"}>
        <Text color="#000" fontSize={"$3xl"} textAlign='center' fontWeight='semibold'>08:23</Text>
        <Text color="$backgroundDark400" fontSize={"$md"}>Time left</Text>
      </VStack>
      <Button onPress={() => goToCamera()} rounded={"$full"} size="xl" backgroundColor='$orange500' $active-backgroundColor='$orange500'>
        <ButtonText mr={"$2"}>Upload</ButtonText>
        <ButtonIcon size={"xl"} as={CameraIcon} />
      </Button>
    </Box>
  )
}

export default UnlockContentPage;