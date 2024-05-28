import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadPhoto } from './apiService';

const EmptyScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Kamera erişimi reddedildi!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log('Çekilen fotoğraf:', result.assets[0].uri);
      setSelectedPhoto(result.assets[0].uri);
      handleUploadPhoto(result.assets[0].uri);
    }
  };

  const handleChooseFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Galeri erişimi reddedildi!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log('Seçilen fotoğraf:', result.assets[0].uri);
      setSelectedPhoto(result.assets[0].uri);
      handleUploadPhoto(result.assets[0].uri)
    }
  };

  const handleUploadPhoto = async (uri) => {
    if (!selectedPhoto) {
      alert('Lütfen önce bir fotoğraf seçin!');
      return;
    }
  
    console.log('Fotoğraf yükleniyor...'); // Fotoğrafın yüklendiğine dair bir mesajı konsola yazdır
  
    try {
      const photoData = new FormData();
      photoData.append('file', {
        uri: uri,
        type: 'image/jpeg', // veya 'image/png' gibi uygun bir medya türü
        name: 'selected-photo.jpg', // veya uygun bir dosya adı
      });
  
      const response = await uploadPhoto(photoData)
      console.log('Server Response:', response);
    } catch (error) {
      console.error('Hata oluştu:', error);
    }
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Köpeğinizin Duygu Durumunu Öğrenin</Text>
      
      <View style={styles.content}>
        <Text style={styles.contentText}>Seçim Yapın</Text>
        
        <Button title="Fotoğraf Çek" onPress={handleTakePhoto} />
        <Button title="Galeriden Seç" onPress={handleChooseFromGallery} />
        {selectedPhoto && (
          <Button title="Fotoğrafı Yükle" onPress={handleUploadPhoto} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  contentText: {
    marginBottom: 20,
    fontSize: 18,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default EmptyScreen;
