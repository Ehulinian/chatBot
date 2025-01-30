import React, { useState } from "react";
import { TextInput, View } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { styled } from "nativewind";

const StyledInputContainer = styled(View);
const StyledTextInput = styled(TextInput);

const SearchInput = () => {
  const [search, setSearch] = useState("");

  return (
    <StyledInputContainer className="flex-row items-center bg-[#333338] rounded-xl mb-4 px-4 mx-4 py-3">
      <View className="w-6 h-6 justify-center items-center">
        <EvilIcons name="search" size={24} color="#93939F" />
      </View>
      <StyledTextInput
        className="flex-1 text-white text-[16px] leading-[22px] ml-2"
        placeholder="Search"
        placeholderTextColor="#93939F"
        value={search}
        onChangeText={setSearch}
      />
    </StyledInputContainer>
  );
};

export default SearchInput;
