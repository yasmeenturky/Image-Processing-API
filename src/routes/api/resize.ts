import express from 'express';
import { Request, Response } from 'express';
import { existsSync } from 'fs';
import path from 'path';
import resizeImage from '../../utils/resizeImage';

const resize = express.Router();

resize.get('/', (req: Request, res: Response) => {
  const fileName = req.query.fileName as unknown as string;
  const filePath = `./assets/${req.query.fileName}.jpg`;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  //check for missing query parameters

  if (!fileName && !width && !height) {
    return res.send('Query Parameters Are Missing');
  }

  if (!width) {
    return res.send('Query Parameter Width is Missing');
  }
  if (!height) {
    return res.send('Query Parameter Height is Missing');
  }

  if (!existsSync(`./assets/${fileName}.jpg`)) {
    return res.send('Image Not Found');
  }

  //checks if the image exists with the required size in the resized folder
  if (existsSync(`./assets/resized/${fileName}-${width}-${height}.jpg`)) {
    return res.sendFile(
      path.resolve(`./assets/resized/${fileName}-${width}-${height}.jpg`)
    );
  }

  //if the image required size is not found resize the image and save it
  else {
    resizeImage(filePath, width, height, fileName);
    setTimeout(function () {
      return res.sendFile(
        path.resolve(`./assets/resized/${fileName}-${width}-${height}.jpg`)
      );
    }, 1000);
  }
});

export default resize;
