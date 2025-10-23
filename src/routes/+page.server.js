import db from "$lib/database";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const question = data.get("question");

    try {
      const result = await db.query({
        text: "SELECT * FROM bovinos",
      });

      console.log(result.rows);
    } catch (e) {
      console.error(e);
    }

    const answer = {
      from: "agent",
      timestamp: new Date().toISOString(),
      sql: "SELECT *",
      value: "pong",
    };

    return {
      success: true,
      answer: answer,
    };
  },
};
