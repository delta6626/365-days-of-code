const tags = `creativity|imagination|inspirational|knowledge|philosophy|future|genius|self|self-help|success|motivational|courage|perseverance|change|character|truth|virtue|education`;
const QUOTABLE_API = `https://api.quotable.io/quotes/random?tags=${tags}`;

export async function getQuote() {
  return fetch(QUOTABLE_API);
}
