const filterInput = document.querySelector('#jsFilterInput');
const post = document.querySelector('#jsPost');
const loading = document.querySelector('.loader');

const LIMIT = 6;

let page = 1;
let posts = [];

const extendPosts = (newPosts) => {
  posts = [...posts, ...newPosts];
};

const renderPost = (posts) => {
  post.innerHTML = '';
  posts.forEach(({ id, title, body }) => {
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
    postContent.innerText = body;

    postItem.appendChild(postNumber);
    postItem.appendChild(postTitle);
    postItem.appendChild(postContent);

    post.appendChild(postItem);
  });
};

const getPosts = async () => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addPosts = async () => {
  const newPosts = await getPosts();
  extendPosts(newPosts);
  renderPost(posts);
  filterInput.value = '';
};

const onInput = (event) => {
  const keyword = event.target.value;
  const filteredPosts = posts.filter(
    (post) =>
      post.title.indexOf(keyword) >= 0 || post.body.indexOf(keyword) >= 0
  );
  renderPost(filteredPosts);
};

const init = async () => {
  await addPosts();
  page += 1;
  await addPosts();
  filterInput.addEventListener('input', onInput);
};

init();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loading.classList.add('show');
    setTimeout(() => {
      loading.classList.remove('show');
      page += 1;
      addPosts();
    }, 1000);
  }
});
