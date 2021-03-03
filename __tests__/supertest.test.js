const request = require("supertest");
const { PG_URI } = require("../secret.js");
const app = require("../server/server");
require("regenerator-runtime/runtime");
const { mockJob } = require("../__mocks__/mocks");

describe("Route integration", () => {
  describe("/", () => {
    describe("GET -> homepage", () => {
      it("responds with 200 status and text/html content type", (done) => {
        return request(app)
          .get("/")
          .expect("Content-Type", /text\/html/)
          .expect(200, done);
      });
    });
  });
  describe("/board", () => {
    describe("GET -> board", () => {
      it("responds with 200 status and text/html content type", (done) => {
        return request(app)
          .get("/board")
          .expect("Content-Type", /text\/html/)
          .expect(200, done);
      });
    });
  });
  describe("/jobs", () => {
    describe("GET -> jobs", () => {
      it("responds with 200 status and text/html content type", (done) => {
        return request(app)
          .get("/jobs")
          .expect("Content-Type", /text\/html/)
          .expect(200, done);
      });
    });
  });
  describe("/login", () => {
    describe("GET -> loginpage", () => {
      it("responds with 200 status and text/html content type", (done) => {
        return request(app)
          .get("/loginpage")
          .expect("Content-Type", /text\/html/)
          .expect(200, done);
      });
    });
  });
  describe("/auth/github", () => {
    describe("GET -> /auth/github", () => {
      it("responds with 302 status -> redirected", (done) => {
        return request(app).get("/auth/github").expect(302, done);
      });
    });
  });
  describe("/auth/github/callback", () => {
    describe("GET -> /auth/github/callback", () => {
      it("responds with 302 status -> redirected", (done) => {
        return request(app).get("/auth/github/callback").expect(302, done);
      });
    });
  });
});

xdescribe("Jobs End Point and Tables", () => {
  describe("/jobs/new", () => {
    describe("POSTS -> /jobs/new", () => {
      it("should contain properties user_id, position, company, listing, status, questions, notes", (done) => {
        return request(app)
          .post("/jobs/new")
          .send(mockJob)
          .expect(200)
          .expect("Content-Type", /application\/json/)
          .then(({ body }) => {
            expect(body).toHaveProperty("position");
            return done();
          });
      });
    });
  });
});
