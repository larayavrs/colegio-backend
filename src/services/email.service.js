const ndm = require('nodemailer');
const path = require('path');
const hbs = require('handlebars');
const fs = require('fs');
const config = require('../config');
const LoomError = require('../helpers/errors');

module.exports = {
  transport: ndm.createTransport({
    service: config.email.service,
    host: config.email.host,
    port: parseInt(config.email.port),
    secure: true,
    secureConnection: false,
    tls: {
      ciphers: 'SSLv3',
    },
    requireTLS: true,
    auth: {
      user: config.email.user,
      pass: config.email.password,
    },
  }),

  /**
   * Send an email using nodemailer.
   *
   * @param {Object} params
   * @param {string} params.subject - The subject of the email.
   * @param {string} params.to - The recipient of the email.
   * @param {string} [params.from] - The sender of the email.
   * @param {string} params.templateName - The name of the handlebars
   *  template to use for the email body.
   * @param {Object} params.context - The data to pass to the handlebars
   *  template.
   */
  send: async ({
    subject,
    to,
    from,
    templateName,
    context,
  }) => {
    try {
      const transport = module.exports.transport;

      const templatePath = path.resolve(
        __dirname,
        '../views',
        `${templateName}.hbs`,
      );
      const source = fs.readFileSync(templatePath, 'utf8');
      const template = hbs.compile(source);
      const html = template(context);

      console.info(
        `> Sending email to <${to}> with subject <${subject}>`,
      );

      await transport.sendMail({
        from: from || config.email.user,
        to,
        subject,
        html,
      });
    } catch (error) {
      throw new LoomError({
        message: 'Error sending email',
        code: 500,
        errors: [error.message],
      });
    }
  },
};
