import env from "@lib/utils/dotenv";
import sequelize from "@server/database/connection";

const isSetupOK = Boolean(env && sequelize);

export default isSetupOK;