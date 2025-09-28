import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import SignUpForm from '@/components/auth/sign-up-form';
import { primary } from '@/constants/theme';

const SignUp = () => {
  return (
    <View style={{flex:1}}>
        <LinearGradient
        // gradient colors
        colors={[primary, 'white', 'white']}
        style={{height:"100%",padding:10}}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }}   
      >
       <View
       style={{flex:1/8}}
       />
                <SignUpForm/>
      </LinearGradient>
    </View>
  )
}

export default SignUp