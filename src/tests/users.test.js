import axios from "axios";

describe("user resolver", () => {
    test("allUsers", async () => {
        const response = await axios.post("http://localhost:5000/graphql", {
            query: `
                query getUser {
                    getCurrentUser {
                        username
                        teams {
                            name
                        }
                    }
                }
            `,
        });

        const {data} = response;

        expect(data.errors[0].message).toContain("Not authenticated");
        expect(data.data).toBeNull();
    });
});
