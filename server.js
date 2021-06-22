const app = require('./src/app');
const sequelize = require('./src/config/database');

async function main() {
  await sequelize.sync();
  app.listen(4000, () => console.log('app is running at http://localhost:4000'));
}

main().catch(console.log);
