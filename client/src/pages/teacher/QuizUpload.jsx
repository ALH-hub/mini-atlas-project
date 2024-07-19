import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseRoute } from '../../../config.js';

const QuestionForm = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentChapter, setCurrentChapter] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState({
    title: '',
    options: { A: '', B: '', C: '', D: '' },
  });

  const addChapter = () => {
    if (currentChapter.trim() !== '') {
      setQuestions([...questions, { chapter: currentChapter }]);
      setCurrentChapter('');
    }
  };

  const addQuestion = () => {
    if (questions.length > 0 && currentQuestion.title.trim() !== '') {
      const lastChapterIndex = questions.length - 1;
      const updatedQuestions = [...questions];
      const questionNumber = Object.keys(
        updatedQuestions[lastChapterIndex],
      ).length;
      updatedQuestions[lastChapterIndex][`question${questionNumber}`] =
        currentQuestion;
      setQuestions(updatedQuestions);
      setCurrentQuestion({
        title: '',
        options: { A: '', B: '', C: '', D: '' },
      });
    }
  };

  const handleQuestionChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, title: e.target.value });
  };

  const handleOptionChange = (option, value) => {
    setCurrentQuestion({
      ...currentQuestion,
      options: { ...currentQuestion.options, [option]: value },
    });
  };

  const handleSubmission = async () => {
    try {
      await axios.post(`${baseRoute}/quiz`, questions, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/teacher/quiz');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate('/teacher/quiz');
  };

  return (
    <div className='pt-32 mb-8 flex justify-center'>
      <div className='border border-gray-500 p-16 w-1/2'>
        {' '}
        <div className='flex flex-col mb-8'>
          <div className='flex gap-4'>
            <input
              className='border w-1/2 border-gray-400 p-2 rounded'
              type='text'
              value={currentChapter}
              onChange={(e) => setCurrentChapter(e.target.value)}
              placeholder='Chapter title'
            />
            <button
              onClick={addChapter}
              className='bg-blue-200 p-2 mt-2 rounded text-center border border-blue-200 hover:bg-white text-center'
            >
              Add Chapter
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='mb-1'>Question</h2>
          <input
            className='border border-gray-400 p-2 rounded'
            type='text'
            required
            value={currentQuestion.title}
            onChange={handleQuestionChange}
            placeholder='Question title'
          />
          <div className='flex flex-col gap-4 mt-8'>
            <h2>Options</h2>
            {Object.keys(currentQuestion.options).map((option) => (
              <input
                className='border border-gray-400 p-2 rounded'
                key={option}
                type='text'
                value={currentQuestion.options[option]}
                onChange={(e) => handleOptionChange(option, e.target.value)}
                placeholder={`Option ${option}`}
              />
            ))}
          </div>
          <div className='w-full flex justify-end mt-4  '>
            <button
              className='bg-blue-200 p-2 mt-2 rounded text-center border border-blue-200 hover:bg-white text-center'
              onClick={addQuestion}
            >
              Add Question
            </button>
          </div>
          <button
            onClick={handleSubmission}
            className='bg-blue-200 p-2 mt-4 rounded text-center border border-blue-200 hover:bg-white'
          >
            Submit
          </button>
          <button
            onClick={handleCancel}
            className='bg-blue-200 p-2 mt-2 rounded text-center border border-blue-200 hover:bg-white'
          >
            Cancel
          </button>
        </div>
        <h2>Current Questions:</h2>
        <pre>{JSON.stringify(questions, null, 2)}</pre>
      </div>
    </div>
  );
};

export default QuestionForm;
