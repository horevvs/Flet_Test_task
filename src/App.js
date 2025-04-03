import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [myId, setMyId] = useState(null);
  const [filtered, setFiltered] = useState([]);

  // делаем запрос на api, получаем данные
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts([posts, ...data]))
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(data => setComments([comments, ...data]))
  }, [])

  // функция которая фильтрует по айти данный с стейта комментарий по айди
  const getPostId = (id) => {
    // проверяем что id пробрасывается правильно
    setMyId(id)
    let result = comments.filter(elem => elem.postId == id);
    setFiltered([filtered, ...result])

    console.log(result)
  };

  return (
    <div className='flex_position'>

      <div>
        <p className='text_position'>Получаем спискок наших сообщений</p>
        <ul>
          {/* мапаем наш  массив с постами */}
          {posts.map(post => (
            <li key={post.id} onClick={() => getPostId(post.id)}   >
              {post.title}
            </li>
          ))}
        </ul>
      </div>

      <div>
        {/* мапаем фильтрованный массив */}
        <p>Получаем список наших  комментарий</p>
        {filtered.map(item => (
          <li key={item.id}    >
            {item.body}
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;



