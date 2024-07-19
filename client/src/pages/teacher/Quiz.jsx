import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import trash from '/trash.svg';
import add from '/add.svg';
import edit from '/edit.svg';
import { baseRoute } from '../../../config';
import axios from 'axios';

const Question = () => {
  const [body, setBody] = useState({});
  const [quiz, setQuiz] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${baseRoute}/quiz/${body._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(res);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const resp = await axios.get(`${baseRoute}/quiz`);
        setQuiz(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuiz();
  }, []);

  return (
    <div className='flex'>
      <div className='top-0 left-0 w-[250px] h-full overflow-y-auto pt-20 pl-4 fixed border border-gray-400'>
        <div className='flex justify-between items-center pl-2 pr-4 mb-2'>
          <h1 className='font-bold mb-2 border-b border-b-gray-400 text-center'>
            Chapters
          </h1>
          <Link to='/teacher/quiz/new'>
            <img className='w-5 ml-auto' src={add} alt='' />
          </Link>
        </div>
        <ol className='list-decimal px-2 flex gap-2 flex-col'>
          {quiz.map((chapterObj, chapterIndex) => (
            <li key={chapterIndex} className='px-2'>
              <button
                onClick={() => {
                  setBody(chapterObj);
                }}
              >
                {chapterObj.chapter}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className='p-8 pt-20 ml-[250px] flex-1 pb-4 text-justify '>
        <h1 className='text-center font-bold text-xl mb-4 border-b border-b-gray-400'>
          {body?.chapter || 'Select to view quiz content'}
        </h1>

        <div className=''>
          <ol className='list-decimal'>
            {Object.entries(body)
              .filter(([key]) => key.startsWith('question'))
              .map(([questionKey, questionData], questionIndex) => (
                <div key={questionKey} className='flex flex-col gap-2'>
                  <li>
                    <h3>{questionData.title}</h3>
                  </li>
                  <form className='flex flex-col gap-2 mb-8'>
                    {Object.entries(questionData.options).map(
                      ([optionKey, optionValue]) => (
                        <div key={optionKey} className='flex gap-4'>
                          <input
                            type='radio'
                            id={`${questionIndex}-${optionKey}`}
                            name='option'
                            value={optionKey}
                          />
                          <label htmlFor={`${questionIndex}-${optionKey}`}>
                            {optionValue}
                          </label>
                        </div>
                      ),
                    )}
                  </form>
                </div>
              ))}
            <div className='flex items-center justify-end gap-6 mt-4'>
              <button onClick={handleDelete} className='w-[17px] rounded'>
                <img className='w-fit rounded' src={trash} alt='' />
              </button>
            </div>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Question;
