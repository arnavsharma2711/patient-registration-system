import { PGliteWorker } from "@electric-sql/pglite/worker";
import { live } from "@electric-sql/pglite/live";
import PGWorker from "./../../public/worker.js?worker";

const db = await PGliteWorker.create(new PGWorker({ name: "pglite-worker" }), {
  dataDir: "idb://db-prs",
  meta: {},
  extensions: { live },
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    address TEXT NOT NULL,
    registration_date TEXT NOT NULL,
    national_id TEXT,
    gender TEXT NOT NULL,
    email TEXT,
    emergency_contact TEXT,
    blood_type TEXT,
    medical_history TEXT,
    insurance_provider TEXT,
    insurance_number TEXT,
    language_preference TEXT,
    notes TEXT
  );
`);

export default db;
