import { View, Text, TextInput } from "react-native";
import React from "react";

type InputFieldProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
};

export const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}: InputFieldProps) => {
  return (
    <View>
      <Text style={{ color: "gray", fontWeight: "600", fontSize: 13 }}>{label}</Text>
      <View
        style={{
          borderColor: "gray",
          borderWidth: 1,
          marginTop: 10,
          borderRadius: 13,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 1,
        }}
      >
        <TextInput
          style={{
            paddingHorizontal: 10,
            flex: 1,
            fontSize: 16,
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};
