import { KavenegarSMSClient } from './KavenegarSMSClient'; // Adjust the path as needed

export default class SmsSender {
  private smsPanel: KavenegarSMSClient;

  constructor() {
    // Initialize Kavenegar client with the API key
    this.smsPanel = new KavenegarSMSClient(
      'test',
    );
  }

  // Send OTP and return a JWT token
  async sendOtp(mobile: string): Promise<string> {
    try {
      // Generate a random 6-digit OTP code
      const smsCode = KavenegarSMSClient.generateCode();

      // Send SMS with the OTP
      await this.smsPanel.manualSendCode(mobile, smsCode);
      // await this.smsPanel.manualSendCode(
      //   mobile,
      //   `IranDevs\nYour OTP Is: ${smsCode}\n@irandevs.com #${smsCode}`,
      // );

      // Generate the JWT token
      const token = this.smsPanel.generateToken(
        mobile,
        smsCode.toString(),
        process.env.SMS_SECRET_CODE as string, // Ensure this is set in your environment
      );

      return token; // Return the token as the result
    } catch (error) {
      console.error('Error in sendOtp:', error);
      throw new Error('Unable to send OTP');
    }
  }
}
