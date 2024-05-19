const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/index.js");
const User = require("../src/userModel.js");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("Signup", () => {
  it("should signup a new user", async () => {
    const res = await request(app).post("/auth/signup").send({
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
      name: "Test",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual("User created successfully");
  });

  it("should return error if required fields are missing", async () => {
    const res = await request(app).post("/auth/signup").send({
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toBeDefined();
  });
});

describe("Login", () => {
  it("should login an existing user", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });

  it("should return error if user does not exist", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "nonexistentuser",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("User not found");
  });

  it("should return error if password is incorrect", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "testuser",
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Invalid credentials");
  });
});
