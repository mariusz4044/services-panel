export interface Captcha {
  data: string;
  answer: string;
}
export interface RegisterBody {
  login: string;
  password: string;
  captcha: string;
  referrer: string;
}
