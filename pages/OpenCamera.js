import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
const OpenCamera = () => {
  const [responseCamera, setResponseCamera] = React.useState(null);
  const [responseGallery, setResponseGallery] = React.useState(null);

  const openCameraWithPermission = async () => {
    try {
        ImagePicker.launchCamera(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
          },
          (response) => {
            console.log(response);
            setResponseCamera(response);
            setResponseGallery(null);
          },
        );
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    openCameraWithPermission()
  )
};

export default OpenCamera;