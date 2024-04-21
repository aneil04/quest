import {
  Text, Box, InputIcon, Button, ButtonText, VStack, InputSlot, Input, InputField
} from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../contexts/AuthContext';
import { UserIcon, LockClosedIcon } from 'react-native-heroicons/outline';
import { useState } from 'react';
import { Pressable } from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import auth from '../firebase';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';

const AuthPage = () => {
  const [page, setPage] = useState<string>("sign in")

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={{ backgroundColor: "#000" }}>
      <Box bgColor={"#000"} h={"$full"} alignItems="center" justifyContent="center">
        {page === "sign in" ? <SignInCard setPage={setPage} /> : <SignUpCard setPage={setPage} />}
      </Box>
    </SafeAreaView>
  )
}

interface CardProps {
  setPage: Function;
}

const SignInCard = ({ setPage }: CardProps) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation()
  const { setUser } = useAuthContext()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSignIn() {
    signInWithEmailAndPassword(auth, email, password).then(user => {
      setUser(user.user)
      navigation.navigate("UserStack")
    }).catch(function (error) {
      // unsuccessful sign in
      console.log("There was an error logging in.");
    });
  }

  return (
    <VStack w={"$2/3"} space={"md"} mt={-40}>
      <VStack space='sm'>
        <Text color="#FFF" fontSize={"$4xl"} fontWeight='semibold'>Sign in</Text>
        <Text color="$backgroundDark600" fontSize={"$xl"} >Sign in to your account here</Text>
      </VStack>
      <Input rounded={"$full"} size='xl' pl={"$2"}>
        <InputSlot>
          <InputIcon as={UserIcon} size={"xl"} />
        </InputSlot>
        <InputField color='#FFF' placeholder='Email' type="text" onChangeText={value => setEmail(value)} />
      </Input>
      <Input rounded={"$full"} size='xl' pl={"$2"}>
        <InputSlot>
          <InputIcon as={LockClosedIcon} size={"xl"} />
        </InputSlot>
        <InputField color='#FFF' placeholder='Password' onChangeText={value => setPassword(value)} />
      </Input>
      <Button onPress={() => handleSignIn()} size='xl' rounded="$full" mx={"$10"} backgroundColor={"$pink600"} $active-backgroundColor={"$pink800"}>
        <ButtonText>Sign in</ButtonText>
      </Button>
      <Pressable onPress={() => setPage("sign up")}>
        <Text color="#FFF" ml="auto" mr="auto" underline>Sign up for free</Text>
      </Pressable>
    </VStack>
  )
}

const SignUpCard = ({ setPage }: CardProps) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation()
  const { setUser } = useAuthContext()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")

  function handleSignUp() {
    if (password !== repeatPassword) {
      return;
    }

    createUserWithEmailAndPassword(auth, email, password).then(user => {
      setUser(user.user)
      navigation.navigate("UserStack")
    }).catch(function (error) {
      console.log(error.message);
    });

  }

  return (
    <VStack w={"$2/3"} space={"md"} mt={-40}>
      <VStack space='sm'>
        <Text color="#FFF" fontSize={"$4xl"} fontWeight='semibold'>Create account</Text>
        <Text color="$backgroundDark600" fontSize={"$xl"} >Create a free account here</Text>
      </VStack>
      <Input rounded={"$full"} size='xl' pl={"$2"}>
        <InputSlot>
          <InputIcon as={UserIcon} size={"xl"} />
        </InputSlot>
        <InputField color='#FFF' placeholder='First Name' type="text" onChangeText={value => setFirstName(value)} />
      </Input>
      <Input rounded={"$full"} size='xl' pl={"$2"}>
        <InputSlot>
          <InputIcon as={UserIcon} size={"xl"} />
        </InputSlot>
        <InputField color='#FFF' placeholder='Last Name' type="text" onChangeText={value => setLastName(value)} />
      </Input>
      <Input rounded={"$full"} size='xl' pl={"$2"}>
        <InputSlot>
          <InputIcon as={UserIcon} size={"xl"} />
        </InputSlot>
        <InputField color='#FFF' placeholder='Email' type="text" onChangeText={value => setEmail(value)} />
      </Input>
      <Input rounded={"$full"} size='xl' pl={"$2"}>
        <InputSlot>
          <InputIcon as={LockClosedIcon} size={"xl"} />
        </InputSlot>
        <InputField color='#FFF' placeholder='Password' onChangeText={value => setPassword(value)} />
      </Input>
      <Input rounded={"$full"} size='xl' pl={"$2"}>
        <InputSlot>
          <InputIcon as={LockClosedIcon} size={"xl"} />
        </InputSlot>
        <InputField color='#FFF' placeholder='Repeat Password' onChangeText={value => setRepeatPassword(value)} />
      </Input>
      <Button onPress={() => handleSignUp()} size='xl' rounded="$full" mx={"$10"} backgroundColor={"$pink600"} $active-backgroundColor={"$pink800"}>
        <ButtonText>Sign up</ButtonText>
      </Button>
      <Pressable onPress={() => setPage("sign in")}>
        <Text color="#FFF" ml="auto" mr="auto" underline>Sign in</Text>
      </Pressable>
    </VStack>
  )
}

export default AuthPage