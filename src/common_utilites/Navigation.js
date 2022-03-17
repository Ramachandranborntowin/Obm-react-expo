import * as React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigationActions,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import IonIcon from "react-native-vector-icons/Ionicons";
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  Alert,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import colors from "../../config/color";
import { Post_Data, Common_Data } from "../redux/login/LoginTypes";
import store from "../redux/store";
import LoaderAction from '../redux/loader/LoaderAction';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TermsOfUse from "../../src/modules/SettingsModule/TermsOfUse/TermsOfUse";
import ChangePassword from "../../src/modules/SettingsModule/ChangePasswordComponent/ChangePassword";
import Marketplace from "../modules/SettingsModule/MarketPlaceComponent/MarketPlacePage";
import PaymentMethod from "../../src/modules/SettingsModule/PaymentMethodComponent/PaymentMethodPage";
import IssuePoints from "../modules/LoyaltyModule/IssuePointComponents/IssuePoints";
import IssuedSuccessfullandCancel from "../modules/LoyaltyModule/IssuePointComponents/IssuedSuccessfullandCancel";
import LoyaltyTransactionDetails from "../modules/LoyaltyModule/LoyaltyComponents/LoyaltyTransactionDetails";
import AddOffer from "../modules/LoyaltyModule/ManageOffersComponents/AddOffer";
// import {Picker} from '@react-native-community/picker';

// import Forgetpassword from './Component/Forgetpassword';
// import DrawerNav from './Component/layout/Drawer';
// import PaymentRequest from './Component/paymentRequest';
// import Loyalty from './Component/Loyalty';
// import QrGenerator from './Component/PaymentRequest/QrGenerator';
// import TransactionDetials from './Component/Transaction/TransactionDetials';
// import IssuePoints from './Component/loyalty/IssuePoints';
// import ManageOffers from './Component/loyalty/ManageOffers';
// import Orderpending from './Component/Orders/Orderpending';
// import Ordercompleted from './Component/Orders/Ordercompleted';
// import '../config/GlobalStyles';
// import store from './Store';
// import QrScanner from './Component/loyalty/QrSacnner';
// import LoyaltyDetails from './Component/loyalty/LoyaltyDetails';
// import AllBranches from './Component/loyalty/AllBranchesModel';
// import IssuedSuccessfullandCancel from './Component/loyalty/IssuedSuccessfulandCancel';
// import ValidateOffers from './Component/loyalty/ValidateOffers';
// import CouponDetails from './Component/loyalty/CouponDetails';
// import ModefiedAddProducts from './Component/VirtualStoreSettings/AddProducts';
// import ModefiedManageProducts from './Component/VirtualStoreSettings/manageProduct';
// import ModefiedEditStore from './Component/VirtualStoreSettings/EditStoreDetails';
// import ModefiedEditProducts from './Component/VirtualStoreSettings/EditProduct';
// import ModefiedManageStaffs from './Component/VirtualStoreSettings/ManageStaff';
// import ModefiedAddStaffs from './Component/VirtualStoreSettings/AddStaff';
// import ModefiedAddServices from './Component/VirtualStoreSettings/AddService';
// import ModefiedEditStaffs from './Component/VirtualStoreSettings/EditStaff';
// import ModefiedManageServices from './Component/VirtualStoreSettings/ManageService';
// import LoyaltyTransactionDetials from './Component/loyalty/LoyaltyTransactionDetials';
// import Orderinprogress from './Component/Orders/Orderinprogress';
// import ManageProduct from './Component/VirtualStoreSettings/manageProduct';
// import EditStoreDetails from './Component/VirtualStoreSettings/EditStoreDetails';
// import EditProduct from './Component/VirtualStoreSettings/EditProduct';
// import Addproducts from './Component/VirtualStoreSettings/AddProducts';
// import ManageStaff from './Component/VirtualStoreSettings/ManageStaff';
// import AddStaff from './Component/VirtualStoreSettings/AddStaff';
// import EditStaff from './Component/VirtualStoreSettings/EditStaff';
// import ManageService from './Component/VirtualStoreSettings/ManageService';
// import AddService from './Component/VirtualStoreSettings/AddService';
// import ServiceFees from './Component/VirtualStoreSettings/ServiceFees';
// import CustomTimeLine from './Component/Orders/customTimeLine';
import DrawerNav from "../animation/Drawer";
import QrgeneratorLandingPage from "../modules/PaymentRequestModule/QrgeneratorComponent/QrgeneratorLandingPage";
import Login from "../modules/LoginModule/LoginComponents/Login";
import ForgetPasswordLandingPage from "../modules/ForgetPasswordModule/ForgetPasswordComponent/Forgetpasswordlandingpage";
import TransactionDetials from "../modules/PaymentRequestModule/TransactionComponent/TransactionDetail";
import ManageOffers from "../modules/LoyaltyModule/ManageOffersComponents/manageOffers";
import ManageOfferDetials from "../modules/LoyaltyModule/ManageOffersComponents/ManageOfferDetials";
import ValidateOffers from "../modules/LoyaltyModule/ValidateOffersComponents/ValidateOffers";
import CouponDetails from "../modules/LoyaltyModule/ValidateOffersComponents/CouponDetails";
import MarketPlaceOrderInProgress from "../modules/MarketPlaceModule/MarketPlaceDetailComponent/MarketPlaceOrderInProgress";
import ModefiedMarketPlaceOrderPending from "../modules/MarketPlaceModule/MarketPlaceDetailComponent/MarketPlaceOrderPending";
import ModefiedMarketPlaceOrderRejected from "../modules/MarketPlaceModule/MarketPlaceDetailComponent/MarketPlaceOrderRejected";
import ModefiedMarketPlaceOrderCompleted from "../modules/MarketPlaceModule/MarketPlaceDetailComponent/MarketPlaceOrderCompleted";
import ModefiedEditStoreDetailLandingPage from "../modules/VirtualStoreSettingsModule/EditStoreDetailComponent/EditStoreDetailLandingPage";
import ModefiedManageProductLandingPage from "../modules/VirtualStoreSettingsModule/ManageProductComponent/ManageProductLandingPage";
import Addproducts from "../modules/VirtualStoreSettingsModule/ManageProductComponent/AddProduct";
import ModefiedManageEditProducts from "../modules/VirtualStoreSettingsModule/ManageProductComponent/EditProduct";
import ModefiedManageStaffLandingPage from "../modules/VirtualStoreSettingsModule/ManageStaffComponent.js/ManageStaffLandingpage";
import ModefiedManageAddStaff from "../modules/VirtualStoreSettingsModule/ManageStaffComponent.js/AddStaff";
import ModefiedManageEditStaff from "../modules/VirtualStoreSettingsModule/ManageStaffComponent.js/EditStaff";
import ModefiedManageServiceLandingPage from "../modules/VirtualStoreSettingsModule/ManageServiceComponent.js/ManageServiceLandingPage";
import ModefiedManageEditService from "../modules/VirtualStoreSettingsModule/ManageServiceComponent.js/EditService";
import ModefiedManageAddService from "../modules/VirtualStoreSettingsModule/ManageServiceComponent.js/AddService"
import ModefiedServiceFeesLandingPage from "../modules/VirtualStoreSettingsModule/ServiceFeesComponent/ServiceFeesLandingPage";
import ModefiedManageProductCategoryLandingPage from "../modules/VirtualStoreSettingsModule/ManageProductCategoryComponent/ManageProductCategoryLandingPage";
import ModefiedEditProductCategory from "../modules/VirtualStoreSettingsModule/ManageProductCategoryComponent/EditProductCategorey";
import ModefiedAddProductCategory from "../modules/VirtualStoreSettingsModule/ManageProductCategoryComponent/AddProductCategorey";
import ModefiedManageServiceCategoryLandingPage from "../modules/VirtualStoreSettingsModule/ManageServiceCategoryComponent/ManageServiceCategoryLandingPage";
import ModefiedEditServiceCategory from "../modules/VirtualStoreSettingsModule/ManageServiceCategoryComponent/EditServiceCategory";
import ModefiedAddServiceCategory from "../modules/VirtualStoreSettingsModule/ManageServiceCategoryComponent/AddServiceCategory";
import { PageLogo } from "../../config/customStylesComponents/customLoginStyleComponent";
import ModefiedCreatePaymentRequest from "../modules/DrawerPaymentRequestModule/ManagePaymentsComponent/CreatePaymentRequest";
import ModefiedPaymentDetails from "../modules/DrawerPaymentRequestModule/ManagePaymentsComponent/PaymentDetails";
import {Biometrics} from "../../config/projectDependency/Biometrics";
import biometrics from "../../config/projectDependency/Biometrics";
import AppLoading from "expo-app-loading";
const Stack = createStackNavigator();
const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);

const Navigator = (props) => {
  console.log('props.biometricsvalue', props.biometricsvalue)
  const [tok, setTok] = React.useState();
  console.log("navigator", props.token);
  // const nav = useNavigation();
  // console.log(nav)
  console.log(props);
  // const [isToken, setIsToken]=React.useState()
  // React.useEffect(async()=>{
  //   setIsToken(await AsyncStorage.getItem('userToken'));
  // }, [])
  // React.useEffect();
  // let tok
  // if(props.biometricsvalue){
  //   biometrics()
  // }
  // const biometricsvalue = React.useMemo(async ()=>{
  //   let biovalue = JSON.parse(await AsyncStorage.getItem("setBiometrics"))
  //   return biovalue
  // })
  const commonDatas = async ()=>{
    let commonData = JSON.parse(await AsyncStorage.getItem("commonData"));
  store.dispatch({ type: Common_Data, payload: commonData });
  }
  // React.useLayoutEffect(async () => {
  //   let touchid = JSON.parse(await AsyncStorage.getItem("TouchId"))
  //   setTouchId(touchid)
  //   let login = JSON.parse(await AsyncStorage.getItem("Login"));
  //   store.dispatch({ type: Post_Data, payload: login });
  //   setTok(await AsyncStorage.getItem("userToken"));
  //   console.log("nav", await AsyncStorage.getItem("userToken"));
  //   // console.log(token);
  // }, [props.token]);
  const getUserToken = async ()=>{
    let login = JSON.parse(await AsyncStorage.getItem("Login"));
    store.dispatch({ type: Post_Data, payload: login });
    setTok(await AsyncStorage.getItem("userToken"));
    console.log("nav", await AsyncStorage.getItem("userToken"));
  }
  getUserToken();
  if(tok !== undefined){
    commonDatas();
    // if(touchid){
      
    // }
    // console.log('helloooooooo', touchid && biometricsvalue && biometricsvalue != null)
  return (
    <NavigationContainer>
      {/* {touchid ? 
      <Stack.Navigator initialRouteName="Biometrics">
      {store.dispatch(LoaderAction(false))}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Biometrics"
        component={Biometrics}
      />
      </Stack.Navigator> :  */}
      {(tok && tok !== null) ? (
        <Stack.Navigator
          initialRouteName="DrawerNav"
          screenOptions={{
            // headerTintColor: colors.primary,
            // headerStyle: {
            //   backgroundColor: colors.secondary,
            // },
            headerShown: false,
          }}
        >
          {store.dispatch(LoaderAction(false))}
          <Stack.Screen
            name="DrawerNav"
            component={DrawerNav}
          />

          <Stack.Screen
            name="QrGenerator"
            component={QrgeneratorLandingPage}
          />
          <Stack.Screen
            name="TransactionDetails"
            component={TransactionDetials}
          />
          <Stack.Screen
            name="PaymentMethods"
            component={PaymentMethod}
          />
          <Stack.Screen
            name="MarketPlace"
            component={Marketplace}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
          />
          <Stack.Screen
            name="TermsOfUse"
            component={TermsOfUse}
          />
          <Stack.Screen
            name="IssuePoints"
            component={IssuePoints}
          />
          <Stack.Screen
            name="ManageOffers"
            component={ManageOffers}
            options={{
              title: `ManageOffers`,
              // headerRight: () => (
              //   // <View><Picker
              //   // // mode="dropdown"
              //   // selectedValue={branches}
              //   // style={{height: 50, width: 110, color: white}}
              //   // onValueChange={(itemValue, itemIndex) =>{
              //   // setBranches(itemValue)
              //   // }}>
              //   // <Picker.Item label="All Branches" value="" />
              //   // <Picker.Item label="Thanjavur" value="Thanjavur" />
              //   // <Picker.Item label="Coimbatore" value="Coimbatore" />
              //   // </Picker>
              //   // <Text style={{width: '100%', height: 60, position: 'absolute', bottom: 0, left: 0}}>{''}</Text>
              //   // </View>
              //   // <AllBranches
              //   //   selectallbranch={setOfferData}
              //   //   data={offerData}
              //   //   type={'dropdown'}
              //   // />
              // ),
            }}
          />
          <Stack.Screen
            name="AddOffer"
            component={AddOffer}
          />
          <Stack.Screen name="ValidateOffers" component={ValidateOffers} />
          <Stack.Screen name="CouponDetails" component={CouponDetails} />
          <Stack.Screen
            name="LoyaltyDetails"
            component={ManageOfferDetials}
          />
          <Stack.Screen
            name="Addproducts"
            component={Addproducts}
          />
          <Stack.Screen
            name="Editproducts"
            component={ModefiedManageEditProducts}
          />
          <Stack.Screen
            name="ManageStaff"
            component={ModefiedManageStaffLandingPage}
          />
          <Stack.Screen
            name="AddStaff"
            component={ModefiedManageAddStaff}
          />
          <Stack.Screen
            name="EditStaff"
            component={ModefiedManageEditStaff}
          />
          <Stack.Screen
            name="EditService"
            component={ModefiedManageEditService}
          />
          <Stack.Screen
            name="AddService"
            component={ModefiedManageAddService}
          />
          <Stack.Screen
            name="ManageService"
            component={ModefiedManageServiceLandingPage}
          />
          <Stack.Screen
            name="Manageproduct"
            component={ModefiedManageProductLandingPage}
          />
          <Stack.Screen
            name="EditStoreDetails"
            component={ModefiedEditStoreDetailLandingPage}
          />
          <Stack.Screen
            name="ServiceFees"
            component={ModefiedServiceFeesLandingPage}
          />
          <Stack.Screen
            name="ManageProductCategory"
            component={ModefiedManageProductCategoryLandingPage}
          />
          <Stack.Screen
            name="EditProductCategory"
            component={ModefiedEditProductCategory}
          />
          <Stack.Screen
            name="AddProductCategory"
            component={ModefiedAddProductCategory}
          />
          <Stack.Screen
            name="ManageServiceCategory"
            component={ModefiedManageServiceCategoryLandingPage}
          />
          <Stack.Screen
            name="EditServiceCategory"
            component={ModefiedEditServiceCategory}
          />
          <Stack.Screen
            name="AddServiceCategory"
            component={ModefiedAddServiceCategory}
          />
          <Stack.Screen
            name="LoyaltyTransactionDetials"
            component={LoyaltyTransactionDetails}
          />
          <Stack.Screen
            name="IssueSuccessfulandCancel"
            component={IssuedSuccessfullandCancel}
          />
          <Stack.Screen
            name="Ordercompleted"
            component={ModefiedMarketPlaceOrderCompleted}
            
          />
          <Stack.Screen
            name="Orderinprogress"
            component={MarketPlaceOrderInProgress}
          />
          <Stack.Screen
            name="Orderpending"
            component={ModefiedMarketPlaceOrderPending}
          />
          <Stack.Screen
            name="Orderrejected"
            component={ModefiedMarketPlaceOrderRejected}
          />
          <Stack.Screen
            name="CreatePaymentRequest"
            component={ModefiedCreatePaymentRequest}
          />
          <Stack.Screen
            name="PaymentDetails"
            component={ModefiedPaymentDetails}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          {store.dispatch(LoaderAction(false))}
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{
              headerTintColor: "black",
              headerTitleStyle: {
                fontSize: 17,
              },
              headerStyle: {
                backgroundColor: colors.Beepplus_light_grey,
                shadowColor: "transparent",
                height: 70,
                headerTintColor: "black",
              },
            }}
            name="Reset Password"
            component={ForgetPasswordLandingPage}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
  }else{
    return(
      // <View style={styles.container}>
      // {store.dispatch(LoaderAction(true))}
      //   <View style={styles.logo_container}>
      //     <PageLogo
      //       height={deviceWidth <= 380 ? 230 : 300}
      //       width={300}
      //       source={require("../../assets/image/logo.png")}
      //     />
      //   </View>
      //   </View>
      <AppLoading />
    )
  }
};

// export default Navigator;
const mapStateToProps = (state) => {
  console.log("navigationstate", state.Token);
  return {
    token: state.Token,
    // biometricsvalue: state.Biometrics
  };
};
export default connect(mapStateToProps, null)(Navigator);

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primary, flex: 1, padding: 45
    },
    logo_container: {
        alignItems: 'center', justifyContent: 'center', flex: 1
    },
  })