import { expect } from "@playwright/test";

export class UserAPI {
  constructor(request) {
    this.request = request;
    this.baseURL = process.env.API_BASE_URL;
  }

  async registerUser(userData) {
    const response = await this.request.post(
      `${this.baseURL}/users/register`,
      {
        data: userData,
      }
    );

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.email).toBe(userData.email);
    expect(responseBody.id).toBeTruthy();

    return responseBody;
  }
}