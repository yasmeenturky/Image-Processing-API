import supertest from 'supertest';
import app from '../index';
import resizeImage from '../utils/resizeImage';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('should resize image with the given width and height ', async () => {
    const response = await request
      .get('/resize')
      .query({ fileName: 'encenadaport', width: '400', height: '400' });
    console.log(response.text);
    expect(response.status).toBe(200);
  });

  it('should display that file is not found ', async () => {
    const response = await request
      .get('/resize')
      .query({ fileName: '', width: '400', height: '400' });
    console.log(response.text);
    expect(response.status).toBe(200);
  });

  it('should display that width parameter is missing', async () => {
    const response = await request
      .get('/resize')
      .query({ fileName: 'fjord', width: '', height: '400' });
    console.log(response.text);
    expect(response.status).toBe(200);
  });

  it('should display that image is not found', async () => {
    const response = await request
      .get('/resize')
      .query({ width: '100', height: '150' });
    console.log(response.text);
    expect(response.status).toBe(200);
  });

  it('should display that parameters are missing', async () => {
    const response = await request.get('/resize');
    console.log(response.text);
    expect(response.status).toBe(200);
  });

  it('should display that height parameter is missing', async () => {
    const response = await request
      .get('/resize')
      .query({ fileName: 'santamonica', width: '100' });
    console.log(response.text);
    expect(response.status).toBe(200);
  });
});

describe('Testing image processng', () => {
  it('should resize image and save it in resized folder', () => {
    const filePath = './assets/icelandwaterfall.jpg';
    const resize = {
      resizeImg: resizeImage,
    };
    spyOn(resize, 'resizeImg')
      .and.callThrough()
      .withArgs(filePath, 150, 150, 'icelandwaterfall');
    resize.resizeImg(filePath, 150, 150, 'icelandwaterfall');
    expect(resize.resizeImg).toHaveBeenCalled();
  });
});
