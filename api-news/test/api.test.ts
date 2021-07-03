import request from "supertest";
import app from "../src/app";

describe("Validating API", () => {

    it("should return 200 OK", () => {
        return request(app).get("/")
            .expect(200);
    });

    it("should /news/fetchAll return 200: ", async () => {
        const response = await request(app).post("/news/fetchAll");
        expect(response.status).toBe(200);
        expect(response.body.articles.length).toBeGreaterThan(0);
    });

    it("should return 404, when route isn't defined: ", () => {
        return request(app).get("/random")
            .expect(404);
    });

});
