import Referrals from "../../database/models/Referrals";
import Users from "../../database/models/User";
import makeID from "../../utils/makeID";

interface RegisterResponse {
  errors?: {
    login?: string;
    password?: string;
    captcha?: string;
    referrer?: string;
  };
  message?: string;
  error?: string;
}

export default async function ({
  login,
  password,
  captcha,
  referrer,
  session,
}): Promise<RegisterResponse> {
  let errors: object = {};
  let referralsTokens: number = 0;

  if (!session.captcha) {
    //If captcha is not generated then return error without checking other fields
    errors["captcha"] = "Captcha is not generated!";
    return errors;
  }

  if (captcha !== session.captcha.toLocaleLowerCase()) {
    //If captcha is wrong then return error without checking other fields
    errors["captcha"] = "Captcha is wrong!";
    return errors;
  }

  if (password.length < 6 || password.length > 32) {
    errors["password"] = "Password must be between 6 and 32 characters long!";
  }

  if (login.length < 4 || login.length > 32) {
    errors["login"] = "Login must be between 4 and 32 characters long!";
  }

  let loginAllowed = /^[a-zA-Z0-9]+$/;

  if (!loginAllowed.test(login)) {
    errors["login"] = "Login must contain only letters and numbers!";
  }

  if (referrer) {
    const referrerCode = await Referrals.findOne({ code: referrer });

    if (!referrerCode) {
      errors["referrer"] = "Referrer not found!";
      return errors;
    }

    // @ts-ignore
    referralsTokens = referrerCode.value;
  }

  const existingUser = await Users.findOne({ login: login });

  if (existingUser) {
    errors["login"] = "Login already exists!";
  }

  if (Object.keys(errors).length > 0) return { errors };

  const existingIP = await Users.find({ IP: session.userIP });

  const newUser = new Users({
    login,
    password,
    IP: session.userIP,
    session_id: makeID(32),
    tokens: referralsTokens,
    trust_score: existingIP.length * -1,
  });

  try {
    await newUser.save();
    session.session_id = newUser.session_id;
  } catch (e) {
    return { error: "Error while saving user to database!" };
  }

  return { message: "User registered successfully!" };
}
