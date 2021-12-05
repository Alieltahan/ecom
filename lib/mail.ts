import { createTransport, getTestMessageUrl } from 'nodemailer';

const config = require('config');

const HOST = config.get('MAIL.HOST');
const USER = config.get('MAIL.USER');
const PASS = config.get('MAIL.PASS');
const PORT = config.get('MAIL.PORT');

const transport = createTransport({
  host: HOST,
  port: PORT,
  auth: {
    user: USER,
    pass: PASS,
  },
});

function makeANiceEmail(text: string) {
  return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h5>Hello There!</h5>
      <p>${text}</p>

      <p>Regards,</p>
      <p> Shop Team </p>
    </div>
  `;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}
export interface Envelope {
  from: string;
  to?: string[] | null;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email the user a token
  const info = (await transport.sendMail({
    to,
    from: 'noreply@shop.com',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>
    `),
  })) as MailResponse;
  // if (process.env.MAIL_USER.includes('ethereal.email')) {
  //   console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
  // }
}
