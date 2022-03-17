// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
import { KeyboardAvoidingView } from "react-native";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app</Text>
//       <StatusBar backgroundColor={'blue'}/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import * as React from "react";
import { StatusBar } from "react-native";
import colors from "./config/color";
import Navigator from "./src/common_utilites/Navigation";
import Spin from "./src/animation/Spinner";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import "./src/common_utilites/Interceptor";
import {Biometrics} from "./config/projectDependency/Biometrics";
import { RootSiblingParent } from "react-native-root-siblings";
import NetInfo from "@react-native-community/netinfo";
import custom_Alert from "./config/customComponents/custom_Alert";
import biometrics from "./config/projectDependency/Biometrics";
import { useFocusEffect } from "@react-navigation/core";
// import Spin from './src/Component/layout/Spinner'
const App = () => {
  // const [biometricsUpdate, setBiometricsUpdate] = React.useState(true)
  // biometrics()
  // useFocusEffect(
  //   React.useCallback(()=>{
  //     biometrics()
  //   },[])
  // )
  // React.useEffect(()=>{
    
  // },[])
  const connection = NetInfo.addEventListener((state) => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    return state.isConnected;
  });
  return (
    <>
    <Provider store={store}>
      {!connection ? (
        custom_Alert({
          status: "Faild",
          description: "connection Falild !",
          notDisplayLink: false,
        })
      ) : (
          <RootSiblingParent>
            {/* <KeyboardAvoidingView> */}
            {/* <Biometrics /> */}
            <StatusBar backgroundColor={colors.secondary} />
            <Navigator />
            <Spin />
            {/* </KeyboardAvoidingView> */}
          </RootSiblingParent>
      )}
      </Provider>
    </>
  );
};
export default App;
