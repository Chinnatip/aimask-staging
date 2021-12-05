import { readRemoteFile } from 'react-papaparse'

export interface DistrictType  {
  "เขต": string
  "ใส่หน้ากาก": number
  "ใส่ไม่ถูกต้อง": number
  "ไม่ใส่หน้ากาก": number
  "จำนวนประชากร": number
  "ร้อยละใส่": number
  "error": number
}

export interface DohDistrictType {
  "ภาค": string
  "อำเภอ": string
  "จังหวัด": string
  "ใส่หน้ากาก": number
  "ใส่ไม่ถูกต้อง": number
  "ไม่ใส่หน้ากาก": number
  "จำนวนประชากร": number
  "ร้อยละใส่": number
  "error": number
}

export interface DNDatatype {
  "วันที่": string
  "unix": number
  "weekday": number
  "วัน": string
  "เช้า": number
  "เย็น": number
  "เช้า%": number
  "เย็น%": number
  "เช้าถูก%": number
  "เย็นถูก%": number
  "รวม": number
  "รวม%": number
  "รวมถูก%": number
  "เช้าไม่ถูก": number
  "เย็นไม่ถูก": number
}

export interface DohMarkerType  {
  "จุดตั้งกล้อง": string
  "จังหวัด": string
  "lattitude": number
  "longitude": number
  "นับกล้องต่อหนึ่งสถานที่": number
  "ใส่หน้ากาก": number
  "ใส่ไม่ถูกต้อง": number
  "ไม่ใส่หน้ากาก": number
  "รวม": number
  "ใส่หน้ากาก%": number
  "ใส่ไม่ถูกต้อง%": number
  "ไม่ใส่หน้ากาก%": number
  "note": string
}

export interface MarkerType  {
  "จุดตั้งกล้อง": string
  "เขต": string
  "lattitude": number
  "longitude": number
  "นับกล้องต่อหนึ่งสถานที่": number
  "ใส่หน้ากาก": number
  "ใส่ไม่ถูกต้อง": number
  "ไม่ใส่หน้ากาก": number
  "รวม": number
  "ใส่หน้ากาก%": number
  "ใส่ไม่ถูกต้อง%": number
  "ไม่ใส่หน้ากาก%": number
  "note": string
}

const CSV_PATH = 'https://koh-assets.s3.ap-southeast-1.amazonaws.com/superai/aimask/dailyreport'
const DOH_CSV_PATH = 'https://koh-assets.s3.ap-southeast-1.amazonaws.com/superai/aimask/doh_report'
const TCEL_CSV_PATH = 'https://koh-assets.s3.ap-southeast-1.amazonaws.com/superai/tcels/dailyreport'

export const readCSV = async (file_name: string) => {
  let response = await new Promise((resolve, _) => {
    readRemoteFile(`${CSV_PATH}/${file_name}.csv`, {
      download: true,
      complete: (results: any) => {
        resolve(results)
      }}
    )
  })
  return response
}

export const readDohCSV = async (file_name: string) => {
  let response = await new Promise((resolve, _) => {
    readRemoteFile(`${DOH_CSV_PATH}/${file_name}.csv`, {
      download: true,
      complete: (results: any) => {
        resolve(results)
      }}
    )
  })
  return response
}

export const readTCELCSV = async (file_name: string) => {
  let response = await new Promise((resolve, _) => {
    readRemoteFile(`${TCEL_CSV_PATH}/${file_name}.csv`, {
      download: true,
      complete: (results: any) => {
        resolve(results)
      }}
    )
  })
  return response
}

export const reportParse = (report: any) => {
  let reportDetail : any = {}
  report.data.map((row: string[], index: number) => {
    switch (index){
      case 0: break
      case 5:
        reportDetail['district_image'] = row[1]
        break
      default:
        reportDetail[row[0]] = {
          date: parseInt(row[1]),
          unix: parseInt(row[2]),
          text: row[3]
        }
        break
    }
  })
  return reportDetail
}

export const parseDaynight = (rows: any[], objects: DNDatatype[]) => {
  rows.map((row: any[]) => {
    // console.log(row)
    let response = {
      "วันที่": '',
      "unix": 0,
      "weekday": 0,
      "วัน": '',
      "เช้า": 0,
      "เย็น": 0,
      "รวม": 0,
      "เช้า%": 0,
      "เย็น%": 0,
      "รวม%": 0,
      "เช้าถูก%": 0,
      "เย็นถูก%": 0,
      "รวมถูก%": 0,
      "เช้าไม่ถูก": 0,
      "เย็นไม่ถูก": 0
    }
    row.map((property,index) => {
      // console.log(row)
      switch(index){
        case 0:
          response["วันที่"] = property
          break;
        case 1:
          response["unix"] = parseInt( property)
          break;
        case 2:
          response["weekday"] = parseInt( property)
          break;
        case 3:
          response["วัน"] = property
          break;
        case 4:
          response["เช้าถูก%"] = parseFloat( property)
          break;
        case 5:
          response["เช้า%"] = parseFloat( property)
          break;
        case 6:
          response["เย็นถูก%"] = parseFloat( property)
          break;
        case 7:
          response["เย็น%"] = parseFloat( property)
          break;
        case 8:
          response["รวมถูก%"] = parseFloat( property)
          break;
        case 9:
          response["รวม%"] = parseFloat( property)
          break;
        case 10:
          response["เช้าไม่ถูก"] = parseInt( property)
          break;
        case 11:
          response["เย็นไม่ถูก"] = parseInt( property)
          break;
        case 12:
          response["เช้า"] = parseInt( property)
          break;
        case 13:
          response["เย็น"] = parseInt( property)
          break;
        case 14:
          response["รวม"] = parseInt( property)
          break;
        default:
          response['รวม'] = parseInt( property)
          break;
      }
    })
    // console.log(response)
    objects.push(response)
  })

}

export const parseDohDistrict = (rows: any[], objects: DohDistrictType[]) => {
  // console.log(rows)
  rows.map((row: any[]) => {
    let response = {
      "อำเภอ": '',
      "จังหวัด": '',
      "ภาค": '',
      "ใส่หน้ากาก": 0,
      "ใส่ไม่ถูกต้อง": 0,
      "ไม่ใส่หน้ากาก": 0,
      "จำนวนประชากร": 0,
      "ร้อยละใส่": 0,
      "error": 0
    }
    row.map((property,index) => {
      switch(index){
        case 0:
          response["อำเภอ"] = property
          break;
        case 1:
          response["จังหวัด"] = property
          break;
        case 2:
          response["ภาค"] = property
          break;
        case 3:
          response["ใส่หน้ากาก"] = parseInt( property)
          break;
        case 4:
          response["ใส่ไม่ถูกต้อง"] = parseInt( property)
          break;
        case 5:
          response["ไม่ใส่หน้ากาก"] = parseInt( property)
          break;
        case 6:
          response["จำนวนประชากร"] = parseInt( property)
          break;
        case 7:
          response["ร้อยละใส่"] = Math.floor(parseFloat( property)*10) / 10
          break;
        default:
          response['error'] = Math.floor(parseFloat( property)*10) / 10
          break;
      }
    })
    if(row[0] != ''){
      objects.push(response)
    }
  })
}

export const parseDistrict = (rows: any[], objects: DistrictType[]) => {
  console.log(objects)
  rows.map((row: any[]) => {
    let response = {
      "เขต": '',
      "ใส่หน้ากาก": 0,
      "ใส่ไม่ถูกต้อง": 0,
      "ไม่ใส่หน้ากาก": 0,
      "จำนวนประชากร": 0,
      "ร้อยละใส่": 0,
      "error": 0
    }
    row.map((property,index) => {
      switch(index){
        case 0:
          response["เขต"] = property
          break;
        case 1:
          response["ใส่หน้ากาก"] = parseInt( property)
          break;
        case 2:
          response["ใส่ไม่ถูกต้อง"] = parseInt( property)
          break;
        case 3:
          response["ไม่ใส่หน้ากาก"] = parseInt( property)
          break;
        case 4:
          response["จำนวนประชากร"] = parseInt( property)
          break;
        case 5:
          response["ร้อยละใส่"] = Math.floor(parseFloat( property)*10) / 10
          break;
        default:
          response['error'] = Math.floor(parseFloat( property)*10) / 10
          break;
      }
    })
    if(row[0] != ''){
      objects.push(response)
    }
  })
}

export const parseDohLocation = (rows: any[], objects: DohMarkerType[]) => {
  rows.map((row: any[]) => {
    let response = {
      "จุดตั้งกล้อง": '',
      "จังหวัด": '',
      "lattitude": 0,
      "longitude": 0,
      "นับกล้องต่อหนึ่งสถานที่": 0,
      "ใส่หน้ากาก": 0,
      "ใส่ไม่ถูกต้อง": 0,
      "ไม่ใส่หน้ากาก": 0,
      "รวม": 0,
      "ใส่หน้ากาก%": 0,
      "ใส่ไม่ถูกต้อง%": 0,
      "ไม่ใส่หน้ากาก%": 0,
      "note": ''
    }
    row.map((property,index) => {
      switch(index){
        case 0:
          response["จุดตั้งกล้อง"] = property
          break;
        case 1:
          response["จังหวัด"] = property
          break;
        case 2:
          response["lattitude"] = parseFloat( property)
          break;
        case 3:
          response["longitude"] = parseFloat( property)
          break;
        case 4:
          response["นับกล้องต่อหนึ่งสถานที่"] = parseInt( property)
          break;
        case 5:
          response["ใส่หน้ากาก"] = parseInt( property)
          break;
        case 6:
          response["ใส่ไม่ถูกต้อง"] = parseInt( property)
          break;
        case 7:
          response["ไม่ใส่หน้ากาก"] = parseInt( property)
          break;
        case 8:
          response["รวม"] = parseInt( property)
          break;
        case 9:
          response["ใส่หน้ากาก%"] = parseFloat(property)
          break;
        case 10:
          response["ใส่ไม่ถูกต้อง%"] = parseFloat(property)
          break;
        case 11:
          response["ไม่ใส่หน้ากาก%"] = parseFloat(property)
          break;
        default:
          response['note'] = property
          break;
      }
    })
    objects.push(response)
  })
}

export const parseLocation = (rows: any[], objects: MarkerType[]) => {
  rows.map((row: any[]) => {
    let response = {
      "จุดตั้งกล้อง": '',
      "เขต": '',
      "lattitude": 0,
      "longitude": 0,
      "นับกล้องต่อหนึ่งสถานที่": 0,
      "ใส่หน้ากาก": 0,
      "ใส่ไม่ถูกต้อง": 0,
      "ไม่ใส่หน้ากาก": 0,
      "รวม": 0,
      "ใส่หน้ากาก%": 0,
      "ใส่ไม่ถูกต้อง%": 0,
      "ไม่ใส่หน้ากาก%": 0,
      "note": ''
    }
    row.map((property,index) => {
      switch(index){
        case 0:
          response["จุดตั้งกล้อง"] = property
          break;
        case 1:
          response["เขต"] = property
          break;
        case 2:
          response["lattitude"] = parseFloat( property)
          break;
        case 3:
          response["longitude"] = parseFloat( property)
          break;
        case 4:
          response["นับกล้องต่อหนึ่งสถานที่"] = parseInt( property)
          break;
        case 5:
          response["ใส่หน้ากาก"] = parseInt( property)
          break;
        case 6:
          response["ใส่ไม่ถูกต้อง"] = parseInt( property)
          break;
        case 7:
          response["ไม่ใส่หน้ากาก"] = parseInt( property)
          break;
        case 8:
          response["รวม"] = parseInt( property)
          break;
        case 9:
          response["ใส่หน้ากาก%"] = parseFloat(property)
          break;
        case 10:
          response["ใส่ไม่ถูกต้อง%"] = parseFloat(property)
          break;
        case 11:
          response["ไม่ใส่หน้ากาก%"] = parseFloat(property)
          break;
        default:
          response['note'] = property
          break;
      }
    })
    objects.push(response)
  })
}
