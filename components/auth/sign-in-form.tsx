import { View, Alert, Text } from "react-native";
import React, { useState } from "react";
import { AuthHeader } from "@/components/auth/auth-form/auth-header";
import { InputField } from "@/components/auth/auth-form/input-field";
import { PrimaryButton } from "@/components/auth/auth-form/primary-btn";
import { AuthFooter } from "@/components/auth/auth-form/auth-footer";
import { OAuthButton } from "@/components/auth/auth-form/oauth-btn";
import { auth } from "@/auth/client";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error ,setError]= useState('');
 const [isLoading ,setIsLoading] =useState(false);
 const [verificationId,setVerificationId] = useState('')
  const handleSignUp =async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setError('')
   try {
    setIsLoading(true)
     const res = await auth.SignInCredentialsUser({email,password});
    if(res.mfa){
      Alert.alert("mfa error");
      setError('enter the otp sent to your email')
      setVerificationId(res.verification_id)
      return ;
    }
    if(res.error){
      setError(res.error)
      return;
    }
    if(res.success){
      Alert.alert('Login Success');
      return 
    }
   } catch {
          Alert.alert('Somthing went wrong');
   }
   finally{
    setIsLoading(false)
   }
  };

  return (
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
        title="Welcome back"
        subtitle="Enter the required details below to access your account"
      />

      <View style={{ gap: 20 }}>
        <InputField
          label="Email Address"
          placeholder="jhonedoe@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <InputField
          label="Password"
          placeholder="yoursecurepassword"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error && <Text style={{color:'red'}}>{error}</Text>}
        <PrimaryButton isLoading={isLoading} label="Create Account" onPress={handleSignUp} />
      </View>
      
      {/* Footer (no forgot password on sign up) */}
      <AuthFooter mode="signin" />

      <OAuthButton isLoading={isLoading}  label="Sign In With Google" />
    </View>
  );
};

export default SignInForm;
