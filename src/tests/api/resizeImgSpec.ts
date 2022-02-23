//Testing
//list of importing Modules
import app from '../../index';
import supertest from 'supertest';
import { checkIfPosDim } from '../../routes/api/resizeImg';

const request = supertest(app);
//const resizeImg=resizeImg();

describe('Test Suite 2 endpoint response', () => {
  it('Spec dsc image size', async () => {
    const response = await request
      .get('/api/resizeImg')
      .query({ imgname: 'santamonica.jpg', width: 200, height: 200 });

    expect(response.status).toBe(200);
  });

  it('Spec dsc image negative Dimensions', () => {
    const resultant = checkIfPosDim(-5, 200);

    expect(resultant).toBeFalsy();
  });
});
