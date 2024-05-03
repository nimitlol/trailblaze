import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import { authContext } from '../context/authContext'

import FooterMenu from '../components/FooterMenu'
import { Button } from '@rneui/themed';
import axios from 'axios';
import { Image } from '@rneui/base';
// import RNFetchBlob from 'rn-fetch-blob';

const Discover=()=>{
//   const [state]=useContext(authContext)
const [selectedImage, setSelectedImage] = useState(null);

const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      // const base64Image = await RNFetchBlob.fs.readFile(selectedImage.uri, 'base64');
      // Assuming 'image' is your image file
      console.log(reqImg)
      const formData = new FormData();
      formData.append('image',  {
        uri: selectedImage.uri,
        name: 'image.jpg', // Name of the file on the server
        type: selectedImage.type,
        // data: base64Image
      });

      const response = await axios.post('http://192.168.216.70:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle response
      console.log(response.data);
      setPrediction(response.data);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };


const openGallery=async()=>{


  const resultG = await launchImageLibrary({
    mediaType:"photo",
    quality:1,
    maxWidth:300,
    maxHeight:300,
    base64:true

  }, (result) => {
    if (!result.didCancel) {
      setSelectedImage(result.assets[0]);
      console.log(result.assets[0]);
    }
  });

  // console.log({resultG})
  reqImg=JSON.stringify(resultG.assets[0].uri)
  console.log(JSON.stringify(resultG.assets[0].uri))
  console.log(resultG)
  
}

const openCamera=async()=>{
  const resultC = await launchCamera({
    mediaType:"photo",
    quality:1,
    maxWidth:300,
    maxHeight:300,
    cameraType:"front",

  });

  console.log(JSON.stringify(resultC.assets[0].fileName))

}

    
  
  return (
    // <SafeAreaView>
    //  <View style={[mainContainer]}>
    //   <View style={[container1]}>
    //   <Text style={[text1]}>Discover</Text>

    //   <TouchableOpacity onPress={openGallery}>
    //     <Text>Open gallery</Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity onPress={openCamera}>
    //     <Text>Open Camera</Text>
    //     </TouchableOpacity>
      
    //  </View>
      


    

    //   <View>
    //   {/* <Text style={[text1]}>{JSON.stringify(state.email,null,4)}</Text> */}
    //   </View>

    //   <FooterMenu></FooterMenu>
     
     
      
    // </View>
    // </SafeAreaView>
    <SafeAreaView>
    <View style={[mainContainer]}>
     <ScrollView>
     <View>
     <View style={[container1]}>
      <Text style={[text1]}>Discover</Text>

      <TouchableOpacity style={{backgroundColor:"skyblue",height:50}} onPress={openGallery}>
        <Text>Open gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor:"skyblue",height:50}} onPress={openCamera}>
        <Text>Open Camera</Text>
        </TouchableOpacity>
      
     </View>
      
       
       
     </View>

     <View>
     <View>
      <Button title="Predict" onPress={handlePredict} />
      {prediction && (
        <View>
          {/* <Image source={{ uri: 'path-to-your-image' }} style={{ width: 200, height: 200 }} /> */}
          <Image source={{ uri: selectedImage.uri }} style={{ width: 200, height: 200 }} />
          <Text style={{color:"black"}}>Predicted Class: {prediction.predicted_class}</Text>
          <Text style={{color:"black"}}>Probability: {prediction.probability}</Text>
        </View>
      )}
    </View>
     </View>
     </ScrollView>

     <FooterMenu></FooterMenu>
    
    
     
   </View>
   </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  mainContainer:{
    display:"flex",
    justifyContent:"space-between",
    height: "100%",
    backgroundColor:"white"
  },
  container1:{
    paddingLeft:27,
    marginTop:36
  }, 
  container2:{},
  text1:{
    color:"black",
    fontSize: 14,
  },
  text2:{}
})

const {mainContainer, container1, container2, text1,text2}=styles
export default Discover





