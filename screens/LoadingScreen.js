import React from "react";
import { TouchableOpacity, Animated, Image, Text } from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function LoadingScreen() {
  const width = useSharedValue(0);
  const yValue = useSharedValue(60);

  const menuStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      transform: [{ translateY: yValue.value }],
    };
  });

  return (
    <>
      <TouchableOpacity
        style={{
          width: 70,
          height: 70,
          backgroundColor: "#000",
          alignSelf: "center",
          borderRadius: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          width.value = withTiming(300, { duration: 300 });
          yValue.value = withTiming(50, { duration: 300 });
        }}
      >
        <Image
          source={require("./assets/car.png")}
          style={{ width: 30, height: 30 }}
          tintColor={"#fff"}
        />
      </TouchableOpacity>
      <Animated.View
        style={[
          {
            width: 200,
            height: 45,
            borderRadius: 22,
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Get Started</Text>
      </Animated.View>
    </>
  );
}
