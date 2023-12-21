import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
// import * as Progress from 'react-native-progress';

const PreparingOrderScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 7000);
  }, []);

  const loaderAnimation = require("../assets/loaderAnimation.json");

  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
      
      <Animatable.Image
        source={require("../assets/orderLoading.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-72 w-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg text-[#004aad] my-10 font-bold text-center"
      >
        En attente de la confirmation du restaurant !
      </Animatable.Text>

      <LottieView
        source={loaderAnimation}
        autoPlay
        loop
        style={{ width: '40%' }}
      />

      {/* <Progress.Circle size={60} indeterminate={true} color="#004aad" borderWidth={3} indeterminateAnimationDuration={1500}/> */}
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;