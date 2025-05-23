import { fakerEN_IN as faker } from "@faker-js/faker";
import type { Patient } from "@/lib/types";
import { bulkInsertPatients } from "@/lib/db";
import { BLOOD_TYPES } from "@/lib/constants";

const maybe = <T>(value: T, chance = 0.6): T | null =>
  Math.random() < chance ? value : null;

const generateFakePatient = (): Patient => {
  const gender = faker.helpers.weightedArrayElement([
    { value: "Male", weight: 54 },
    { value: "Female", weight: 41 },
    { value: "Others", weight: 4 },
    { value: "Prefer not to say", weight: 1 },
  ]);

  const languages = ["English", "Kannada", "Tamil", "Punjabi", "Hindi"];

  const today = new Date();
  const yearAgo = new Date();
  yearAgo.setFullYear(today.getFullYear() - 1);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    first_name: firstName,
    last_name: lastName,
    date_of_birth: faker.date
      .birthdate({ min: 1950, max: 2015, mode: "year" })
      .toISOString()
      .split("T")[0],
    gender,
    email: maybe(
      faker.internet.email({ firstName, lastName }).toLowerCase(),
      0.5
    ),
    phone: faker.phone.number({ style: "international" }),
    address: faker.location.streetAddress(),
    blood_type: maybe(
      faker.helpers.arrayElement(BLOOD_TYPES.map((type) => type.value)),
      0.5
    ),
    medical_history: maybe(faker.lorem.paragraph(), 0.8),
    language_preference: maybe(faker.helpers.arrayElement(languages), 0.5),
    emergency_contact: maybe(
      `${faker.person.fullName()} ${faker.phone.number({
        style: "international",
      })}`,
      0.5
    ),
    national_id: maybe(faker.string.numeric(12), 0.4),
    insurance_provider: maybe(
      faker.helpers.arrayElement(["HDFC", "LIC", "SBI Life", "ICICI", "Axis"]),
      0.6
    ),
    insurance_number: maybe(faker.finance.accountNumber(), 0.6),
    notes: maybe(faker.lorem.sentence(), 0.5),
    registration_date: faker.date
      .between({ from: yearAgo, to: today })
      .toISOString()
      .split("T")[0],
  };
};

export const seedFakePatients = async (count = 10) => {
  try {
    const patients = Array.from({ length: count }, generateFakePatient);
    await bulkInsertPatients(patients);
    console.log(`${count} fake patients inserted successfully.`);
  } catch (error) {
    console.error("Error seeding fake patients:", error);
  }
};
