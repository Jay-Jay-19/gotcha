import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress;'

const PreparingOrderScreen = () => {

  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/orderLoading.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 font-bold text-center"
      >
        En attente de la confirmation du restaurant !
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="#004aad"/>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;