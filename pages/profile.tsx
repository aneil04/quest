import {
  Text, Box, ScrollView, VStack, HStack, Avatar, Pressable, AvatarFallbackText, Image, Center, AvatarImage
} from '@gluestack-ui/themed';
import { HeartIcon, FireIcon, PhotoIcon, PencilIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../contexts/AuthContext';
import {useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

interface Post {
  imageUrl: string;
  postID: string;
  votes: number;
  userId: string;
  userDisplayName: string;
  submissionTime: {
    _seconds: number;
    _nanoseconds: number;
  };
}

const ProfilePage = () => {

  const { user } = useAuthContext()

  const [posts, setPosts] = useState<Post[]>([])

  useFocusEffect(
    useCallback(() => {
    const fetchPrevPosts = async () => {
      try {
        const response = await fetch(`https://getprevpostsfromuser-mpzx6jfkja-uc.a.run.app?userId=${user?.user.uid}`); 
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch prev posts:', error);
      }
    };

    fetchPrevPosts();
  })
  );

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={{ backgroundColor: "#000" }}>
      <Box bgColor={"#000"} h={"$full"}>
        <ScrollView contentContainerStyle={{ rowGap: 16 }}>
          <ProfileBaner />
          <Stats />
          {posts.map(post => (
            <UserPost
              key={post.postID}
              imageUrl={post.imageUrl}
              title="Find and take a picture of a statue"
              date={post.submissionTime}
              votes={post.votes}
            />
          ))}
        </ScrollView>
      </Box>
    </SafeAreaView>
  )
}

const ProfileBaner = () => {
  const { user } = useAuthContext()

  return (
    <VStack style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Avatar bgColor="#FFF" size="xl" borderRadius="$full">
        <AvatarImage alt='pfp' source={{
          uri: user?.user.photoURL ?? "" 
        }} />
        <AvatarFallbackText color={"#000"}>{user?.user.displayName}</AvatarFallbackText>
      </Avatar>
      <Text color={"#FFF"} mt={"$2"} bold fontSize={"$xl"} >{user?.user.displayName}</Text>
    </VStack>
  )
}

function formatDateFromTimestamp(timestamp) {
  const date = new Date(timestamp._seconds * 1000); // Convert seconds to milliseconds
  return date.toLocaleDateString("en-US", { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

const Stats = () => {
  const { user } = useAuthContext()
  const [submissionCount, setSubmissionCount] = useState(0);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://getuserdata-mpzx6jfkja-uc.a.run.app?userId=${user?.user.uid}`); 
        const data = await response.json();
        setSubmissionCount(data.QuestSubmissions.length);
        setUpvoteCount(data.Upvotes);
        setStreakCount(data.Streak);
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      }
    };

    fetchUserData();
    })
  );

  return (
    <HStack style={{ display: "flex", justifyContent: "space-around", }}>
      <Center>
        <PhotoIcon size={30} color={"#0d82d5"} />
        <Text color={"$backgroundDark400"}>{submissionCount}</Text>
      </Center>
      <Center>
        <HeartIcon size={30} color={"#ff00b3"} />
        <Text color={"$backgroundDark400"}>{upvoteCount}</Text>
      </Center>
      <Center>
        <FireIcon size={30} color={"#ff6200"} />
        <Text color={"$backgroundDark400"}>{streakCount}</Text>
      </Center>
    </HStack>
  )
}

interface UserPostProps {
  imageUrl: string;
  title: string;
  date: string;
  votes: number;
}
const UserPost = ({ imageUrl, title, date, votes }: UserPostProps) => {
  const formattedDate = formatDateFromTimestamp(date);
  return (
    <VStack space={"xs"}>
      <HStack alignItems={"center"} mb={"$1"} ml={"$2"}>
        <PencilIcon color={"#FFF"} size={25} />
        <VStack ml={"$2"}>
          <Text color={"#FFF"} fontSize={"$xl"} fontWeight="$semibold">{title}</Text>
          <Text color={"$backgroundDark400"}>{formattedDate}</Text>
        </VStack>
      </HStack>
      <Image
        w={"$full"}
        h={"auto"}
        style={{ aspectRatio: 1 }}
        alt="Post Image"
        source={{ uri: imageUrl }}
      />
      <HStack ml={"$2"} alignItems={"center"}>
        <HeartIcon size={30} color={"#FFF"} />
        <Text color={"#FFF"} fontSize={"$xl"} ml={"$1"}>{votes}</Text>
      </HStack>
    </VStack>
  )
}

export default ProfilePage