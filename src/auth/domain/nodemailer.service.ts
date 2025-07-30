import nodemailer, { Transporter } from "nodemailer";
import { SETTINGS } from "../../core/setting/setting";
import { injectable } from "inversify";

@injectable()
export class NodemailerService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: SETTINGS.EMAIL,
        pass: SETTINGS.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail(
    email: string,
    code: string,
    template: (code: string) => string,
  ): Promise<void> {
    await this.transporter.sendMail({
      from: `"Blogs platform" <${SETTINGS.EMAIL}>`,
      to: email,
      subject: "Email Confirmation",
      html: template(code),
    });
  }
}
