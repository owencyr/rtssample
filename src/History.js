export default function History({ searchHistory }) {
  console.log({ searchHistory });

  const renderHistoryList = (history) => {
    return searchHistory.map((historicalSearch, index) => {
      return <li key={`${historicalSearch}-${index}`}>{historicalSearch}</li>;
    });
  };
  return (
    <div>
      History list
      <ul>{renderHistoryList(searchHistory)}</ul>
    </div>
  );
}
