import edit from '/edit.svg';
import trash from '/trash.svg';
import add from '/add.svg';
import axios from 'axios';

import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TeacherHome = () => {
  const storage = localStorage.getItem('token');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:3030/api/notes');
        setNotes(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  if (!storage) {
    return <Navigate to='/login' />;
  }
  return (
    <div className='flex'>
      <div className='top-0 left-0 h-full overflow-y-auto pt-20 px-8 fixed border border-gray-400'>
        <h1 className='font-bold mb-2'>Chapters</h1>
        <ol className='list-decimal pl-4'>
          {notes.map((note) => (
            <li key={note.chapter}>{note.title}</li>
          ))}
        </ol>
        <Link to='/teacher/write'>
          <img className='w-6 ml-auto mr-6' src={add} alt='' />
        </Link>
      </div>
      <div className='px-4 pt-20 ml-[200px] flex-1 pb-4 text-justify '>
        <h1 className='text-center font-bold text-xl mb-4'>
          Title of Chapter here
        </h1>
        <p className='leading-loose'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          blanditiis ex totam, reprehenderit laboriosam consequatur itaque
          magnam optio, iste, praesentium aliquid ab illum. Ea eaque quos rem
          amet assumenda qui ad perferendis sunt, voluptatibus at repudiandae
          voluptas quaerat vitae veritatis ex minima facilis eius quo sapiente
          saepe itaque nisi eum aliquam voluptate! Repellendus explicabo quidem
          libero numquam earum? Labore dignissimos debitis repudiandae. Rerum,
          molestias eveniet porro aliquid ipsam perferendis dolores. Corporis
          libero repellat provident! Ipsum totam eligendi ad soluta quas commodi
          laborum voluptas labore necessitatibus? Earum harum distinctio vitae
          esse fuga dolorum ratione animi deleniti numquam! Nisi sunt ducimus
          minima quidem repellat. Alias quaerat vitae odio excepturi? Aspernatur
          quibusdam voluptates praesentium quisquam mollitia rem commodi enim
          soluta magni est doloremque iste consequatur aperiam tempore, ducimus
          eos voluptatum reiciendis voluptatibus maxime quis. Mollitia cumque
          veniam accusamus cupiditate delectus eos ex eligendi. Itaque hic nulla
          facilis, in incidunt deleniti inventore ipsam porro voluptatem
          temporibus unde quia, repudiandae veritatis maiores similique modi?
          Quo qui quod, tempore nulla, corporis sed fugit beatae est voluptatem
          magni enim deserunt perferendis incidunt velit nisi placeat? Quibusdam
          cum possimus labore vitae numquam repudiandae voluptatum dolorum, quis
          maiores minus, sint, eveniet ipsa consequatur. Quos pariatur
          voluptatibus, in at asperiores modi voluptas sint libero ad vero vitae
          praesentium porro impedit ipsa saepe nesciunt expedita sequi magni
          itaque accusantium ipsam odio assumenda. Commodi illum adipisci et
          excepturi dolores blanditiis aspernatur doloremque sapiente ea!
          Praesentium ipsa reprehenderit ad architecto tempora consequatur culpa
          incidunt optio perspiciatis explicabo repellendus, enim assumenda non
          ab facilis quidem commodi, molestias maxime. Blanditiis doloremque
          debitis ad officiis totam? Optio aut porro, exercitationem illo est
          vel placeat obcaecati quasi asperiores molestiae possimus, quod atque.
          Reiciendis nesciunt quae tempora corporis libero iste animi, omnis
          facere. Soluta nam veritatis, quod mollitia, adipisci nihil facere
          recusandae illum inventore maxime officia voluptate saepe dolores
          beatae sint, odio quo odit consequatur cum ipsa. Debitis quia eos ab.
          Commodi a vitae est ullam, possimus voluptatibus placeat mollitia
          minima deleniti beatae sed nesciunt consequatur voluptas porro eius
          amet eligendi provident libero obcaecati laboriosam sunt quas labore
          deserunt. Nihil exercitationem, cum enim labore pariatur ut optio
          distinctio quia, facere temporibus blanditiis tempora maxime repellat
          illo quas! At adipisci, voluptatibus assumenda accusamus odit nostrum
          temporibus sit culpa laudantium eveniet nisi modi consequuntur
          mollitia aut inventore reiciendis soluta eligendi accusantium
          dignissimos vero expedita facilis minus doloribus magnam? Deleniti,
          mollitia sapiente. Blanditiis, accusamus? Labore corrupti non eaque
          officiis ea cupiditate consequatur asperiores, eius molestias vel
          dolorem quod dignissimos nostrum. Assumenda, eligendi. Animi deserunt
          in totam distinctio, eum repellendus. Maiores, odio. Veniam voluptate
          dolore eaque odit aliquid autem, cumque doloribus sunt tempora maiores
          amet optio, assumenda voluptatem earum doloremque consequuntur saepe
          fugit tempore porro sit est iste ratione! Quae, quam accusamus dolor
          odit laudantium possimus voluptatum? Obcaecati ut explicabo magni
          dignissimos nisi voluptate adipisci unde iste, distinctio earum,
          dolore mollitia? Reiciendis dolore ut dolorem perspiciatis
          consequuntur, consectetur, cumque dolor blanditiis maxime doloremque
          repudiandae autem quo amet officiis minima sapiente repellat! Illum,
          animi fuga. Ad exercitationem quas, quis architecto sapiente
          voluptatum quam.
        </p>
        <div className='flex items-center justify-end gap-6 mt-4'>
          <Link to='/teacher/write?edit'>
            <img className='w-6' src={edit} alt='' />
          </Link>
          <img className='w-6' src={trash} alt='' />
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
