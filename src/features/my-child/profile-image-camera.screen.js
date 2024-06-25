import { useState, useRef } from 'react';
import { StyleSheet, Text, Pressable, View, Image, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

import { GlobalStyles } from '../../../styles/shared.styles';

export default function ProfileImageCameraScreen({route, navigation}) {
  const cameraRef = useRef(null);

  let [facing, changeFacing] = useState('front');
  let [flash, changeFlash] = useState('auto');
  let [permission, requestPermission] = useCameraPermissions();
  
  let [isLoading, changeIsLoading] = useState(false);
  let [picture, changePicture] = useState(undefined)

  // to allow camera permissions to load.
  if (!permission) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  // Camera permissions are not granted yet.
  if (!permission.granted) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text>We need your permission to show the camera</Text>
        <Pressable onPress={requestPermission} style={[GlobalStyles.buttonPrimary]}><Text style={[GlobalStyles.buttonPrimaryContent]}>Grant Permission</Text></Pressable>
      </View>
    );
  }

  retakeClicked = () => {
    changePicture(undefined)
  }

  usePictureClicked = () => {
    route.params(picture.base64);
    navigation.goBack();
  }

  // when picture taken provide options for what to do with it
  if(picture) {
    return (
      <View style={styles.container}>
        <Image source={{uri: picture.uri}} style={styles.renderedPicture}/>
        <View style={styles.imgControlPanel}>
          <Pressable onPress={retakeClicked}>
            <Text style={styles.text}>Retake</Text>
          </Pressable>
          
          <Pressable onPress={usePictureClicked}>
            <Text style={styles.text}>Use this picture</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  toggleCameraFacing = () => {
    changeFacing(prev => (prev === 'back' ? 'front' : 'back'));
  }

  toggleFlash = () => {
    changeFlash(prev => (prev === 'on' ? 'off' : 'on'));
  }

  takePicture = () => {
    changeIsLoading(true)
    cameraRef.current.takePictureAsync({base64: true}).then((pic)=> {
      changeIsLoading(false)
      changePicture(pic)
    })
  }

  // if picture not taken show camera
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} flash={flash} ref={cameraRef}>
        { isLoading && 
          <ActivityIndicator style={GlobalStyles.center} size="large" color="#F85A3E" />
        }
        <View style={styles.footerPanel}>
          <Pressable style={styles.shutter} onPress={takePicture}></Pressable>

          <View style={styles.controlPanel}>
            <Pressable onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </Pressable>
            
            <Pressable onPress={toggleFlash}>
              <Text style={styles.text} onPress={toggleFlash}>flash {!flash}</Text>
            </Pressable>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  camera: {
    flex: 1,
    justifyContent: 'center',
  },

  loading: {
    justifySelf: 'center',
    alignSelf: 'center',
    height: '100%'
  },

  footerPanel: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginBottom: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 20
  },

  shutter: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    backgroundColor: '#fff',
  },

  controlPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'space-evenly',
    gap: 40
  },

  text: {
    fontSize: 16,
    color: 'white',
  },

  renderedPicture: {
    flex: 1
  },

  imgControlPanel: {
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 40,
    paddingVertical: 20,
    paddingHorizontal: 12
  },
});
