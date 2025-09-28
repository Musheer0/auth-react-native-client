import { View, Alert, Text } from "react-native";
import React, { useState } from "react";
import { AuthHeader } from "@/components/auth/auth-form/auth-header";
import { InputField } from "@/components/auth/auth-form/input-field";
import { PrimaryButton } from "@/components/auth/auth-form/primary-btn";
import { AuthFooter } from "@/components/auth/auth-form/auth-footer";
import { auth } from "@/auth/client";
import { LinearGradient } from "expo-linear-gradient";
import { primary } from "@/constants/theme";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error ,setError]= useState('');
 const [isLoading ,setIsLoading] =useState(false);
  const handleSignUp =async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setError('')
   try {
    setIsLoading(true)
     const res = await auth.SignUpCredentialsUser({email,password});
     console.log(res.verification_id)
    if(res.error){
      setError(res.error)
      return;
    }
   } catch {
          Alert.alert('Somthing went wrong');
   }
   finally{
    setIsLoading(false)
   }
  };

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
                 <View
      style={{
        flex: 1,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        paddingTop: 30,
      }}
    >
      <AuthHeader
        title="Verify Your Email"
        subtitle="Enter the otp sent to your email "
      />

      <View style={{ gap: 20 }}>
       <InputField
       label="Enter otp"
       value={email}
       onChangeText={setEmail}
       placeholder="check your email"
       keyboardType="numeric"
       />
        {error && <Text style={{color:'red'}}>{error}</Text>}
        <PrimaryButton isLoading={isLoading} label="Verify Email" onPress={handleSignUp} />
      </View>
      
      {/* Footer (no forgot password on sign up) */}
      <AuthFooter mode="signin" hideOr/>

    </View>
      </LinearGradient>
    </View>
  
  );
};

export default SignUpForm;
