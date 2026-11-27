import { randomUUID } from "node:crypto";

export function generateUserData() {
  const password = process.env.TEST_PASSWORD;

  if (!password) {
    throw new Error("TEST_PASSWORD is missing from environment variables");
  }

  return {
    first_name: "John",
    last_name: "Smith",
    dob: "1998-05-15",
    phone: "2025550147",
    email: `testuser-${randomUUID()}@example.com`,
    password: password,

    address: {
      street: "123 Main Street",
      city: "New York",
      state: "New York",
      country: "US",
      postal_code: "10001",
    },
  };
}