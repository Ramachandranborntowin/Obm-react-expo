import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import custom_Alert from "../customComponents/custom_Alert";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

const checkFileSize = async (fileURI) => {
  const fileSizeInBytes = await FileSystem.getInfoAsync(fileURI);
  return fileSizeInBytes.size;
};
const useCameraOrGallery = async (getImageFrom, imageName) => {
  console.log("imageName", imageName);
  if (getImageFrom === "openCamera") {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      custom_Alert({
        status: "Faild",
        description: "You've refused to allow this app to access your camera!",
        notDisplayLink: true,
      });
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      let newimage = await manipulateAsync(result.uri, [
        {resize: {width: 480 , height: 640}}], { compress: 1, format: SaveFormat.JPEG })
      return {
        ...newimage,
        size: await checkFileSize(newimage.uri),
        sizeOld: await checkFileSize(result.uri),
        name: imageName,
        type: 'image'
      };
      // return {
      //   ...result, 
      //   size: await checkFileSize(result.uri),
      //   name: imageName,
      //   type: 'image'
      // }
    }
  } else {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      custom_Alert({
        status: "Faild",
        description: "You've refused to allow this app to access your camera!",
        notDisplayLink: true,
      });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      let newimage = await manipulateAsync(result.uri, [
        {resize: {width: 480 , height: 640}}], { compress: 1, format: SaveFormat.JPEG })
      console.log('before image', newimage)
      return {
        ...newimage,
        size: await checkFileSize(newimage.uri),
        sizeOld: await checkFileSize(result.uri),
        name: imageName,
        type: 'image'
      };
      // return {
      //   ...result, 
      //   size: await checkFileSize(result.uri),
      //   name: imageName,
      //   type: 'image',
      //   width: 480,
      //   height: 650
      // }
    }
  }
};
export default useCameraOrGallery;
