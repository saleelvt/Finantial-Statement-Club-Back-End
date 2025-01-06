import { config } from "dotenv";
config()
let EMAIL: string = String(process.env.Microsoft_EMAIL);
let PASSWORD: string = String(process.env.Microsoft_EMAIL_APP_PASSWORD);

export{
    EMAIL,
    PASSWORD,
}



