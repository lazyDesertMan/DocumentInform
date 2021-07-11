import { Sequelize } from 'sequelize';

const DBContext = new Sequelize('document_inform', 'postgres', 'qwerty123', {
    logging: false,
    dialect: "postgres",
    host: "localhost",
    port: 5432
});

export {
    DBContext
}