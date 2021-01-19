/* eslint-disable @typescript-eslint/lines-between-class-members */
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { devConfig, prodConfig } from './config';

class GoogleSpreadsheetService {
  doc: GoogleSpreadsheet;
  clientEmail: string;
  privateKey: string;
  sheetId: string;

  constructor(
    spreadSheetId: string,
    clientEmail: string,
    privateKey: string,
    sheetId: string
  ) {
    this.doc = new GoogleSpreadsheet(spreadSheetId);
    this.clientEmail = clientEmail;
    this.privateKey = privateKey;
    this.sheetId = sheetId;
  }

  async addRow(row: { [key in string]: string }) {
    try {
      await this.doc.useServiceAccountAuth({
        client_email: this.clientEmail,
        private_key: this.privateKey,
      });
      await this.doc.loadInfo();
      const sheet = this.doc.sheetsById[this.sheetId || '0'];
      const result = await sheet.addRow(row);
      return result;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return null;
    }
  }
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const googleSpreadsheet = new GoogleSpreadsheetService(
  config.spreadSheetId,
  config.clientEmail,
  config.privateKey,
  config.sheetId
);

export default googleSpreadsheet;
