import https from 'https';
import querystring from 'querystring';

interface KavenegarOptions {
  apikey: string;
}

interface KavenegarResponse<T> {
  entries: T;
  return: {
    status: number;
    message: string;
  };
}

type Callback<T = unknown> = (
  entries?: T,
  status?: number,
  message?: string,
) => void;

class KavenegarApi {
  private options: {
    host: string;
    version: string;
    apikey: string;
  };

  constructor(options: KavenegarOptions) {
    this.options = {
      host: 'api.kavenegar.com',
      version: 'v1',
      apikey: options.apikey,
    };
  }

  private request<T>(
    action: string,
    method: string,
    params: Record<string, string | number>,
    callback?: Callback<T>,
  ) {
    const path = `/${this.options.version}/${this.options.apikey}/${action}/${method}.json`;
    const postdata = querystring.stringify(params);

    const postOptions = {
      host: this.options.host,
      port: 443,
      path,
      method: 'POST',
      headers: {
        'Content-Length': postdata.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };

    const req = https.request(postOptions, (res) => {
      res.setEncoding('utf8');
      let result = '';

      res.on('data', (data) => {
        result += data;
      });

      res.on('end', () => {
        try {
          const jsonObject: KavenegarResponse<T> = JSON.parse(result);
          if (callback) {
            callback(
              jsonObject.entries,
              jsonObject.return.status,
              jsonObject.return.message,
            );
          }
        } catch (error) {
          console.error('Exception!', error);
          if (callback) {
            if (error instanceof Error) {
              callback(undefined, 500, error.message);
            } else {
              callback(undefined, 500, 'Unknown error occurred');
            }
          }
        }
      });
    });

    req.write(postdata, 'utf8');
    req.on('error', (error) => {
      if (callback) {
        callback(undefined, 500, error.message);
      }
    });
    req.end();
  }

  public Send(data: Record<string, string | number>, callback?: Callback) {
    this.request('sms', 'send', data, callback);
  }

  public SendArray(data: Record<string, string | number>, callback?: Callback) {
    this.request('sms', 'sendarray', data, callback);
  }

  public Status(data: Record<string, string | number>, callback?: Callback) {
    this.request('sms', 'status', data, callback);
  }

  public StatusLocalMessageid(
    data: Record<string, string | number>,
    callback?: Callback,
  ) {
    this.request('sms', 'statuslocalmessageid', data, callback);
  }

  public Select(data: Record<string, string | number>, callback?: Callback) {
    this.request('sms', 'select', data, callback);
  }

  public SelectOutbox(
    data: Record<string, string | number>,
    callback?: Callback,
  ) {
    this.request('sms', 'selectoutbox', data, callback);
  }

  public LatestOutbox(
    data: Record<string, string | number>,
    callback?: Callback,
  ) {
    this.request('sms', 'latestoutbox', data, callback);
  }

  public CountOutbox(
    data: Record<string, string | number>,
    callback?: Callback,
  ) {
    this.request('sms', 'countoutbox', data, callback);
  }

  public Cancel(data: Record<string, string | number>, callback?: Callback) {
    this.request('sms', 'cancel', data, callback);
  }

  public Receive(data: Record<string, string | number>, callback?: Callback) {
    this.request('sms', 'receive', data, callback);
  }

  public CountInbox(
    data: Record<string, string | number>,
    callback?: Callback,
  ) {
    this.request('sms', 'countinbox', data, callback);
  }

  public CountPostalCode(
    data: Record<string, string | number>,
    callback?: Callback,
  ) {
    this.request('sms', 'countpostalcode', data, callback);
  }

  public SendByPostalCode(
    data: Record<string, string | number>,
    callback?: Callback,
  ) {
    this.request('sms', 'sendbypostalcode', data, callback);
  }

  public VerifyLookup(
    data: Record<string, string | number>,
    callback?: Callback,
  ) {
    this.request('verify', 'lookup', data, callback);
  }

  public AccountInfo(
    data: Record<string, string | number>,
    callback?: Callback,
  ) {
    this.request('account', 'info', data, callback);
  }

  public AccountConfig(
    data: Record<string, string | number>,
    callback?: Callback,
  ) {
    this.request('account', 'config', data, callback);
  }

  public CallMakeTTS(
    data: Record<string, string | number>,
    callback?: Callback,
  ) {
    this.request('call', 'maketts', data, callback);
  }
}

export function KavenegarApiFactory(options: KavenegarOptions) {
  return new KavenegarApi(options);
}
