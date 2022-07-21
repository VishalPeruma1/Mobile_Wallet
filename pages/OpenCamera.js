import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const OpenCamera = () => {
  const [responseCamera, setResponseCamera] = React.useState(null);
  
  return (
    ImagePicker.launchCamera (
      {
        mediaType: 'photo',
        includeBase64: false,
        saveToPhotos: true,
      },
      (response) => {
        console.log(response);
        setResponseCamera(response);
      },
    )
  )
};

export default OpenCamera;