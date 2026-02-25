import { useState } from 'react'

type CreateQuizProps = {
  onCreateQuiz: (questions: Array<{ text: string; choices: string[]; correctIndex: number }>) => void
}

export default function CreateQuiz({ onCreateQuiz }: CreateQuizProps) {
  const [questions, setQuestions] = useState([
    { text: '', choices: ['', '', '', ''], correctIndex: 0 }
  ])

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...questions]
    if (field === 'text') {
      newQuestions[index].text = value
    } else if (field.startsWith('choice-')) {
      const choiceIndex = parseInt(field.split('-')[1])
      newQuestions[index].choices[choiceIndex] = value
    } else if (field === 'correct') {
      newQuestions[index].correctIndex = value
    }
    setQuestions(newQuestions)
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', choices: ['', '', '', ''], correctIndex: 0 }
    ])
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate
    if (questions.some(q => !q.text || q.choices.some(c => !c))) {
      alert('Please fill all fields')
      return
    }
    onCreateQuiz(questions)
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Create Quiz</h1>
        <form onSubmit={handleSubmit}>
          {questions.map((q, qIndex) => (
            <div key={qIndex} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <h3>Question {qIndex + 1}</h3>
              
              <div className="form-group">
                <label>Question Text</label>
                <input
                  type="text"
                  value={q.text}
                  onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                  placeholder="Enter question text"
                />
              </div>

              <div className="form-group">
                <label>Answers</label>
                {q.choices.map((choice, cIndex) => (
                  <div key={cIndex} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={choice}
                      onChange={(e) => handleQuestionChange(qIndex, `choice-${cIndex}`, e.target.value)}
                      placeholder={`Choice ${cIndex + 1}`}
                      style={{ flex: 1 }}
                    />
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={q.correctIndex === cIndex}
                      onChange={() => handleQuestionChange(qIndex, 'correct', cIndex)}
                      style={{ width: 'auto', cursor: 'pointer' }}
                    />
                  </div>
                ))}
              </div>

              {questions.length > 1 && (
                <button
                  type="button"
                  className="secondary"
                  onClick={() => removeQuestion(qIndex)}
                  style={{ width: '100%' }}
                >
                  Remove Question
                </button>
              )}
            </div>
          ))}

          <button type="button" className="secondary" onClick={addQuestion} style={{ width: '100%', marginBottom: '1rem' }}>
            + Add Question
          </button>

          <button type="submit" style={{ width: '100%' }} className="success">
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  )
}
