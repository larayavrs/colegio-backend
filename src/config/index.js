let env = process.env;

if (!env.NODE_ENV) {
  require('dotenv').config({ path: './.env.local' });
  env = process.env;
}

module.exports = {
  global: {
    app_name: env.APP_NAME,
    env: env.NODE_ENV,
    port: env.PORT || 3000,
    host: env.HOST,
    protocol: env.PROTOCOL,
  },
  database: {
    url: env.DATABASE_URL,
  },
  jwt: {
    secret: env.JWT_SECRET,
    access: {
      secret: env.JWT_ACCESS_SECRET,
      expire: env.JWT_ACCESS_EXPIRE || '1d',
    },
    password: {
      secret: env.JWT_PASSWORD_SECRET,
      expire: env.JWT_PASSWORD_EXPIRE || '1d',
    },
    verification: {
      secret: env.JWT_VERIFICATION_SECRET,
      expire: env.JWT_VERIFICATION_EXPIRE || '1d',
    },
  },
  cors: {
    origin: 'http://localhost:3000', // Change this to your frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    optionsSuccessStatus: 204,
    maxAge: 3600, // 1 hour
  },
  email: {
    service: env.EMAIL_SERVICE,
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT, // maybe 587?
    user: env.EMAIL_USER,
    password: env.EMAIL_PASSWORD,
  },
};
