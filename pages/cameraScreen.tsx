import {
  Box, HStack, Pressable
} from '@gluestack-ui/themed';
import { ArrowPathRoundedSquareIcon, ArrowUturnLeftIcon } from 'react-native-heroicons/solid';
import { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';

const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const navigation: NavigationProp<ParamListBase> = useNavigation()
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function goBack() {
    navigation.goBack()
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <Box h={"$full"} style={{ backgroundColor: "red" }}>
      <Camera style={{ width: "100%", height: "100%", justifyContent: "flex-end" }} type={type}>
        <HStack w={"$full"} justifyContent={"space-between"} px={"$7"} pb={"$12"}>
          <Pressable onPress={() => goBack()} style={{ alignSelf: "center"}}>
            <ArrowUturnLeftIcon color={"#FFF"} size={40} />
          </Pressable>
          <Pressable>
            <Box w={"$24"} h={"$24"} rounded={"$full"} bgColor="#FFF" p={"$2"}>
              <Box w={"$full"} h={"$full"} rounded={"$full"} borderColor="$backgroundDark700" borderWidth={"$2"}></Box>
            </Box>
          </Pressable>
          <Pressable onPress={() => toggleCameraType()} style={{ alignSelf: "center" }}>
            <ArrowPathRoundedSquareIcon color={"#FFF"} size={40} />
          </Pressable>
        </HStack>
      </Camera>
    </Box >
  );
}

export default CameraScreen;