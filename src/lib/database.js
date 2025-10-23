import pkg from "pg";
import { POSTGRES_CSTRING } from "$env/static/private";
const { Pool } = pkg;

const db = new Pool({ connectionString: POSTGRES_CSTRING });
export default db;
