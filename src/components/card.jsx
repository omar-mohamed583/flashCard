export default function Card({ question, answer, showAnswer }) {
  return (
    <div className={`card-scene w-[90%] h-[90%] ${showAnswer ? 'show' : ''}`}>
      <div className="card">
        <div className="card-face card-front text-center">{question}</div>
        <div className="card-face card-back text-center">{answer}</div>
      </div>
    </div>
  );
}
