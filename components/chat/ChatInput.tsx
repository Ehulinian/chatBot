import { TextInput, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useState, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import EvilIcons from "@expo/vector-icons/EvilIcons";

interface ScanInputProps {
  onSubmit?: (input: string) => void;
}

export const ChatInput: React.FC<ScanInputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit?.(input);
      setInput("");
    }
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      console.log("Microphone permission status:", status);
      if (status !== "granted") {
        alert("Permission to access microphone is required!");
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;
      setRecording(true);
      await recording.startAsync();
    } catch (error) {
      console.error("Failed to start recording", error);
      alert("An error occurred while trying to start the recording.");
    }
  };

  const stopRecording = async () => {
    if (recordingRef.current) {
      await recordingRef.current.stopAndUnloadAsync();
      setRecording(false);
      const uri = recordingRef.current.getURI();
      console.log("Recording URI:", uri);
    }
  };

  const clearInput = () => {
    setInput("");
  };

  return (
    <View className="flex-row gap-2 items-center justify-between px-4 pt-4 bg-[#1C1D22]">
      <View className="flex-1 flex-row items-center bg-[#333338] rounded-xl px-4 w-[302] h-12">
        <MaterialCommunityIcons name="line-scan" size={24} color="white" />
        <TextInput
          placeholder="Enter text here..."
          placeholderTextColor="#a1a1a1"
          className="text-white flex-1"
          style={{ height: "100%" }}
          value={input}
          onChangeText={setInput}
        />
        {input.trim() !== "" && (
          <TouchableOpacity
            onPress={clearInput}
            className="w-5 h-5 bg-[#4F4F59] rounded-full items-center justify-center"
          >
            <EvilIcons name="close" size={16} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
        <LinearGradient
          colors={["#448ACA", "#5C34B1"]}
          className="rounded-2xl w-12 h-12 items-center justify-center"
        >
          {input.trim() ? (
            <FontAwesome6
              name="paper-plane"
              size={24}
              color="white"
              onPress={handleSubmit}
            />
          ) : recording ? (
            <FontAwesome6 name="microphone-alt-slash" size={24} color="white" />
          ) : (
            <FontAwesome6 name="microphone" size={24} color="white" />
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
