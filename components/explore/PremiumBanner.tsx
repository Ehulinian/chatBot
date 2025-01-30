import { Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import SvgComponent from "../SvgComponent";
import { GiftWithOpacity } from "../images/GiftWithOpacity";
import { Gift } from "../images/Gift";

export const PremiumBanner = () => {
  return (
    <View className="relative z-[9] px-4 ">
      <LinearGradient
        colors={["#59B0FF", "#925FFF"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-xl p-[1] z-[3] "
      >
        <LinearGradient
          colors={["#4A33A8", "#3354AB"]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="h-[82] rounded-xl p-[18] z-[10] relative overflow-hidden"
        >
          <View className="relative z-1 ">
            <SvgComponent
              width={67}
              height={67}
              className="absolute top-6 left-56 z-[8] "
            >
              <GiftWithOpacity />
            </SvgComponent>

            <SvgComponent
              width={98}
              height={98}
              className="absolute top-0 left-[271] z-[8] "
            >
              <Gift />
            </SvgComponent>
            <Text className="text-white font-bold text-lg">
              Start Your Free 3-Day Premium
            </Text>
            <Text className="text-gray-300 text-sm">
              Click to get started now.
            </Text>
          </View>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};
