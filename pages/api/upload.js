const AWS = require('aws-sdk');
const csvjson = require('csvjson');
// var dayjs = require('dayjs');

const s3 = new AWS.S3({
  accessKeyId: 'AKIAIDEWLR3ZDWO265DQ',
  secretAccessKey: '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',
  region: 'ap-southeast-1',
  apiVersion: '2006-03-01',
});

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { payload, set_day, file_name } = req.body
    const csvData = csvjson.toCSV(payload, { headers: 'key' });
    const paramDaily  = {
      Bucket: 'koh-assets',
      Key: `superai/aimask/dailyreport/${file_name}.csv`,
      ACL: 'public-read',
      Body: csvData,
      ContentType: 'text/csv',
    };
    const params  = {
      Bucket: 'koh-assets',
      Key: `superai/aimask/dailyreport/${set_day}/${file_name}.csv`,
      ACL: 'public-read',
      Body: csvData,
      ContentType: 'text/csv',
    };
    s3.upload(paramDaily, (s3Err, data) => {
      if (s3Err) { throw s3Err }
      if (set_day == undefined) {
        return res.status(200).json({ message: `File uploaded successfully at ${data.Location}` })
      }else{
        s3.upload(params, (s3Err, historyData) => {
          if (s3Err) { throw s3Err }
          return res.status(200).json({ message: `File uploaded successfully at ${historyData.Location}` });
        })
      }
    });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: 'sorry other method is disable for now' })
  }
}
