import {
  Text, Box, ScrollView, Image, HStack, Avatar, Center, AvatarFallbackText
} from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import { HeartIcon as HeartIconOutline } from 'react-native-heroicons/outline';
import UnlockContentPage from './unlockContent';
import { useQuestContext } from '../contexts/QuestContext';
import { useAuthContext } from '../contexts/AuthContext';

const HomePage = () => {
  const { completedQuest, dailyQuest } = useQuestContext()

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={{ backgroundColor: "#000" }}>
      {completedQuest ?
        <Box bgColor={"#000"} h={"$full"}>
          <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{ rowGap: 16 }}>
            <QuestHeader />
            <Post upvotes={10} />
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

const QuestHeader = () => {
  const { completedQuest, dailyQuest } = useQuestContext()
  return (
    <Center w={"$full"} style={{ backgroundColor: "#000" }} pt={3} pb={10}>
      <Text color={"#FFF"} bold fontSize={"$xl"}>{dailyQuest}</Text>
    </Center>
  )
}

interface PostProps {
  upvotes: Number
}

const Post = ({ upvotes }: PostProps) => {
  const { user } = useAuthContext()

  return (
    <Box>
      <HStack alignItems={"center"} mb={"$2"} pl={"$2"}>
        <Avatar bgColor="#FFF" size="md" mr={"$2"} borderRadius="$full">
          <AvatarFallbackText color={"#000"}>{`${user.first_name} ${user.last_name}`}</AvatarFallbackText>
        </Avatar>
        <Text color={"#FFF"} fontSize={"$xl"} >{`${user.first_name} ${user.last_name}`}</Text>
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
        <Text color={"#FFF"} fontSize={"$xl"} ml={"$1"}>{`${upvotes}`}</Text>
      </HStack>
    </Box>
  )
}

export default HomePage