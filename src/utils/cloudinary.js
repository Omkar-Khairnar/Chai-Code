import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (filePath)=>{
    try{
        if(!filePath) return null;
        const response = await cloudinary.uploader.upload(filePath, { resource_type:auto  })
        //File uploaded successfully
        fs.unlink(filePath)

        return response;
    }
    catch(error){
        fs.unlink(filePath) // remove the locally saved temporary file as the upload operation got failed
        return null
    }
}

export { uploadOnCloudinary}