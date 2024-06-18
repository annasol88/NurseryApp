import { collection, getDocs, setDoc, updateDoc, doc } from 'firebase/firestore'; 
import { db } from '../firebase/main'

const NEWS_FEED_PATH = 'newsfeed'

export async function getPosts() {
  let posts = []
  query = await getDocs(collection(db, NEWS_FEED_PATH))
  query.forEach(doc => {
    posts.push({id: doc.id, ...doc.data()})
  })
  return posts
}

export async function createPost(newPost) {
  const postsRef = collection(db, NEWS_FEED_PATH);
  await setDoc(doc(postsRef), {
    content: newPost.content,
    images: ['image refs'], 
    timestamp: Date.now(),
    likes: [], 
    comments: [],
    userName: newPost.userName,
    userAvatar: newPost.Avatar
  });
}

export async function updatePost(id, updatedPost) {
  return updateDoc(doc(db, NEWS_FEED_PATH, id), updatedPost)
}
