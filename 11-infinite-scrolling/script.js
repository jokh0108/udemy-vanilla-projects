const filterInput = document.querySelector('#jsFilterInput');
const post = document.querySelector('#jsPost');

let dummyPosts = [
  {
    id: 1,
    title: 'qui est esse',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis tempore cupiditate amet illum nostrum voluptatem nisi ab recusandae voluptate quaerat, commodi sed soluta eos nesciunt aut id eius consequatur. Mollitia!',
  },
  {
    id: 2,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    content:
      'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    id: 3,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    content:
      'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla',
  },
  {
    id: 4,
    title: 'qui est esse',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis tempore cupiditate amet illum nostrum voluptatem nisi ab recusandae voluptate quaerat, commodi sed soluta eos nesciunt aut id eius consequatur. Mollitia!',
  },
  {
    id: 5,
    title: 'qui est esse',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis tempore cupiditate amet illum nostrum voluptatem nisi ab recusandae voluptate quaerat, commodi sed soluta eos nesciunt aut id eius consequatur. Mollitia!',
  },
  {
    id: 6,
    title: 'gggggg',
    content: 'kkkk',
  },
];

const renderPost = () => {
  post.innerHTML = '';
  dummyPosts.forEach(({ id, title, content }) => {
    const postItem = document.createElement('li');
    postItem.classList.add('post__item');

    const postNumber = document.createElement('h4');
    postNumber.classList.add('post__item__number');
    postNumber.innerText = id;

    const postTitle = document.createElement('h2');
    postTitle.classList.add('post__item__title');
    postTitle.innerText = title;

    const postContent = document.createElement('p');
    postContent.classList.add('post__item__content');
    postContent.innerText = content;

    postItem.appendChild(postNumber);
    postItem.appendChild(postTitle);
    postItem.appendChild(postContent);

    post.appendChild(postItem);
  });
};

const init = () => {
  renderPost();
};

init();
