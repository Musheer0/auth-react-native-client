import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export const OAuthButton = ({ label,isLoading }: { label: string ,isLoading:boolean}) => {
  return (
    <TouchableOpacity
    disabled={isLoading}
      style={{
        borderColor: "#808080ff",
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        justifyContent: "center",
        gap: 20,
      }}
    >
      <Image
        source={require("../../../assets/images/google.png")}
        style={{ width: 30, height: 30 }}
        resizeMode="contain"
      />
      <Text style={{ fontWeight: "800" }}>{label}</Text>
    </TouchableOpacity>
  );
};
