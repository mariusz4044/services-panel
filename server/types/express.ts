interface RequestBody {
  ip: string;
}

interface Session {
  views: number;
}

export interface Captcha {
  data: string;
  answer: string;
}

interface Connection {
  remoteAddress: string;
}
export interface RequestExpess {
  session: Session;
  header: Function;
  connection: Connection;
  body: RequestBody;
}

export interface ResponseExpress {
  send: Function;
  status: Function;
}
