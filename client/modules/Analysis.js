async function analyzeText(text) {
  const params =  {text}
  const url = new URL('http://localhost:3000/sentimentanlysis')
  url.search = new URLSearchParams(params).toString()
  const response = await fetch(url);
  return response.json();
}
export {analyzeText}
