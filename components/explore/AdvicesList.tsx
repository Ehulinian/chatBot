import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/RootStackParamList";
import { LinearGradient } from "expo-linear-gradient";
import SvgComponent from "../SvgComponent";
import { Hearts } from "../images/Hearts";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type NavigationProp = StackNavigationProp<RootStackParamList, "Chat">;

interface AdvicesListProps {
  onSelect: (advice: string) => void;
}

export const AdvicesList: React.FC<AdvicesListProps> = ({ onSelect }) => {
  const navigation = useNavigation<NavigationProp>();
  const adviceItems = [
    "Create engaging post, captions in Instagram Create engaging post",
    "Create engaging post, captions in Instagram Create engaging post",
    "Create engaging post, captions in Instagram Create engaging post",
    "Create engaging post, captions in Instagram Create engaging post",
    "Create engaging post, captions in Instagram Create engaging post",
    "Create engaging post, captions in Instagram Create engaging post",
  ];

  const handleSelect = (advice: string) => {
    onSelect(advice);
    navigation.navigate("Chat", {
      initialMessage: advice,
    });
  };

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-4 px-4">
        <Text className="text-white text-xl font-bold">Advices</Text>
        <TouchableOpacity className="flex-row gap-2 items-center">
          <Text className="text-[#CBCBD7]">See All</Text>
          <MaterialCommunityIcons name="greater-than" size={16} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row px-4">
          <View className="flex-col gap-2 mr-2">
            {adviceItems.slice(0, 3).map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(item)}
                className="bg-[#333338] rounded-xl flex-row items-center p-3 justify-center gap-2"
                style={{
                  width: 346,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LinearGradient
                  colors={["#448ACA", "#5C34B1"]}
                  style={{
                    borderRadius: 12,
                    width: 32,
                    height: 32,
                    padding: 7,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SvgComponent width={24} height={24}>
                    <Hearts />
                  </SvgComponent>
                </LinearGradient>
                <Text className="text-[#CBCBD7] font-normal text-[12px] leading-4">
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView>
            <View className="flex-col gap-2">
              {adviceItems.slice(3).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelect(item)}
                  className="bg-[#333338] rounded-xl flex-row items-center p-3 justify-center gap-2 "
                  style={{
                    width: 346,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LinearGradient
                    colors={["#448ACA", "#5C34B1"]}
                    style={{
                      borderRadius: 12,
                      width: 32,
                      height: 32,
                      padding: 7,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SvgComponent width={24} height={24}>
                      <Hearts />
                    </SvgComponent>
                  </LinearGradient>
                  <Text className="text-[#CBCBD7] font-normal text-[12px] leading-4">
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
