import bcrypt from "bcrypt";
import fs from "fs";
import util from "util";

const saltrounds = 2;
const password = "zli1234";
const envVarName = "PASSWORD_HASH";

const writeFile = util.promisify(fs.writeFile);

async function hashPasswordToEnv(password, envVarName) {
  try {
    const hash = await bcrypt.hash(password, saltrounds);
    const envContent = `${envVarName}=${hash}\n`;
    await writeFile(".env", envContent);
    console.log("Hash written to .env");
  } catch (err) {
    console.error("Error:", err);
  }
}

hashPasswordToEnv(password, envVarName);
