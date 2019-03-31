
const postgresDevelopmentConfig = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
};

const postgresProductionConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
};

const pgConfig = process.env.NODE_ENV === 'production' ? postgresProductionConfig : postgresDevelopmentConfig;

module.exports = pgConfig;