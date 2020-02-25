import reducerz from "reducers/application";

describe("Application Reducer", () => {
  it("thows an error with an unsupported type", () => {
    expect(() => reducerz({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});