import { View, Text, Button, Alert } from 'react-native';
import React from 'react';
import SignUpForm from '@/components/auth/sign-up-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const Index = () => {
const router = useRouter()
 

  return (
    <View style={{ flex:1}}>
      <View
      style={{}}
      />
     <SafeAreaView>
      <Button title='test' onPress={()=>router.push('/verify/email/rgweg5r')}/>
      <SignUpForm/>
     </SafeAreaView>
    </View>
  );
};

export default Index;
