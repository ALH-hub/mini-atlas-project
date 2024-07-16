import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import trash from '/trash.svg';
import add from '/add.svg';
import edit from '/edit.svg';
import { baseRoute } from '../../../config';
import axios from 'axios';

const Question = () => {
  const [body, setBody] = useState({});

  const questions = [
    {
      chapter: 'chapter 1',
      question1: {
        title: 'This is the first question',
        options: {
          A: 'Prop1',
          B: 'Prop2',
          C: 'Prop3',
          D: 'Prop4',
        },
      },
      question2: {
        title: 'This is the second question',
        options: {
          A: 'Prop1',
          B: 'Prop2',
          C: 'Prop3',
          D: 'Prop4',
        },
      },
      question3: {
        title: 'This is the third question',
        options: {
          A: 'Prop1',
          B: 'Prop2',
          C: 'Prop3',
          D: 'Prop4',
        },
      },
      question4: {
        title: 'This is the fourth question',
        options: {
          A: 'Prop1',
          B: 'Prop2',
          C: 'Prop3',
          D: 'Prop4',
        },
      },
      question5: {
        title: 'This is the fifth question',
        options: {
          A: 'Prop1',
          B: 'Prop2',
          C: 'Prop3',
          D: 'Prop4',
        },
      },
    },
    {
      chapter: 'chapter 2',
      question1: {
        title: 'This is the first section 2 question',
        options: {
          A: 'Prop1',
          B: 'Prop2',
          C: 'Prop3',
          D: 'Prop4',
        },
      },
      question2: {
        title: 'This is the second question',
        options: {
          A: 'Prop1',
          B: 'Prop2',
          C: 'Prop3',
          D: 'Prop4',
        },
      },
      question3: {
        title: 'This is the third question',
        options: {
          A: 'Prop1',
          B: 'Prop2',
          C: 'Prop3',
          D: 'Prop4',
        },
      },
      question4: {
        title: 'This is the fourth question',
        options: {
          A: 'Prop1',
          B: 'Prop2',
          C: 'Prop3',
          D: 'Prop4',
        },
      },
      question5: {
        title: 'This is the fifth question',
        options: {
          A: 'Prop1',
          B: 'Prop2',
          C: 'Prop3',
          D: 'Prop4',
        },
      },
    },
  ];

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
        <ol className='list-decimal px-2'>
          {questions.map((chapterObj, chapterIndex) => (
            <div key={chapterIndex}>
              <li>
                <button
                  onClick={() => {
                    setBody(chapterObj);
                  }}
                >
                  {chapterObj.chapter}
                </button>
              </li>
            </div>
          ))}
        </ol>
      </div>
      <div className='p-8 pt-20 ml-[250px] flex-1 pb-4 text-justify '>
        <h1 className='text-center font-bold text-xl mb-4 border-b border-b-gray-400'>
          {body?.chapter || 'Select to view quiz content'}
        </h1>

        <div className=''>
          {Object.entries(body)
            .filter(([key]) => key.startsWith('question'))
            .map(([questionKey, questionData], questionIndex) => (
              <div key={questionKey} className='flex flex-col gap-2'>
                <h3>{questionData.title}</h3>
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
        </div>

        <div className='flex items-center justify-end gap-6 mt-4'>
          <Link className='w-[20px] rounded'>
            <img className='w-fit rounded' src={edit} alt='' />
          </Link>
          <button className='w-[17px] rounded'>
            <img className='w-fit rounded' src={trash} alt='' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
