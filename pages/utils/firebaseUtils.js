import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImage = async (uri, imageId) => {
  const storage = getStorage();
  const imageRef = ref(storage, `images/${encodeURIComponent(imageId)}`);


  try {
    
    const response = await fetch(uri);
    const blob = await response.blob();
    
  
    await uploadBytes(imageRef, blob, { contentType: 'image/jpeg' });
    
   
    const downloadURL = await getDownloadURL(imageRef);
    console.log('Image uploaded successfully, URL:', downloadURL);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; 
  }
};
