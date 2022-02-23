//List of imported Modules
import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

//Using Router
const resizeImg = express.Router();

//Arrow Function to check if user entered positive new dimentions for the image
const checkIfPosDim = (widthIn: number, heightIn: number): boolean => {
  console.log('Checking Positive Dimensions');
  //Validation variable for user input
  let positiveDim: boolean = false;
  if (widthIn > 0 && heightIn > 0) {
    positiveDim = true;
  }
  console.log(widthIn + ' ' + heightIn + ' ' + positiveDim);
  return positiveDim;
};

//Async/Await function to apply requested image resizing
resizeImg.get(
  '/',
  async (req, res): Promise<void> => {
    //imageFile variables
    //Requested Width
    const width = parseInt((req.query.width as unknown) as string) || 0;
    //Requested Height
    const height = parseInt((req.query.height as unknown) as string) || 0;
    //Requested Image File Name
    const imgname = ((req.query.imgname as unknown) as string) || '';
    //Extracting the Exact File name and Extention
    const name = path.parse(imgname).name;
    const nameext = path.extname(imgname);

    //Available Image folder having all the full size images
    const imgPath = path.resolve('./images/full/' + imgname);
    //Folder for new resized images
    const imgOPath = path.resolve(
      './images/thumbs/' + name + '_' + width + '_' + height + nameext
    );

    //Check if user entered positive dimensions to start processing their Request
    const validatorChk = checkIfPosDim(width, height);
    if (validatorChk) {
      try {
        //Check if file already processed to the needed size before
        if (fs.existsSync(imgOPath)) {
          //Display it directly from the cached file already saved
          res.sendFile(imgOPath);
          //log to the console that it was displayed from cached version
          console.log('File already resized before, displaying cached ' + name);
        } else {
          //otherwise the image is newly processed
          //using Sharp to resize the image

          const resultImg = await sharp(imgPath)
            .resize(width, height)
            // .grayscale()
            .toFile(imgOPath);

          res.sendFile(imgOPath);
          console.log('File resized and saved successfully ' + name);
        }
      } catch (error) {
        res.json({
          width: width,
          height: height,
          imgPath: imgPath,
          imgOPath: imgOPath,
          error: error
        });
      }
    } else {
      //Stay on the same original image full size untill the user enters valid dimensions
      res.sendFile(imgPath);
    }
  }
);

//Exporting Module
export { resizeImg, checkIfPosDim };
