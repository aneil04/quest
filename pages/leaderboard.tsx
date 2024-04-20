import {
  Text, Box, ScrollView, VStack, HStack, Avatar, Pressable, AvatarFallbackText, Button, ButtonText
} from '@gluestack-ui/themed';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FireIcon, HeartIcon as HeartIconOutline } from 'react-native-heroicons/outline';

const LeaderboardPage = () => {
  const [boardType, setBoardType] = useState<string>("votes")

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={{ backgroundColor: "#000" }}>
      <Box bgColor={"#000"} h={"$full"}>
        <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={{ rowGap: 16 }} pt={"$0"}>
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

const VotesCard = () => {
  return (
    <HStack alignItems={"center"} px={"$3"}>
      <Avatar bgColor="#FFF" size="md" mr={"$2"} borderRadius="$full">
        <AvatarFallbackText color={"#000"}>Pealie Poo</AvatarFallbackText>
      </Avatar>
      <Text fontSize={"$xl"} color={"#FFF"} >Pealie Poo</Text>
      <HStack mt={"$2"} pl={"$2"} alignItems={"center"} ml={"auto"}>
        <HeartIconOutline size={30} color={"#FFF"} />
        <Text color={"#FFF"} fontSize={"$xl"} ml={"$1"}>37</Text>
      </HStack>
    </HStack>
  )
}

const StreaksCard = () => {
  return (
    <HStack alignItems={"center"} px={"$3"}>
      <Avatar bgColor="#FFF" size="md" mr={"$2"} borderRadius="$full">
        <AvatarFallbackText color={"#000"}>Pealie Poo</AvatarFallbackText>
      </Avatar>
      <VStack>
        <Text fontSize={"$xl"} mb={"$1"} color={"#FFF"}>Pealie Poo</Text>
        <WeeklyCalendar />
      </VStack>
      <HStack mt={"$2"} pl={"$2"} alignItems={"center"} ml={"auto"}>
        <FireIcon size={30} color={"#FFF"} />
        <Text color={"#FFF"} fontSize={"$xl"} ml={"$1"}>37</Text>
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
    <Box w={"$5"} h={"$5"} bgColor={checked ? "$orange500" : "$backgroundDark100"} borderRadius={"$sm"}></Box>
  )
}

export default LeaderboardPage