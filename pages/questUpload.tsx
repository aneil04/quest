import {
  Box, HStack, Pressable, Image, Button, ButtonText, ButtonIcon
} from '@gluestack-ui/themed';
import { ArrowPathRoundedSquareIcon, ArrowUturnLeftIcon } from 'react-native-heroicons/solid';
import { useState } from 'react';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { PaperAirplaneIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { useQuestContext } from '../contexts/QuestContext';

const QuestUpload = () => {
  const [image, setImage] = useState<CameraCapturedPicture>()

  return (
    <Box h={"$full"}>
      {image ? <ImageScreen image={image} setImage={setImage} /> : <CameraScreen setImage={setImage} />}
    </Box >
  );
}

interface CameraScreenProps {
  setImage: Function;
}

const CameraScreen = ({ setImage }: CameraScreenProps) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation()
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState<Camera>()

  function goBack() {
    navigation.goBack()
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function takePicture() {
    camera?.takePictureAsync({ onPictureSaved: onPicSaved });
  }

  const onPicSaved = (photo: CameraCapturedPicture) => {
    setImage(photo)
  }

  return (
    <Camera ref={ref => { if (ref) { setCamera(ref) } }} style={{ width: "100%", height: "100%", justifyContent: "flex-end" }} type={type}>
      <HStack w={"$full"} justifyContent={"space-between"} px={"$7"} pb={"$12"}>
        <Pressable onPress={() => goBack()} style={{ alignSelf: "center" }}>
          <ArrowUturnLeftIcon color={"#FFF"} size={40} />
        </Pressable>
        <Pressable onPress={() => takePicture()}>
          <Box w={"$24"} h={"$24"} rounded={"$full"} bgColor="rgba(255,255,255,0.8)" p={"$2"}>
            <Box w={"$full"} h={"$full"} rounded={"$full"} borderColor="$backgroundDark700" borderWidth={"$2"}></Box>
          </Box>
        </Pressable>
        <Pressable onPress={() => toggleCameraType()} style={{ alignSelf: "center" }}>
          <ArrowPathRoundedSquareIcon color={"#FFF"} size={40} />
        </Pressable>
      </HStack>
    </Camera>
  )
}

interface ImageScreenProps {
  image: CameraCapturedPicture;
  setImage: Function;
}

const ImageScreen = ({ image, setImage }: ImageScreenProps) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation()
  const { setCompletedQuest } = useQuestContext()

  function cancelImage() {
    setImage(null)
  }

  function postImage() {
    //call api here
    setCompletedQuest(true)
    navigation.navigate("UserStack")
  }

  return (
    <>
      <Pressable onPress={() => cancelImage()} position='absolute' zIndex={1} top={"$16"} left={"$7"}>
        <XMarkIcon size={40} color="#FFF" />
      </Pressable>
      <Button onPress={() => postImage()} position='absolute' size={"xl"} bgColor={"#FFF"} zIndex={1} bottom={"$20"} right={"$7"} rounded={"$full"}>
        <ButtonText color="#000" mr={"$2"}>Post</ButtonText>
        <ButtonIcon size={"xl"} color="#000" as={PaperAirplaneIcon} />
      </Button>
      <Image
        w={"$full"}
        h={"$full"}
        source={{
          uri: image.uri,
        }}
        alt={"image"}
      />
    </>
  )
}

export default QuestUpload;