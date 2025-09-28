import { View, Text } from "react-native";
import React from "react";
import { primary } from "@/constants/theme";
import { useRouter } from "expo-router";

type AuthFooterProps = {
  mode: "signin" | "signup";
  showForgotPassword?: boolean;
  hideOr?:boolean
};

export const AuthFooter = ({ mode, showForgotPassword = false,hideOr=false }: AuthFooterProps) => {
  const router = useRouter();

  const isSignIn = mode === "signin";

  return (
    <View style={{ paddingTop: 20 }}>
      <Text style={{ fontSize: 14, fontWeight: "600", textAlign: "center" }}>
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <Text
          style={{ color: primary }}
          onPress={() => {
            router.push(isSignIn ? "/sign-up" : "/sign-in");
          }}
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </Text>
      </Text>

      {showForgotPassword && (
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            textAlign: "center",
            color: primary,
            paddingTop: 10,
          }}
          onPress={() => router.push("/forgot-password")}
        >
          Forgot Password?
        </Text>
      )}

     {!hideOr &&
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
          marginVertical: 15,
        }}
      >
        <View style={{ flex: 1, borderColor: "gray", borderWidth: 0.5, opacity: 0.5 }} />
        <Text style={{ color: "gray" }}>OR</Text>
        <View style={{ flex: 1, borderColor: "gray", borderWidth: 0.5, opacity: 0.5 }} />
      </View>
     }
    </View>
  );
};
