const Koa = require('koa');
const app = new Koa();
const language = require('@google-cloud/language');

async function quickstart(textToAnalyze) {
  // Imports the Google Cloud client library

  // Instantiates a client
  const client = new language.LanguageServiceClient();


  const document = {
    content: textToAnalyze,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({document: document});
  return result;

}

app.use( async (ctx) => {
  const text = "Hello george you look very nice"
  const result = await quickstart(text);

  ctx.body = {result, text};
});

app.listen(3000);
