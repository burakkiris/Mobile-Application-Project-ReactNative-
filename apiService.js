import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://testbook.denizbora.net', // API'nizin temel URL'sini buraya ekleyin
});

export const uploadPhoto = async (photoData) => {
  try {
    console.log("gidiyo");
    const response = await apiService.post('', photoData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiService; // apiService'i de export etmeyi unutmayın
