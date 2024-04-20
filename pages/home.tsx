import {
  Text, Box, ScrollView, Image, HStack, Avatar, Center, AvatarFallbackText
} from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import { HeartIcon as HeartIconOutline } from 'react-native-heroicons/outline';

const HomePage = () => {
  return (
    <SafeAreaView edges={["top", "right", "left"]} style={{ backgroundColor: "#FFF" }}>
      <Box bgColor={"#FFF"} h={"$full"}>
        <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{ rowGap: 16 }}>
          <QuestHeader />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </ScrollView>
      </Box>
    </SafeAreaView>
  )
}

interface QuestHeaderProps {
  dailyQuest: string;
}

const QuestHeader = () => {
  return (
    <Center w={"$full"} style={{ backgroundColor: "#FFF" }} borderBottomWidth={1} borderBottomColor={"$backgroundDark300"} pt={3} pb={10}>
      <Text color={"#000"} bold fontSize={"$xl"}>Take a picture of the stars</Text>
    </Center>
  )
}

const Post = () => {
  return (
    <Box>
      <HStack alignItems={"center"} mb={"$2"} pl={"$2"}>
        <Avatar bgColor="#000" size="md" mr={"$2"} borderRadius="$full">
          <AvatarFallbackText>Pealie Poo</AvatarFallbackText>
        </Avatar>
        <Text color={"#000"} fontSize={"$xl"} >Pealie Poo</Text>
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
      <HStack mt={"$2"} pl={"$2"} alignItems={"center"}>
        <HeartIconOutline size={30} color={"#000"} />
        <Text color={"#000"} fontSize={"$xl"} ml={"$1"}>37</Text>
      </HStack>
    </Box>
  )
}

export default HomePage