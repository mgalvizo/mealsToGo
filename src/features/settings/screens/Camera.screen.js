// Does NOT work with Android emulator
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, CameraType, Constants, PermissionStatus } from 'expo-camera';
import React, { useState, useContext, useRef, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import Text from '../../../components/Typography/Text.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

const ProfileCamera = styled(Camera)`
    width: 100%;
    height: 100%;
`;

const CameraButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    background-color: ${({ theme }) => theme.COLORS.brand.primary};
    justify-content: center;
    align-items: center;
    border-radius: 999px;
`;

const CameraScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const { user } = useContext(AuthenticationContext);
    const [type, setType] = useState(CameraType.back);
    const [flash, setFlash] = useState(Constants.FlashMode.off);
    const cameraRef = useRef();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === PermissionStatus.GRANTED);
        })();
    }, []);

    const snap = async () => {
        try {
            if (cameraRef) {
                const photo = await cameraRef.current.takePictureAsync();
                AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
                navigation.goBack();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const toggleCamera = async () => {
        try {
            setType(currentType =>
                currentType === CameraType.back
                    ? CameraType.front
                    : CameraType.back,
            );
        } catch (err) {
            console.log(err);
        }
    };

    const toggleFlash = async () => {
        try {
            setFlash(currentFlash =>
                currentFlash === Constants.FlashMode.off
                    ? Constants.FlashMode.on
                    : Constants.FlashMode.off,
            );
        } catch (err) {
            console.log(err);
        }
    };

    // Permissions are still loading
    if (hasPermission === null) {
        return <View />;
    }

    // No permission granted
    if (hasPermission === false) {
        return <Text center>No access to camera.</Text>;
    }

    return (
        <ProfileCamera
            type={type}
            flashMode={flash}
            ratio="16:9"
            ref={camera => (cameraRef.current = camera)}
        >
            <CameraButton onPress={snap}>
                <Text style={{ color: 'white' }}>Snap!</Text>
            </CameraButton>
            <CameraButton onPress={toggleCamera}>
                <Text style={{ color: 'white' }}>Flip!</Text>
            </CameraButton>
            <CameraButton onPress={toggleFlash}>
                <Text style={{ color: 'white' }}>Flash!</Text>
            </CameraButton>
        </ProfileCamera>
    );
};

export default CameraScreen;
