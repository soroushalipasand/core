import jwt from 'jsonwebtoken';
import { KavenegarApiFactory } from './kavenegar'; // Adjust the path as needed

export class KavenegarSMSClient {
  private kavenegarClient: ReturnType<typeof KavenegarApiFactory>;

  constructor(apiKey: string) {
    this.kavenegarClient = KavenegarApiFactory({ apikey: apiKey });
  }

  async manualSendCode(number: string, code: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.kavenegarClient.VerifyLookup(
        {
          receptor: number,
          template: 'iranDevs',
          token: code,
          sender: '2000660110', // Replace with your valid sender number
        },
        (entries, status, message) => {
          if (status === 200) {
            resolve();
          } else {
            console.error('Failed to send SMS:', message);
            reject(new Error('Failed to send SMS'));
          }
        },
      );
    });
  }

  generateToken(
    mobile: string,
    code: string,
    secret: string,
    expiresIn: string = '48h',
  ): string {
    return jwt.sign({ mobile, code }, secret, { expiresIn });
  }

  static generateCode(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
