import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { primary } from "@/constants/theme";

export const PrimaryButton = ({ label, onPress,isLoading }: { label: string; onPress: () => void ,isLoading:boolean}) => {
  return (
    <TouchableOpacity
    disabled={isLoading}
      onPress={onPress}
      style={{
        width: "100%",
        backgroundColor: primary,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 14,
        opacity:isLoading? 0.7:1
      }}
    >
      {isLoading ?
    <Text style={{ color: "white", fontWeight: "800" }}>Loading...</Text>:
    <Text style={{ color: "white", fontWeight: "800" }}>{label}</Text>  
    }
    </TouchableOpacity>
  );
};
