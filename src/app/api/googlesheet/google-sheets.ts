import { ROWS_PER_PAGE, SORT_OPTIONS } from "@/constants";
import { RiskData } from "../../../types/types";
import { Options, getExtractedOptions } from "./utils/getExtractedOptions";

const { google } = require('googleapis');

const client = new google.auth.JWT(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
  null,
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_PRIVATE_KEY,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth: client });
const sourceTitle = 'sample_data';
const sourceSheetId = '1Y_yiT-_7IimioBvcqiCPwLzTLazfdRyzZ4k3cpQXiAw';


// const createGoogleSheetFromSource = async () => {
//   const newSheetTitle = "risk_data";
//   const newSpreadsheet = await sheets.spreadsheets.create({
//     resource: {
//       properties: {
//         title: newSheetTitle,
//       },
//     },
//   });
//   const newSpreadsheetId = newSpreadsheet.data.spreadsheetId;
//   const range = "A:G";
//   const sourceData = await getData(sourceSheetId, sourceTitle, range);
//   const valueInputOption = 'USER_ENTERED';
//   await sheets.spreadsheets.values.update({
//     spreadsheetId: newSpreadsheetId,
//     range: range,
//     valueInputOption,
//     requestBody: {
//       values: sourceData,
//     }
//   })
//   console.log(newSpreadsheetId)
//   const dataFromNewSheet = await getData(newSpreadsheetId, newSheetTitle, range);
//   console.log(dataFromNewSheet)
// }

const getYearsList = async () => {
  try {
    const dataRange = 'G:G'
    const data: string[] = await getData(sourceSheetId, sourceTitle, dataRange);
    data.shift();
    const dataFlat = data.flat();
    const yearsSet = new Set(dataFlat);
    const years: string[] = Array.from(yearsSet);

    return years;
  } catch (error) {
    console.log("Error retrieveing data");
  }
}

const getRiskFactorList = async () => {
  try {
    const dataRange = 'F:F';
    const data = await getData(sourceSheetId, sourceTitle, dataRange);
    data.shift();
    const dataFlat = data.flat();
    const riskFactorSet = new Set<string>();
    dataFlat.forEach((risks: any) => {
      const riskFactorsStrings = Object.keys(JSON.parse(risks));
      riskFactorsStrings.forEach((rf) => riskFactorSet.add(rf));
    })
    const riskFactors = Array.from(riskFactorSet);
    // console.log(riskFactors);
    return riskFactors;
  } catch (error) {
    console.log("Error retrieveing data");
    
  }
}

const getBusinessCategoryList = async () => {
  try {
    const dataRange = 'D:D';
    const data: string[] = await getData(sourceSheetId, sourceTitle, dataRange);
    data.shift();
    const dataFlat = data.flat();
    const bCtgSet = new Set(dataFlat);
    const businessCategories: string[] = Array.from(bCtgSet);
    return businessCategories;
  } catch (error) {
    console.log("Error retrieveing data");
  }  
}

const getDataFromSpreadSheet = async (range?: string) => {
  try {
    const dataRange = range? range: 'A:G'
    const data = await getData(sourceSheetId, sourceTitle, dataRange);

    // const headers = rows.unshift();
    const riskData: RiskData[] = data.map((row: string[]) => {
      const riskObj: RiskData = {
        assetName: row[0],
        lat: Number(row[1]),
        lng: Number(row[2]),
        businessCategory: row[3],
        riskRating: Number(row[4]),
        riskFactors: row[5],
        year: row[6],
      }
      return riskObj;
    });
    riskData.unshift;
    return riskData;
  } catch (error) {
    console.log("Error retrieveing data");
  }
}

const getFullRiskData = async (selectedYear: string, options?: Options) => {

  try {
    const dataRange = `A:G`;
    const riskData =  await getDataFromSpreadSheet(dataRange);

    if (options == null) {
      const dataByYear = riskData?.filter(({ year } : RiskData) => year == selectedYear);
      return dataByYear;
    } else  {
      const { sortOption, filterOptionsBC, filterOptionsRF } = options;
    
      let dataByYear = riskData?.filter(({ year } : RiskData) => year == selectedYear);
      if (sortOption) {
        switch (sortOption) {
          case SORT_OPTIONS["Risk Rating low to high"]: {
            dataByYear?.sort((a: RiskData, b: RiskData): number => a.riskRating - b.riskRating);
            break;
          }
          case SORT_OPTIONS["Risk Rating high to low"]: {
            dataByYear?.sort((a: RiskData, b: RiskData): number => b.riskRating - a.riskRating);
            break;
          }
          case SORT_OPTIONS["Default"]: {
            break
          }
        }
      }
      if (filterOptionsBC) {
        // console.log('filtering');
        dataByYear = dataByYear?.filter(({businessCategory}: RiskData) => filterOptionsBC.find((option: string) => option == businessCategory));
      }
      if (filterOptionsRF) {
        dataByYear = dataByYear?.filter(({riskFactors}: RiskData) => filterOptionsRF.find((option: string) => riskFactors.includes(option)));
      }
      // dataByYear = dataByYear.slice(startRow, endRow + 1);
      return dataByYear;
    }
  } catch (error) {
    console.log("Error retrieveing data");
  }
}

const getRiskData = async (selectedYear: string, options?: string[]) => {

  try {
    if (options == null) {
      const data = await getFullRiskData(selectedYear);
      return data;
    } else  {
      const filter_sort_options = getExtractedOptions(options);
      const { currentPage } = filter_sort_options; 
      const data = await getFullRiskData(selectedYear, filter_sort_options);
      console.log('currnetPage:' + currentPage);
      // let startRow = 1;
      // let endRow = ROWS_PER_PAGE;
      // if (currentPage) {
      //    startRow = (currentPage - 1) * ROWS_PER_PAGE + 1;
      //    endRow = currentPage * ROWS_PER_PAGE;
      // }
      // const pageData = data?.slice(startRow, endRow + 1);
      return data;
    }
  } catch (error) {
    console.log("Error retrieveing data");
    
  }
}

const getRowsCount = async (selectedYear: string, options?: string[]) => {
  try {
    if (options == null) {
      const data = await getFullRiskData(selectedYear);
      return data?.length;
    } else  {
      const filter_sort_options = getExtractedOptions(options);
      // const { currentPage } = filter_sort_options; 
      const data = await getFullRiskData(selectedYear, filter_sort_options);
      return data?.length
    }
  } catch (error) {
    console.log("Error retrieveing data");
    
  }
}

const getData = async (sheetId: string, tableName: string, range: string) => {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${tableName}!${range}`,
    });
    return res.data.values;
  } catch (error) {
    console.log("Error retrieveing data");
  } 
}

export { getRiskFactorList,  getRowsCount, getYearsList, getBusinessCategoryList, getRiskData};