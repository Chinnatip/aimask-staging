const AWS = require('aws-sdk');
const csvjson = require('csvjson');

const s3 = new AWS.S3({
  // accessKeyId: process.env.YOUR_AWS_ACCESS_KEY_ID,
  // secretAccessKey: process.env.YOUR_AWS_SECRET_ACCESS_KEY,
  accessKeyId: 'AKIAIDEWLR3ZDWO265DQ',
  secretAccessKey: 'zSLkylI2S1jUqdxHqwLqiv8ZuarzMLke321TyoJ9',
  region: 'ap-southeast-1',
  apiVersion: '2006-03-01',
});


export default function handler(req, res) {
  if (req.method === 'POST') {
    const body    = req.body
    const csvData = csvjson.toCSV(body, { headers: 'key' });
    const params  = {
      Bucket: 'koh-assets',
      Key: `superai/aimask/export_location.csv`,
      ACL: 'public-read',
      Body: csvData,
      ContentType: 'text/csv',
    };
    s3.upload(params, (s3Err, data) => {
      if (s3Err) {
        throw s3Err;
      }
      return res.status(200).json({ message: `File uploaded successfully at ${data.Location}` });
    });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: 'sorry other method is disable for now' })
  }
}
