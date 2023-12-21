
import cryptoJs from 'crypto-js';

const SEPERATOR = '\n';
const AFTERSHIP_HEADER_PREFIX = 'as-';

export interface ApiSignature {
  sign(
    url: string,
    date: string,
    method: string,
    body: string,
    contentType: string,
    headers: any,
  ): string;
}

export class ApiSignatureImplement implements ApiSignature {
  private readonly apiSecret: string;

  constructor(apiSecret: string) {
    this.apiSecret = apiSecret;
  }

  public sign(
    url: string,
    date: string,
    method: string,
    body: string,
    contentType: string,
    headers: any,
  ): string {
    const canonicalizedHeader = this.canonicalizedHeaders(headers);
    const resource = this.canonicalizedResource(url);
    const s = this.signString(
      method,
      body,
      contentType,
      date, canonicalizedHeader, resource);
    return cryptoJs.enc.Base64.stringify(cryptoJs.HmacSHA256(s, this.apiSecret));
  }

  private canonicalizedHeaders(headers: any): string {
    if (headers.length === 0) {
      return '';
    }

    const keys: string[] = [];
    const newHeaders: any = {};
    Object.keys(headers).forEach((key: string) => {
      const newKey = key.toLowerCase();
      if (newKey.indexOf(AFTERSHIP_HEADER_PREFIX) === -1) {
        return;
      }
      keys.push(newKey);
      newHeaders[newKey] = headers[key].trim();
    });
    keys.sort();

    const result: string[] = [];
    for (let i = 0; i < keys.length; i += 1) {
      result.push(`${keys[i]}:${newHeaders[keys[i]]}`);
    }
    return result.join(SEPERATOR);
  }

  private canonicalizedResource(url: string): string {
    const u = new URL(url);
    const params = u.search.split('?');
    if (params.length < 2) {
      return u.pathname;
    }
    const sortedParams = new URLSearchParams(params[1]);
    sortedParams.sort();
    return `${u.pathname}?${sortedParams.toString()}`;
  }

  private signString(
    method: string,
    body: string,
    contentType: string,
    date: string,
    canonicalizedHeader: string,
    resource: string,
  ): string {
    let result: string = method + SEPERATOR;
    let newBody = '';
    let newContentType = contentType;
    if (body === undefined || body.length === 0) {
      newContentType = '';
    } else {
      newBody = cryptoJs.MD5(body).toString().toUpperCase();
    }
    result += newBody + SEPERATOR;
    result += newContentType + SEPERATOR;
    result += date + SEPERATOR;
    result += canonicalizedHeader + SEPERATOR;
    result += resource;
    return result;
  }
}
