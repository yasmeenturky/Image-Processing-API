import sharp from 'sharp';

const resizeImage = (
  filePath: string,
  width: number,
  height: number,
  fileName: string
) => {
  sharp(filePath)
    .resize(width, height, {
      fit: 'contain',
      position: 'center',
    })
    .toFile(`./assets/resized/${fileName}-${width}-${height}.jpg`) //saves resized image to assets/resized folder
    .then(() => {
      console.log('resized');
    });
};

export default resizeImage;
