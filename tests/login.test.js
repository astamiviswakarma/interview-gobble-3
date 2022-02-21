const app = require("../app");
const supertest = require("supertest");

test("GET /dynatable-ajax.json", async () => {  
    await supertest(app).get("/dynatable-ajax.json")
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(Array.isArray(response.body.records)).toBeTruthy();
        expect(response.body.records.length).toEqual(3);
  
        // Check data
        expect(response.body.records[0].someAttribute).toBe("I am record one");
        expect(response.body.records[0].someOtherAttribute).toBe("Fetched by AJAX");
      });
});