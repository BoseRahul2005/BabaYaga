const { OpenRouter } = require("@openrouter/sdk");

exports.callLLM = async (prompt) => {
  const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  try {
    const stream = await openrouter.chat.send({
      chatRequest: {
        model: "cohere/north-mini-code:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        stream: true,
      },
    });

    let response = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;

      if (content) {
        response += content;
        process.stdout.write(content);
      }

      if (chunk.usage) {
        console.log(
          "\nReasoning tokens:",
          chunk.usage.completionTokensDetails?.reasoningTokens,
        );
      }
    }

    return response;
  } catch (error) {
    console.error("LLM Error:", error);
    throw error;
  }
};
