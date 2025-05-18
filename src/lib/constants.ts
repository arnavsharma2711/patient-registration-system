export const GENDER_OPTIONS = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "Others",
    value: "Others",
  },
  {
    label: "Prefer not to say",
    value: "Prefer not to say",
  },
];

export const BLOOD_TYPES = [
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "A-",
    value: "A-",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "B-",
    value: "B-",
  },
  {
    label: "AB+",
    value: "AB+",
  },
  {
    label: "AB-",
    value: "AB-",
  },
  {
    label: "O+",
    value: "O+",
  },
  {
    label: "O-",
    value: "O-",
  },
  {
    label: "Unknown",
    value: "Unknown",
  },
];

export const DEFAULT_SQL_QUERY = "SELECT * FROM patients LIMIT 10;";

export const ITEMS_PER_PAGE = 10;

export const DEFAULT_SQL_QUERIES = [
  {
    name: "Total number of patients",
    query: "SELECT COUNT(*) AS total_patients FROM patients;",
  },
  {
    name: "New patients in the last 30 days",
    query:
      "SELECT COUNT(*) AS recent_patients FROM patients WHERE TO_DATE(registration_date, 'YYYY-MM-DD') >= CURRENT_DATE - INTERVAL '30 days';",
  },
  {
    name: "Patients by gender distribution",
    query:
      "SELECT gender, COUNT(*) AS count FROM patients GROUP BY gender ORDER BY count DESC;",
  },
  {
    name: "Patients by age group",
    query:
      "SELECT CASE WHEN age < 18 THEN '0-17' WHEN age BETWEEN 18 AND 35 THEN '18-35' WHEN age BETWEEN 36 AND 50 THEN '36-50' WHEN age BETWEEN 51 AND 65 THEN '51-65' ELSE '66+' END AS age_group, COUNT(*) AS count FROM (SELECT EXTRACT(YEAR FROM AGE(TO_DATE(date_of_birth, 'YYYY-MM-DD'))) AS age FROM patients WHERE date_of_birth IS NOT NULL) AS derived GROUP BY age_group ORDER BY age_group;",
  },
  {
    name: "Insurance coverage breakdown",
    query:
      "SELECT CASE WHEN insurance_provider IS NULL OR insurance_provider = '' THEN 'Uninsured' ELSE 'Insured' END AS insurance_status, COUNT(*) AS count FROM patients GROUP BY insurance_status;",
  },
  {
    name: "Daily registrations (last 7 days)",
    query:
      "SELECT TO_DATE(registration_date, 'YYYY-MM-DD') AS date, COUNT(*) AS registrations FROM patients WHERE TO_DATE(registration_date, 'YYYY-MM-DD') >= CURRENT_DATE - INTERVAL '6 days' GROUP BY date ORDER BY date;",
  },
  {
    name: "Top 5 insurance providers",
    query:
      "SELECT insurance_provider, COUNT(*) AS count FROM patients WHERE insurance_provider IS NOT NULL AND insurance_provider <> '' GROUP BY insurance_provider ORDER BY count DESC LIMIT 5;",
  },
  {
    name: "Monthly registration trend (last 12 months)",
    query:
      "SELECT TO_CHAR(TO_DATE(registration_date, 'YYYY-MM-DD'), 'YYYY-MM') AS month, COUNT(*) AS registrations FROM patients WHERE TO_DATE(registration_date, 'YYYY-MM-DD') >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '11 months' GROUP BY month ORDER BY month;",
  },
  {
    name: "Patients with incomplete contact information",
    query:
      "SELECT COUNT(*) AS count FROM patients WHERE (email IS NULL OR email = '') OR (phone IS NULL OR phone = '');",
  },
  {
    name: "Most common blood types",
    query:
      "SELECT blood_type, COUNT(*) AS count FROM patients WHERE blood_type IS NOT NULL AND blood_type <> '' GROUP BY blood_type ORDER BY count DESC;",
  },
  {
    name: "Language preferences distribution",
    query:
      "SELECT language_preference, COUNT(*) AS count FROM patients WHERE language_preference IS NOT NULL AND language_preference <> '' GROUP BY language_preference ORDER BY count DESC;",
  },
  {
    name: "Patients with emergency contact info",
    query:
      "SELECT CASE WHEN emergency_contact IS NULL OR emergency_contact = '' THEN 'No Emergency Contact' ELSE 'Has Emergency Contact' END AS emergency_contact_status, COUNT(*) AS count FROM patients GROUP BY emergency_contact_status;",
  },
];

export const DASHBOARD_ANALYTICS_QUERY = [
  {
    id: "total_patients",
    name: "Total number of patients",
    query: "SELECT COUNT(*) AS total_patients FROM patients;",
  },
  {
    id: "recent_registrations",
    name: "Patients registered in the last 30 days",
    query:
      "SELECT COUNT(*) AS recent_registrations FROM patients WHERE TO_DATE(registration_date, 'YYYY-MM-DD') >= CURRENT_DATE - INTERVAL '30 days';",
  },
  {
    id: "patients_by_gender",
    name: "Patients by gender",
    query: "SELECT gender, COUNT(*) AS count FROM patients GROUP BY gender;",
  },
  {
    id: "patients_by_age",
    name: "Patients by age group",
    query:
      "SELECT CASE WHEN age < 18 THEN '0-17' WHEN age BETWEEN 18 AND 35 THEN '18-35' WHEN age BETWEEN 36 AND 50 THEN '36-50' WHEN age BETWEEN 51 AND 65 THEN '51-65' ELSE '66+' END AS age_group, COUNT(*) AS count FROM (SELECT EXTRACT(YEAR FROM AGE(TO_DATE(date_of_birth, 'YYYY-MM-DD'))) AS age FROM patients) AS derived GROUP BY age_group ORDER BY age_group;",
  },
  {
    id: "insurance_status",
    name: "Patients with insurance vs without",
    query:
      "SELECT COUNT(*) AS insurance_status FROM patients WHERE insurance_provider IS NOT NULL AND insurance_number IS NOT NULL;",
  },
  {
    id: "missing_info",
    name: "Patients with missing contact info",
    query:
      "SELECT COUNT(*) AS missing_info FROM patients WHERE (email IS NULL OR email = '') OR (phone IS NULL OR phone = '');",
  },
  {
    id: "language_preference",
    name: "Patient's language preferences distribution",
    query:
      "SELECT language_preference, COUNT(*) AS count FROM patients WHERE language_preference IS NOT NULL AND language_preference <> '' GROUP BY language_preference ORDER BY count DESC;",
  },
  {
    id: "common_blood_type",
    name: "Most common blood types",
    query:
      "SELECT blood_type, COUNT(*) AS count FROM patients WHERE blood_type IS NOT NULL AND blood_type != 'Unknown' AND blood_type <> '' GROUP BY blood_type ORDER BY count DESC;",
  },
  {
    id: "monthly_registration",
    name: "Monthly registration trend (last 12 months)",
    query:
      "SELECT TO_CHAR(TO_DATE(registration_date, 'YYYY-MM-DD'), 'YYYY-MM') AS month, COUNT(*) AS count FROM patients WHERE TO_DATE(registration_date, 'YYYY-MM-DD') >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '11 months' GROUP BY month ORDER BY month;",
  },
];
