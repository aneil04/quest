import {
  Text, Box, ScrollView, VStack, HStack, Avatar, Pressable, AvatarFallbackText, Button, ButtonText
} from '@gluestack-ui/themed';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FireIcon, HeartIcon as HeartIconOutline } from 'react-native-heroicons/outline';

const LeaderboardPage = () => {
  const [boardType, setBoardType] = useState<string>("votes")
  return (
    <SafeAreaView edges={["top", "right", "left"]} style={{ backgroundColor: "#FFF" }}>
      <Box bgColor={"#FFF"} h={"$full"}>
        <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{ rowGap: 16 }}>
          <LeaderboardHeader boardType={boardType} setBoardType={setBoardType} />
          {boardType === "votes" ?
            <VStack space={"lg"}>
              <VotesCard />
              <VotesCard />
              <VotesCard />
              <VotesCard />
              <VotesCard />
              <VotesCard />
            </VStack> :
            <VStack space={"lg"}>
              <StreaksCard />
              <StreaksCard />
              <StreaksCard />
              <StreaksCard />
              <StreaksCard />
              <StreaksCard />
              <StreaksCard />
              <StreaksCard />
              <StreaksCard />
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
    <VStack bgColor={"#FFF"} space={"md"}>
      <Text color='#000' fontWeight="$semibold" fontSize={"$2xl"} ml={"auto"} mr={"auto"}>Weekly Winners</Text>
      <HStack w={"$full"}>
        <Pressable onPress={() => switchType()} w={"$1/2"}>
          <Box pr={"$2"}>
            <Text bold={boardType === "votes"} fontSize={"$xl"} ml="auto" color='#000'>Votes</Text>
          </Box>
        </Pressable>
        <Pressable onPress={() => switchType()} w={"$1/2"}>
          <Box pl={"$2"}>
            <Text bold={boardType === "streaks"} fontSize={"$xl"} color='#000'>Streaks</Text>
          </Box>
        </Pressable>
      </HStack>
    </VStack>
  )
}

const VotesCard = () => {
  return (
    <HStack alignItems={"center"} px={"$3"}>
      <Avatar bgColor="#000" size="md" mr={"$2"} borderRadius="$full">
        <AvatarFallbackText>Pealie Poo</AvatarFallbackText>
      </Avatar>
      <Text fontSize={"$xl"} >Pealie Poo</Text>
      <HStack mt={"$2"} pl={"$2"} alignItems={"center"} ml={"auto"}>
        <HeartIconOutline size={30} color={"#000"} />
        <Text color={"#000"} fontSize={"$xl"} ml={"$1"}>37</Text>
      </HStack>
    </HStack>
  )
}

const StreaksCard = () => {
  return (
    <HStack alignItems={"center"} px={"$3"}>
      <Avatar bgColor="#000" size="md" mr={"$2"} borderRadius="$full">
        <AvatarFallbackText>Pealie Poo</AvatarFallbackText>
      </Avatar>
      <VStack>
        <Text fontSize={"$xl"} mb={"$1"}>Pealie Poo</Text>
        <WeeklyCalendar />
      </VStack>
      <HStack mt={"$2"} pl={"$2"} alignItems={"center"} ml={"auto"}>
        <FireIcon size={30} color={"#000"} />
        <Text color={"#000"} fontSize={"$xl"} ml={"$1"}>37</Text>
      </HStack>
    </HStack>
  )
}

const WeeklyCalendar = () => {
  return (
    <HStack space={"sm"}>
      <CalendarCell checked={true} />
      <CalendarCell checked={false} />
      <CalendarCell checked={true} />
      <CalendarCell checked={true} />
      <CalendarCell checked={false} />
      <CalendarCell checked={true} />
      <CalendarCell checked={true} />
    </HStack>
  )
}

interface CalendarCellProps {
  checked: Boolean;
}

const CalendarCell = ({ checked }: CalendarCellProps) => {
  return (
    <Box w={"$5"} h={"$5"} bgColor={checked ? "$orange400" : "$backgroundDark100"} borderRadius={"$sm"}></Box>
  )
}

export default LeaderboardPage