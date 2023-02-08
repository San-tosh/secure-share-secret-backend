const Cors = {
  allowedOrigins:
    process.env.ALLOWED_ORIGINS ||
    'http://localhost:3000,http://localhost:3001,http://localhost:4000,http://localhost:8000,' +
      'https://incandescent-toffee-fc14e5.netlify.app',
  originRegex:
    process.env.ORIGIN_REGEX || 'https?://([a-z0-9]+[.])*domainname[.]com',
};

export default Cors;
