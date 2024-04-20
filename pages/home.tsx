import {
  Text, Box, ScrollView, Image, HStack, Avatar, Center, AvatarFallbackText
} from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import { HeartIcon as HeartIconOutline } from 'react-native-heroicons/outline';
import UnlockContentPage from './unlockContent';
import { useState } from 'react';
import { useQuestContext } from '../contexts/QuestContext';

const HomePage = () => {
  const { completedQuest } = useQuestContext()

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={{ backgroundColor: "#000" }}>
      {completedQuest ?
        <Box bgColor={"#000"} h={"$full"}>
          <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{ rowGap: 16 }}>
            <QuestHeader dailyQuest="Take a picture of the stars" />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </ScrollView>
        </Box> :
        <UnlockContentPage />
      }
    </SafeAreaView>
  )
}

interface QuestHeaderProps {
  dailyQuest: string;
}

const QuestHeader = ({ dailyQuest }: QuestHeaderProps) => {
  return (
    <Center w={"$full"} style={{ backgroundColor: "#000" }} pt={3} pb={10}>
      <Text color={"#FFF"} bold fontSize={"$xl"}>{dailyQuest}</Text>
    </Center>
  )
}

const Post = () => {
  return (
    <Box>
      <HStack alignItems={"center"} mb={"$2"} pl={"$2"}>
        <Avatar bgColor="#FFF" size="md" mr={"$2"} borderRadius="$full">
          <AvatarFallbackText color={"#000"}>Pealie Poo</AvatarFallbackText>
        </Avatar>
        <Text color={"#FFF"} fontSize={"$xl"} >Pealie Poo</Text>
      </HStack>
      <Image
        w={"$full"}
        h={"auto"}
        style={{ aspectRatio: 1 }}
        alt="Post Image"
        source={{
          uri: "https://cdn.mos.cms.futurecdn.net/xKkFJqojdSd8vJuvCLs5mU.jpg",
        }}
      />
      <HStack mt={"$2"} pl={"$2"} alignItems={"center"}>
        <HeartIconOutline size={30} color={"#FFF"} />
        <Text color={"#FFF"} fontSize={"$xl"} ml={"$1"}>37</Text>
      </HStack>
    </Box>
  )
}

export default HomePage