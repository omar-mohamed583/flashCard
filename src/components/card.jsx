export default function Card({ question, answer, showAnswer, showOnHover }) {
  return (
    <div className={`card-scene w-[90%] h-[90%] ${showAnswer ? 'show' : ''} ${showOnHover ? 'show-on-hover' : ''}`}>
      <div className="card">
        <div className="card-face card-front text-center">{question}</div>
        <div className="card-face card-back text-center">{answer}</div>
      </div>
    </div>
  );
}
