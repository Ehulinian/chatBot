import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SvgComponent from "../SvgComponent";
import { Options } from "../images/Options";
import { Star } from "../images/Star";

export const Header = () => {
  return (
    <View className="flex-row px-4 justify-between items-center mb-4">
      <TouchableOpacity>
        <SvgComponent
          width={24}
          height={24}
          className="items-center justify-center "
        >
          <Options />
        </SvgComponent>
      </TouchableOpacity>

      <Text className="text-white text-[20px] leading-6 text- font-medium">
        Explore
      </Text>
      <LinearGradient
        colors={["#59B0FF", "#925FFF"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-[1] rounded-[48px] "
      >
        <LinearGradient
          colors={["#448ACA", "#5C34B1"]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-[48px] items-center justify-center "
        >
          <View className="pt-1 pb-1 pr-[10px] pl-[10px] rounded-[48px] flex-row items-center justify-center gap-1">
            <SvgComponent width={18} height={18}>
              <Star />
            </SvgComponent>
            <Text className="text-white text-[16px] leading-[22px] font-semibold">
              10
            </Text>
          </View>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};
