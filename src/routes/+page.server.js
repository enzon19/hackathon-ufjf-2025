export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const question = data.get("question");

    // seu processamento aqui
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
