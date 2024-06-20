import { collection, getDocs, setDoc, updateDoc, doc, orderBy, query } from 'firebase/firestore'; 
import { db } from '../firebase/main'

const NEWS_FEED_PATH = 'newsfeed'

export async function getPosts() {
  let posts = []
  let q = query(collection(db, NEWS_FEED_PATH), orderBy('timestamp','desc'))
  let resp = await getDocs(q)
  resp.forEach(doc => {
    posts.push({id: doc.id, ...doc.data()})
  })
  return posts
}

export function newPost(content, images, userName, userAvatar) {
  return {
    content: content,
    images: images, 
    timestamp: Date.now(),
    likes: [], 
    comments: [],
    userName: userName,
    userAvatar: userAvatar
  }
}

export async function createPost(newPost) {
  const postsRef = collection(db, NEWS_FEED_PATH);
  return setDoc(doc(postsRef), newPost);
}

export async function updatePost(id, updatedPost) {
  return updateDoc(doc(db, NEWS_FEED_PATH, id), updatedPost)
}
