import {
  Text, Box, ScrollView, VStack, HStack, Avatar, Pressable, AvatarFallbackText, Image, Center
} from '@gluestack-ui/themed';
import { HeartIcon, FireIcon, PhotoIcon, PencilIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfilePage = () => {
  return (
    <SafeAreaView edges={["top", "right", "left"]} style={{ backgroundColor: "#000" }}>
      <Box bgColor={"#000"} h={"$full"}>
        <ScrollView contentContainerStyle={{ rowGap: 16 }}>
          <ProfileBaner />
          <Stats />
          <UserPost />
          <UserPost />
          <UserPost />
          <UserPost />
          <UserPost />
          <UserPost />
          <UserPost />
        </ScrollView>
      </Box>
    </SafeAreaView>
  )
}

const ProfileBaner = () => {
  return (
    <VStack style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Avatar bgColor="#FFF" size="xl" borderRadius="$full">
        <AvatarFallbackText color={"#000"}>Pealie Poo</AvatarFallbackText>
      </Avatar>
      <Text color={"#FFF"} mt={"$2"} bold fontSize={"$xl"} >Pealie Poo</Text>
      <Text color={"$backgroundDark400"}>I love touching Bowen</Text>
    </VStack>
  )
}

const Stats = () => {
  return (
    <HStack style={{ display: "flex", justifyContent: "space-around", }}>
      <Center>
        <PhotoIcon size={30} color={"#0d82d5"} />
        <Text color={"$backgroundDark400"}>12</Text>
      </Center>
      <Center>
        <HeartIcon size={30} color={"#ff00b3"} />
        <Text color={"$backgroundDark400"}>123</Text>
      </Center>
      <Center>
        <FireIcon size={30} color={"#ff6200"} />
        <Text color={"$backgroundDark400"}>20</Text>
      </Center>
    </HStack>
  )
}

const UserPost = () => {
  return (
    <VStack space={"xs"}>
      <HStack alignItems={"center"} mb={"$1"} ml={"$2"}>
        <PencilIcon color={"#FFF"} size={25} />
        <VStack ml={"$2"}>
          <Text color={"#FFF"} fontSize={"$xl"} fontWeight="$semibold">Take a picture of the stars</Text>
          <Text color={"$backgroundDark400"}>April 20th, 2024</Text>
        </VStack>
      </HStack>
      <Image
        w={"$full"}
        h={"auto"}
        style={{ aspectRatio: 1 }}
        alt="Post Image"
        source={{
          uri: "https://images.ctfassets.net/cnu0m8re1exe/6rkPDdVnHFMDz29XtjWXuY/fc31afa24685cb2babdb2a32dc2bfa7d/shutterstock_169805951.jpg",
        }}
      />
      <HStack ml={"$2"} alignItems={"center"}>
        <HeartIcon size={30} color={"#FFF"} />
        <Text color={"#FFF"} fontSize={"$xl"} ml={"$1"}>37</Text>
      </HStack>
    </VStack>
  )
}

export default ProfilePage