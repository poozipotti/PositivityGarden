const Koa = require("koa");
const Router = require("@koa/router");
const language = require("@google-cloud/language");
const cors = require('@koa/cors')

const app = new Koa();
const router =  new Router();


async function analyzeText(ctx) {
  const { text } = ctx.request.query;

  const client = new language.LanguageServiceClient();

  const document = {
    content: text,
    type: "PLAIN_TEXT",
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({ document: document });
  ctx.body = result;
}

app.use(cors({origin:'*'}));
router.get("/sentimentAnlysis", analyzeText);
app.use(router.routes());

app.listen(3000);
