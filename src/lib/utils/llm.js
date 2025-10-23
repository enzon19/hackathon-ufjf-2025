const configSQL = `Generate only a SQL query based on the prompt. If the user ask for any other information other than help to get data or doesn't make any logical question, you can refuse to answer it saying the magical word "null". Don't forget to put quotes in the column names. Just put useful information in the select based on the prompt. The structure of the database is: TABLE bovinos: id (uuid), codigo (varchar), nome(varchar), dataNascimento(date)`;
const configAnswer = `Based on the initial prompt, answer the user in natural language based on the results of a SQL query provided after user's prompt. If you run out in any problem, answer being honest and direct, don't talk about technical stuff, like SQL, or databases, don't offer help to fix problems or suggestions like that.`;

export async function generateSQLQuery(prompt) {
  const body = {
    prompt,
    system: configSQL,
  };

  const response = await fetch("https://lucas485.app.n8n.cloud/webhook/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.status == 200) {
    return await response.text();
  } else {
    console.error(response.text());
    throw "Error generating SQL: " + response.text();
  }
}

/*
export async function generateSQLQueryWithMemory(history) {
  const body = {
    model: "openai",
    messages: [
      {
        role: "system",
        content: configSQL,
      },
      ...history.map(({ role, content }) => ({ role, content })),
    ], // {role, content}[]
    temperature: 0.2,
    reasiong_effort: "minimal",
    max_tokens: 5000,
    stream: false,
  };

  const response = await fetch("https://text.pollinations.ai/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = response.status == 200 ? await response.json() : {};
  return data;
}

export async function generateSQLQuery(prompt) {
  const url = new URL(
    `https://text.pollinations.ai/${encodeURIComponent(prompt)}`
  );
  url.searchParams.set("model", "openai");
  url.searchParams.set("system", configSQL);
  url.searchParams.set("temperature", "1");

  // console.log(url.href);
  const response = await fetch(url);
  const result = await response.text();
  return result;
}

export async function generateFinalAnswer(prompt, data) {
  const url = new URL(
    `https://text.pollinations.ai/${encodeURIComponent(
      prompt + " SQL query result: " + JSON.stringify(data)
    )}`
  );
  url.searchParams.set("model", "openai");
  url.searchParams.set("system", configAnswer);
  url.searchParams.set("temperature", "1");

  // console.log(url.href);
  const response = await fetch(url);
  const result = await response.text();
  return result;
}
*/
