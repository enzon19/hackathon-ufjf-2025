import db from "$lib/database";
import {
  generateFinalAnswer,
  generateSQLQuery,
  generateSQLQueryWithMemory,
} from "$lib/utils/llm.js";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const prompt = data.get("prompt");
    const history = JSON.parse(data.get("history"));

    const answer = {
      role: "system",
      sql: null,
      content: null,
    };

    try {
      // await generateSQLQueryWithMemory(history);
      const sqlQuery = await generateSQLQuery(prompt);
      console.log(sqlQuery);

      if (sqlQuery !== "null") {
        const sqlResult = await db.query({
          text: sqlQuery,
        });
        console.log(sqlResult.rows.length);

        const answerForHumans = await generateFinalAnswer(
          prompt,
          sqlResult.rows
        );

        answer.sql = sqlQuery;
        answer.content = answerForHumans;
      } else {
        answer.content = "Desculpe, mas não posso responder essa pergunta.";
      }

      return {
        success: true,
        answer: answer,
      };
    } catch (e) {
      answer.content = "Houve um erro ao executar seu pedido. Tente novamente. Erro: " + e;
      return {
        success: false,
        answer,
      };
    }
  },
};
