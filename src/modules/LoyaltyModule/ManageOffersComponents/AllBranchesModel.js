import React, { memo, useState } from "react";
import {
  Button,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { Modal, Checkbox } from "react-native-paper";
import { Header } from "react-native/Libraries/NewAppScreen";
import IonIcon from "react-native-vector-icons/Ionicons";
import colors from "../../../../config/color";
import CustomCheckbox from "../../../../config/customComponents/custom_Checkbox";
import { Formik, Field } from "formik";

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
const styles = StyleSheet.create({
  // input_text: {
  //   fontSize: 16,
  //   color: "black",
  //   borderBottomWidth: 1.5,
  //   borderBottomColor: "#A9A9A9",
  //   margin: 0,
  //   padding: 0,
  // },
  btn_upload: {
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 1,
    // },
    // shadowOpacity: 0.20,
    // shadowRadius: 1.41,

    // elevation: 2,
    // backgroundColor: '#FF9900',
    padding: 12,
    borderRadius: 7,
  },
  // icon: {
  //   alignSelf: "center",
  //   color: "#808080",
  // },
  // clickable_text: {
  //   flexDirection: "row",
  //   borderBottomWidth: 1,
  //   borderColor: "#A9A9A9",
  // },
});
function AllBranches(props) {
  const {
    isModalVisible,
    onDismiss,
    initialAllBranch,
    // setBranch,
    data,
    type,
    // allbranches,
    // setAllBranches,
    selectedBranch,
    onPress,
    // setSelectedBranches,
    saveData,
  } = { ...props };

  const [branch, setBranch] = useState(data);
  const [allbranches, setAllBranches] = useState(initialAllBranch);
  const [selectedBranches, setSelectedBranches] = useState(selectedBranch);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [value, setValue] = useState("All Branches");
  console.log("isModalVisible", isModalVisible);
  // const save = ()=>{
  //   console.log(allbranches)
  //   saveData(allbranches ? "All Branches" : selectedBranches)
  //   onDismiss()
  // }
  return (
    <Field type="text">
      {(params) => {
        const { field } = params;
        return (
          <Modal
            visible={isModalVisible}
            onDismiss={() => {
              // setAllBranches(false)
              onDismiss();
            }}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={[
                styles.btn_upload,
                {
                  backgroundColor: colors.primary,
                  padding: 10,
                  borderRadius: 5,
                  width: deviceWidth / 1.2,
                },
              ]}
            >
              <View style={{ margin: 25 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Offer For
                </Text>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.gray_from_screen,
                    marginTop: 25,
                  }}
                  onPress={() => {
                    if (type == "dropdown") {
                      setValue(item.key);
                      setModalVisible(false);
                    } else {
                      let branches = [...selectedBranches];
                      branches.map((data) => {
                        data.value = false;
                      });
                      setBranch(branches);
                      setAllBranches(!allbranches);
                      setSelectedBranches([]);
                    }
                  }}
                >
                  <Text style={{ marginRight: "auto" }}>All Branches</Text>
                  {type != "dropdown" && (
                    <CustomCheckbox
                      status={allbranches ? "checked" : "unChecked"}
                      onPress={(newValue) => {
                        let branches = [...selectedBranches];
                        console.log("newValue", newValue);
                        branches.map((data) => {
                          data.value = false;
                        });
                        setBranch(branches);
                        setAllBranches(!allbranches);
                        setSelectedBranches([]);
                      }}
                    />
                  )}
                </TouchableOpacity>

                <FlatList
                  data={data}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.gray_from_screen,
                      }}
                      onPress={(newValue) => {
                        let branches = [...data];
                        // branches.map((data) => {
                        //     data.value = false
                        // })
                        setAllBranches(false);
                        branches[index].value = !branches[index].value;
                        setBranch(branches);
                        if (branches[index].value) {
                          setSelectedBranches([...selectedBranches, item]);
                        } else {
                          console.log("else");
                          selectedBranches.splice(index, 1);
                          setSelectedBranches([...selectedBranches]);
                        }
                        // setStatusValue(index)
                      }}
                    >
                      <Text style={{ marginRight: "auto" }}>{item.name}</Text>
                      {type != "dropdown" && (
                        <CustomCheckbox
                          status={item.value ? "checked" : "unChecked"}
                          onPress={(newValue) => {
                            let branches = [...data];
                            // branches.map((data) => {
                            //     data.value = false
                            // })
                            setAllBranches(false);
                            branches[index].value = !branches[index].value;
                            setBranch(branches);
                            if (branches[index].value) {
                              setSelectedBranches([...selectedBranches, item]);
                            } else {
                              console.log("else", selectedBranches);
                              selectedBranches.splice(index, 1);
                              setSelectedBranches([...selectedBranches]);
                            }
                            // setStatusValue(index)
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                />
              </View>
              {type != "dropdown" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: 15,
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.btn_upload,
                      { backgroundColor: colors.common_back_230 },
                    ]}
                    onPress={() => {
                      setAllBranches(false);
                      onDismiss();
                    }}
                  >
                    <Text
                      style={{
                        color: colors.black,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      CLOSE
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.btn_upload,
                      { backgroundColor: colors.secondary, marginLeft: 15 },
                    ]}
                    onPress={() => {
                      saveData(allbranches ? "All Branches" : selectedBranches);
                      onPress(
                        "offerFor",
                        selectedBranches && selectedBranches.length > 0
                          ? selectedBranches.map((obj) => obj.name).join(",")
                          : "All Branches"
                      );
                      onDismiss();
                    }}
                  >
                    <Text
                      style={{
                        color: colors.primary,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      SUBMIT
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Modal>
        );
      }}
    </Field>
  );
}

export default memo(AllBranches);
