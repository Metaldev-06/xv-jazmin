export interface PlaylistDataBody {
  artist: string;
  name: string;
  link: string;
}

export interface PlaylistDataResponse {
  headers: Headers;
  params: Params;
  query: Params;
  body: Body;
  webhookUrl: string;
  executionMode: string;
}

export interface Body {
  artist: string;
  name: string;
  link: string;
}

export interface Headers {
  host: string;
  'user-agent': string;
  'content-length': string;
  accept: string;
  'accept-encoding': string;
  'content-type': string;
  'request-start-time': string;
  'x-forwarded-for': string;
  'x-forwarded-host': string;
  'x-forwarded-port': string;
  'x-forwarded-proto': string;
  'x-forwarded-server': string;
  'x-real-ip': string;
}

export interface Params {}
