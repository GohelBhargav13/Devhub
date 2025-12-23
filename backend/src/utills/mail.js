import Mailgen from "mailgen";
import * as brevo from '@getbrevo/brevo';
import "dotenv/config";

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      // Appears in header & footer of e-mails
      name: "DevHub",
      link: "http://localhost:5173/",
    },
  });

  const textMail = mailGenerator.generatePlaintext(options.mailgencontent);
  const htmlMail = mailGenerator.generate(options.mailgencontent);

  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false, // Use true for port 465, false for port 587
  //   auth: {
  //     user: "gohelbhargav401@gmail.com",
  //     pass: "aqknaoglmxclkvct",
  //   },
  // });

  // try {
  //   await transporter.sendMail({
  //     from: "gohelbhargav401@gmail.com",
  //     to: options.email,
  //     subject: options.subject,
  //     text: textMail, // Plain-text version of the message
  //     html: htmlMail, // HTML version of the message
  //   });
  // } catch (error) {
  //   console.log("Error while sending an email", error?.message);
  // }

  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.sender = { 
      name: "TubeX", 
      email: process.env.SMTP_EMAIL // Use your verified email
    };
    sendSmtpEmail.to = [{ email: options.email }];
    sendSmtpEmail.subject = options.subject;
    sendSmtpEmail.htmlContent = htmlMail;
    sendSmtpEmail.textContent = textMail;

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    console.log("✅ Email sent successfully", data);
    return { success: true, data };

  } catch (error) {
    console.error("❌ Brevo email error:", error);
    return { success: false, error: error.message };
  }
}

export const verificationEmailTemplate = (username, verifyURL) => {
  return {
    body: {
      name: `${username} !` || "User",
      intro:
        "Thanks for signing up for DevHUB. We're very excited to have you on board.",
      action: {
        instructions:
          "To get started using DevHUB, please confirm your account below:",
        button: {
          color: "#708090", // Slate-Gray like in screenshot
          text: "Confirm your account",
          link: `http://localhost:5173/email-verify/${verifyURL}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
