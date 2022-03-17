import React, {Component, useState, useEffect, useCallback, useMemo} from 'react';
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
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import Timeline from 'react-native-timeline-flatlist';
import colors from "../../../../config/color"
import { styles } from '../MarketPlaceStyles/MarketPlaceOrderStyles';
import CustomFooterButton, { CustomFooterButtonIncludesNestedButton, CustomFooterButtonWithNestedButton } from "../../../../config/customComponents/custom_Footer_Button"
import { StyledFooterButton } from '../../../../config/customStylesComponents/customForgetPasswordStyleComponent';
import { StyledTextButton, StyledTouchableOpacityButtonContainer } from '../../../../config/customStylesComponents/customCancelButton';
import { StyledHorizontalline, StyledHorizontalLineDark } from '../../../../config/customStylesComponents/customHorizontalLine';
import CustomDropDown from '../../../../config/customComponents/custom_Drop_Down';
import { getPasarDetail } from '../../../services/OrdersApi';
import { useFocusEffect } from '@react-navigation/core';
import useDateAndMonth from '../../../../config/customHooks/useDateAndMonth';
import useDateAndMonthOutputText from '../../../../config/customHooks/useDateAndMonthOutputText';
import { StyledSettingsHeading } from '../../../../config/customStylesComponents/customSettingsStylesComponent';
const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);
// const data = [1, 2, 4, 4, 4, 4, 4, 4, 4, 4];
const MarketPlaceDetailPage = (props) => {
  const [list, setList] = useState([])
  const [data, setData] = useState()
  const [language, setlanguage] = useState('java');
    const {name, navigation, apiData} = {...props}
    useFocusEffect(
      useCallback(() => {
        getPasarDetail(apiData.portalid,apiData.portalexternalid,apiData.status,apiData.props.loginData.data.merchant.id, apiData.item.item.order_id).then((res)=>{
          if(res.data.success == 1){
            setList(res.data.data.result)
            setData(res.data.data.orderdetails)
            console.log(res.data.data.orderdetails)
          }
        })
      }, [])
    );
  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      {data && <View style={{margin: 15, marginBottom: 0, flex: 1}}>
        <Heading navigation={navigation} componentname = {name} data={data}/>
        <CustomerDetials data={data}/>
        <ListOfRecords componentname = {name} list={list}/>
        <DetialButton componentname = {name} data={data}/>
      </View>}
    </View>
  );
};
export default MarketPlaceDetailPage;

export const ListOfRecords = (props) => {
    const {componentname, list} = {...props}
  const renderItem = ({item}) => {
    if(componentname == "pending"){
        return <Pendinglist componentname={componentname} item={item}/>
    }else if(componentname == "rejected"){
        return <Rejected componentname={componentname} item={item}/>
    }else if(componentname == "inprogress"){
        return <InprogressList componentname={componentname} item={item}/>
    }else{
        return <Completed componentname={componentname} item={item}/>
    }
  }
  return (
    <>
      <View style={{flexDirection: 'row',marginTop: 10, alignItems: 'center'}}>
        <StyledSettingsHeading>{'Products Details:'}</StyledSettingsHeading>
        {!(componentname == "rejected" || componentname == "pending") &&
        <View style={{flexDirection: 'row', marginLeft: 'auto',}}>
        <CustomFooterButtonWithNestedButton title={"Refund"} paddingSize={7} textSize={14}/>
        {!(componentname == "completed") &&
        <View style={{marginLeft: 7}}>
        <CustomFooterButtonWithNestedButton title={"Re-Schedule"} paddingSize={7} textSize={14} />
        </View>
        }
        </View>
        }
        {componentname == "pending" && <View
          style={{
            flexDirection: 'row',
            marginLeft: 'auto',
            borderBottomColor: colors.border_color,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity style={styles.btn_acceptall}>
            <Text>Accept All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_rejectall}>
            <Text>Reject All</Text>
          </TouchableOpacity>
        </View>}
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={list && list}
        renderItem={renderItem}
        keyExtractor={(item)=>item.order_id}
      />
    </>
  );
};
export const Heading = (params) => {
  const {navigation, componentname, data} = {...params}
  const date = useMemo(()=>{
    const [d] =  data.created_at && useDateAndMonthOutputText(data.created_at)
    return d
  }, [data.created_at && data.created_at])
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontWeight: 'bold'}}>Order Id: #{data.order_id && data.order_id}</Text>
        <Text
          style={{marginLeft: 'auto', color: colors.border_color, fontWeight: 'bold'}}>
           {date}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
      <Text style={{marginVertical: 10, fontWeight: 'bold', color: colors.black}}>
        Status: {componentname}
      </Text>
      <TouchableOpacity style={{backgroundColor: colors.secondary, padding: 4, borderRadius: 5, marginLeft: 'auto'}} onPress={()=>navigation.navigate('CustomTimeLine')}>
        <Text style={{color:colors.primary}}>View Status</Text>
      </TouchableOpacity>
      </View>
      <StyledHorizontalLineDark />
    </>
  );
};
export const CustomerDetials = (props) => {
  const {data} = props
  console.log('datum', data && data)
  return (
    <>
      <View style={{marginVertical: 10}}>
      <StyledSettingsHeading>{'Customer Detials:'}</StyledSettingsHeading>
      </View>
      <Text style={{fontWeight: 'bold'}}>Name: {data.cus_name && data.cus_name}</Text>
      <Text style={{fontWeight: 'bold', marginTop: 10}}>
        Mobile Number: +673{data.cus_mob && data.cus_mob}
      </Text>
      <Text style={{fontWeight: 'bold', marginTop: 10}}>
        Pickup Time: 9:30 AM (dummy data)
      </Text>
      <Text style={{fontWeight: 'bold', marginTop: 10}}>
        Booked Time: {data.created_at && data.created_at}
      </Text>
      <View style={{flexDirection: 'row', width: deviceWidth/1.5}}>
        <Text style={{fontWeight: 'bold', marginTop: 10}}>Address:</Text>
        {data.cus_addr ? <Text
          style={{
            // borderTopLeftRadius: 5,
            // borderBottomRightRadius: 5,
            marginLeft: 5,
            // borderWidth: 1,
            borderColor: colors.grey,
            // padding: 1,
            marginTop: 10,
            // marginBottom: 10,
            fontWeight: 'bold',
          }}>
          {data.cus_addr}
        </Text> : <Text style={{fontWeight: 'bold'}}>Null</Text>}
      </View>
      <StyledHorizontalLineDark />
    </>
  );
};
export const DetialButton = (props) => {
    const {componentname, data} = {...props}
    console.log('data', data.total_price);
  return (
    <View>
      <CustomFooterButton title={`Total Amount:$ ${data.total_price && data.total_price}`} textalignLeft = {true}/>
      {!(componentname == "rejected") && <CustomFooterButtonIncludesNestedButton 
      titleLeft={(componentname == "inprogress" || componentname == "completed") ? 'COMPLETE' : 'SUBMIT'}
      titleRight={'REJECT'} 
      enableRejectButton={componentname == "inprogress" || componentname == "completed"}/>}
    </View>
  );
};

const CommonProductdetails = (props) => {
  const [language, setlanguage] = useState('java');
  const {componentname, item} = props
  return (
    <View>
      <View style={[{flexDirection: 'row', marginVertical: 15, marginLeft: 5}, componentname == "pending" && {alignItems: 'center'}]}>
        <Image
          source={require('../../../../assets/image/no_image.jpeg')}
          style={styles.img}
        />
        <View style={{marginLeft: 20, flex: 1}}>
          <Text style={{fontWeight: 'bold', padding: 2}} numberOfLines={1}>{item.product_name && item.product_name}</Text>
          <Text style={{color: colors.grey, padding: 2}} numberOfLines={1}>{item.unit_name} x{item.qty && item.qty}</Text>
          {componentname == "pending" && <View style={{maxWidth: 200, padding: 2}}><CustomDropDown onValueChange={setlanguage} value={language}/></View>}
        </View>
        <View style={{ marginLeft: 'auto'}}>
        <Text
          style={{ color: colors.secondary}}>
          $ {item.total_price && item.total_price}
        </Text>
        {componentname == "rejected" && <Text style={{color: colors.danger}}>Rejected</Text>}
        {(componentname == "inprogress" || componentname == "completed") && <Text style={{color: colors.success}}>Accepted</Text>}
        </View>
      </View>
      <StyledHorizontalline />
    </View>
  );
};
export const Pendinglist = (props)=>{
  return(
    <CommonProductdetails {...props}/>
  )
}
export const InprogressList = (props) => {
  return(
    <CommonProductdetails {...props}/>
  )
}
export const Rejected = (props) => {
  return(
    <CommonProductdetails {...props}/>
  )
}

export const Completed = (props) =>{
  return(
    <CommonProductdetails {...props}/>
  )
}


// export const Pendinglist = () => {
//   const [language, setlanguage] = useState('java');
//   return (
//     <View>
//       <View style={{flexDirection: 'row', marginVertical: 15, marginLeft: 5}}>
//         <Image
//           source={require('../../../../assets/image/no_image.jpeg')}
//           style={styles.img}
//         />
//         <View style={{marginLeft: 20}}>
//           <Text style={{fontWeight: 'bold'}}>Hati Buyah Sali(BBQ Glazed)</Text>
//           <Text style={{color: colors.grey}}>Skewer x1</Text>
//           {/* <View
//             style={{
//               borderColor: colors.border_color2,
//               // borderStyle: 'dotted',
//               borderWidth: 1,
//               borderRadius: 1,
//               marginRight: 30,
//               backgroundColor: colors.primary,
//             }}>
//             <Picker
//               selectedValue={language}
//               style={{height: 50, marginVertical: -10, color: colors.black}}
//               onValueChange={(itemValue, itemIndex) => setlanguage(itemValue)}>
//               <Picker.Item label="Java" value="java" />
//               <Picker.Item label="JavaScript" value="js" />
//             </Picker>
//             <Text
//               style={{
//                 width: '100%',
//                 height: 60,
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 0,
//               }}>
//               {' '}
//             </Text>
//           </View> */}
//         </View>
//         <Text style={{alignSelf: 'center', marginLeft: 'auto', color: colors.secondary}}>
//           $ 1.00
//         </Text>
//       </View>
//       <StyledHorizontalline />
//     </View>
//   );
// };
// StyledSettingsHeading


