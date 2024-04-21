import {
  Text, Box, ScrollView, Image, HStack, Avatar, Center, AvatarFallbackText, AvatarImage
} from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import { HeartIcon as HeartIconOutline } from 'react-native-heroicons/outline';
import UnlockContentPage from './unlockContent';
import { useQuestContext } from '../contexts/QuestContext';
import { useAuthContext } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';

interface Post {
  imageUrl: string;
  postID: string;
  votes: number;
  userId: string;
  userDisplayName: string;
}

const HomePage = () => {
  const { completedQuest, dailyQuest } = useQuestContext()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch('https://getallposts-mpzx6jfkja-uc.a.run.app/').then(res => res.json()).then((data: Post[]) => {
      setPosts(data)
    }).catch(err => {
      console.log("error getting posts")
    });
  }, [completedQuest])

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={{ backgroundColor: "#000" }}>
      {completedQuest ?
        <Box bgColor={"#000"} h={"$full"}>
          <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{ rowGap: 16 }}>
            <QuestHeader dailyQuest={dailyQuest} />
            {posts?.map(post => <Post key={post.postID} data={post} />)}
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

interface PostProps {
  data: Post
}

const Post = ({ data }: PostProps) => {
  const { user } = useAuthContext()
  const [liked, setLiked] = useState<boolean>(false)
  const [votes, setVotes] = useState<number>(data.votes)

  function upvotePost() {
    if (liked) { //dislike post
      fetch(`https://dislikepost-mpzx6jfkja-uc.a.run.app?postId=${data.postID}&userId=${data.userId}`).then(res => {
        setLiked(false)
        setVotes(votes => votes - 1)
      }).catch(err => {
        console.log("error upvoting post")
      })
    } else { //like post
      fetch(`https://likepost-mpzx6jfkja-uc.a.run.app?postId=${data.postID}&userId=${data.userId}`).then(res => {
        setLiked(true)
        setVotes(votes => votes + 1)
      }).catch(err => {
        console.log("error upvoting post")
      })
    }
  }

  return (
    <Box>
      <HStack alignItems={"center"} mb={"$2"} pl={"$2"}>
        <Avatar bgColor="#FFF" size="md" mr={"$2"} borderRadius="$full">
          {/* <AvatarImage alt='pfp' source={{
            uri: user?.user.photoURL ?? ""
          }} /> */}
          {<AvatarFallbackText color={"#000"}>{user?.user.displayName}</AvatarFallbackText>}
        </Avatar>
        <Text color={"#FFF"} fontSize={"$xl"}>{data.userDisplayName}</Text>
      </HStack>
      <GestureHandlerRootView>
        <TapGestureHandler numberOfTaps={2} onActivated={() => upvotePost()}>
          <Image
            w={"$full"}
            h={"auto"}
            style={{ aspectRatio: 1 }}
            alt="Post Image"
            source={{
              uri: data.imageUrl,
            }}
          />
        </TapGestureHandler>
      </GestureHandlerRootView>
      <HStack mt={"$2"} pl={"$2"} alignItems={"center"}>
        {liked ? <HeartIconSolid size={30} color={"#db2777"} /> : <HeartIconOutline size={30} color={"#FFF"} />}
        <Text color={"#FFF"} fontSize={"$xl"} ml={"$1"}>{votes}</Text>
      </HStack>
    </Box>
  )
}

export default HomePage