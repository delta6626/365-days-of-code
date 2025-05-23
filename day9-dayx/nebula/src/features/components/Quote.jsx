import { Feather, RefreshCcw } from "lucide-react";
import { useQuoteStore } from "../../store/quoteStore";
import { getQuote } from "../../utils/getQuote";
import { useState } from "react";

function Quote() {
  const { quote, setQuote } = useQuoteStore();
  const [loading, setLoading] = useState(false);

  function handleRefreshClick() {
    setLoading(true);
    getQuote().then((quoteData) => {
      quoteData.json().then((quoteDataArray) => {
        setQuote([quoteDataArray[0].content, quoteDataArray[0].author]);
        setLoading(false);
      });
    });
  }

  return (
    <div className="bg-transparent border-1 border-base-200 mt-4 w-sm mx-auto rounded-lg p-4">
      <div className="flex justify-between">
        <h1 className="flex items-center gap-2 font-semibold">
          <Feather />
          Motivation
        </h1>
        <button className="btn" onClick={handleRefreshClick}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            <RefreshCcw />
          )}
        </button>
      </div>
      <div className="text-gray-400 mt-4">
        <h1>{quote[0]}</h1>
        <p className="mt-2">— {quote[1]}</p>
      </div>
    </div>
  );
}

export default Quote;
