import React, { useState } from 'react'
import {
  Text, Box, ScrollView, VStack, HStack, Avatar, Pressable, AvatarFallbackText, Image, AvatarImage
} from '@gluestack-ui/themed';
import * as ImagePicker from 'expo-image-picker';
import { PlusCircleIcon } from 'react-native-heroicons/solid';

interface UserImageUploadProps {
  profilePicURI: string;
  setProfilePicURI: Function;
  fallbackName: string;
}

const UserImageUpload = ({ profilePicURI, setProfilePicURI, fallbackName }: UserImageUploadProps) => {
  const [image, setImage] = useState(profilePicURI);

  const addImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status === "denied") {
      return;
    }


    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (_image.canceled) {
      return;
    }

    const localUri = _image.assets[0].uri

    setImage(localUri)
    setProfilePicURI(localUri)
  };

  return (
    <>
      <Avatar bgColor="#FFF" size="xl" borderRadius="$full">
        {image ? <AvatarImage alt='pfp' source={{
          uri: profilePicURI
        }} /> : <AvatarFallbackText color={"#000"}>{fallbackName}</AvatarFallbackText>}
      </Avatar>
      <Box w={"$5"} h={"$5"} style={{ justifyContent: "center", alignItems: "center", position: "absolute", right: 4, bottom: 4 }} bgColor="#FFF">
        <Pressable onPress={() => addImage()}>
          <PlusCircleIcon size={40} color={"#0077E6"} />
        </Pressable>
      </Box>
    </>
  )
}

export default UserImageUpload