import React, { useEffect } from "react";
import { Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function Loader() {
  const Width = useSharedValue(0);
  const xValue = useSharedValue(0);

  const carStyle = useAnimatedStyle(() => {
    return {
      width: Width.value,
      transform: [{ translateX: xValue.value }],
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (Width.value == 45) {
        Width.value = withTiming(300, { duration: 1000 });
      } else {
        Width.value = withTiming(45, { duration: 1000 });
      }
    }, 2000);
    return () => {
      clearInterval(interval, 2000);
    };
  }, []);

  return (
    <>
      <Animated.View
        style={[
          {
            backgroundColor: "#000",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            alignSelf: "center",
            padding: 12,
            marginTop: 22,
            borderRadius: 35,
          },
          carStyle,
        ]}
      >
        <Image
          source={require("../assets/car.png")}
          style={{ width: 22, height: 22, marginRight: 12 }}
          tintColor={"#fff"}
        />
        <Image
          source={require("../assets/car.png")}
          style={{ width: 22, height: 22 }}
          tintColor={"#fff"}
        />
      </Animated.View>
    </>
  );
}
