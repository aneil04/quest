import {
  Text, Box, ScrollView, VStack, HStack, Avatar, Pressable, AvatarFallbackText, AvatarImage
} from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FireIcon, HeartIcon as HeartIconOutline } from 'react-native-heroicons/outline';
import { useAuthContext } from '../contexts/AuthContext';

interface Vote {
  UserID: string;
  Upvotes: number;
  DisplayName: string;
}

interface Streak {
  UserID: string;
  Streak: number;
  DisplayName: string;
}

const LeaderboardPage = () => {
  const [boardType, setBoardType] = useState<string>("votes")
  const [voteBoardData, setVoteBoardData] = useState<Vote[]>([])
  const [streakBoardData, setStreakBoardData] = useState<Streak[]>([])

  useEffect(() => {
    if (boardType === "votes") {
      fetch("https://gettopusersbyvotes-mpzx6jfkja-uc.a.run.app/").then(res => res.json()).then((data: Vote[]) => {
        setVoteBoardData(data)
      })
    } else {
      fetch("https://gettopusersbystreaks-mpzx6jfkja-uc.a.run.app/").then(res => res.json()).then((data: Streak[]) => {
        setStreakBoardData(data)
      })
    }
  }, [boardType])

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={{ backgroundColor: "#000" }}>
      <Box bgColor={"#000"} h={"$full"}>
        <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{ rowGap: 16 }} pt={"$0"}>
          <LeaderboardHeader boardType={boardType} setBoardType={setBoardType} />
          {boardType === "votes" ?
            <VStack space={"lg"}>
              {voteBoardData?.map((vote) => <VotesCard key={vote.UserID} data={vote} />)}
            </VStack> :
            <VStack space={"lg"}>
              {streakBoardData?.map((streak) => <StreaksCard key={streak.UserID} data={streak} />)}
            </VStack>
          }
        </ScrollView>
      </Box>
    </SafeAreaView>
  )
}

interface LeaderboardHeaderProps {
  boardType: string;
  setBoardType: Function;
}

const LeaderboardHeader = ({ boardType, setBoardType }: LeaderboardHeaderProps) => {
  function switchType() {
    if (boardType === "votes") {
      setBoardType("streaks")
    } else {
      setBoardType("votes")
    }
  }

  return (
    <VStack space={"md"} bgColor="#000">
      <Text color='#FFF' fontWeight="$semibold" fontSize={"$2xl"} ml={"auto"} mr={"auto"}>Weekly Winners</Text>
      <HStack w={"$full"} pb={"$3"}>
        <Pressable onPress={() => switchType()} w={"$1/2"}>
          <Box pr={"$3"}>
            <Text bold={boardType === "votes"} underline={boardType === "votes"} fontSize={"$xl"} ml="auto" color='#FFF'>Votes</Text>
          </Box>
        </Pressable>
        <Pressable onPress={() => switchType()} w={"$1/2"}>
          <Box pl={"$3"}>
            <Text bold={boardType === "streaks"} underline={boardType === "streaks"} fontSize={"$xl"} color='#FFF'>Streaks</Text>
          </Box>
        </Pressable>
      </HStack>
    </VStack>
  )
}

interface VoteCardProps {
  data: Vote
}

const VotesCard = ({ data }: VoteCardProps) => {
  const { user } = useAuthContext()

  return (
    <HStack alignItems={"center"} px={"$3"}>
      <Avatar bgColor="#FFF" size="md" mr={"$2"} borderRadius="$full">
        {/* <AvatarImage alt='pfp' source={{
          uri: user?.user.photoURL ?? ""
        }} /> */}
        {<AvatarFallbackText color={"#000"}>{user?.user.displayName}</AvatarFallbackText>}
      </Avatar>
      <Text fontSize={"$xl"} color={"#FFF"} >{data.DisplayName}</Text>
      <HStack mt={"$2"} pl={"$2"} alignItems={"center"} ml={"auto"}>
        <HeartIconOutline size={30} color={"#FFF"} />
        <Text color={"#FFF"} fontSize={"$xl"} ml={"$1"}>{data.Upvotes}</Text>
      </HStack>
    </HStack>
  )
}

interface StreakCardProps {
  data: Streak
}

const StreaksCard = ({ data }: StreakCardProps) => {
  const { user } = useAuthContext()

  return (
    <HStack alignItems={"center"} px={"$3"}>
      <Avatar bgColor="#FFF" size="md" mr={"$2"} borderRadius="$full">
        {/* <AvatarImage alt='pfp' source={{
          uri: user?.user.photoURL ?? ""
        }} /> */}
        {<AvatarFallbackText color={"#000"}>{user?.user.displayName}</AvatarFallbackText>}
      </Avatar>
      <VStack>
        <Text fontSize={"$xl"} mb={"$1"} color={"#FFF"}>{data.DisplayName}</Text>
        <WeeklyCalendar />
      </VStack>
      <HStack mt={"$2"} pl={"$2"} alignItems={"center"} ml={"auto"}>
        <FireIcon size={30} color={"#FFF"} />
        <Text color={"#FFF"} fontSize={"$xl"} ml={"$1"}>{data.Streak}</Text>
      </HStack>
    </HStack>
  )
}

const WeeklyCalendar = () => {
  return (
    <HStack space={"sm"}>
      <CalendarCell checked={Math.random() > 0.5} />
      <CalendarCell checked={Math.random() > 0.5} />
      <CalendarCell checked={Math.random() > 0.5} />
      <CalendarCell checked={Math.random() > 0.5} />
      <CalendarCell checked={Math.random() > 0.5} />
      <CalendarCell checked={Math.random() > 0.5} />
      <CalendarCell checked={Math.random() > 0.5} />
    </HStack>
  )
}

interface CalendarCellProps {
  checked: Boolean;
}

const CalendarCell = ({ checked }: CalendarCellProps) => {
  return (
    <Box w={"$5"} h={"$5"} bgColor={checked ? "$orange500" : "$backgroundDark100"} borderRadius={"$sm"}></Box>
  )
}

export default LeaderboardPage