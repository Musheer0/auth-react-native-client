import { View, Text, Image } from "react-native";
import React from "react";

export const AuthHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <View>
      <Image
        source={require("../../../assets/images/icon.png")}
        style={{ width: 50, height: 50, borderRadius: 10 }}
        resizeMode="contain"
      />
      <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>{title}</Text>
      <Text style={{ color: "gray", fontSize: 12 }}>{subtitle}</Text>
      <View style={{ width: "100%", height: 35 }} />
    </View>
  );
};
