import { collection, getDocs, setDoc, updateDoc, doc, orderBy, query, where } from 'firebase/firestore'; 
import { db } from '../firebase/main'

const NEWS_FEED_PATH = 'newsfeed'

export async function getPosts() {
  let posts = []
  let q = query(collection(db, NEWS_FEED_PATH), orderBy('timestamp', 'desc'))
  let resp = await getDocs(q)
  resp.forEach(doc => {
    posts.push({id: doc.id, ...doc.data()})
  })
  return posts
}

// all data uploads are created through calling newPost to ensure consistent data mappings
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

export async function updateUserPosts(userName, newUserName) {
  let q = query(collection(db, NEWS_FEED_PATH), where("userName", "==", userName))
  let resp = await getDocs(q)
  return resp.forEach(async doc => {
    let post = doc.data()
    post.userName = newUserName
    await updatePost(doc.id, post)
  })
}

export async function updateUserLikedPosts(userName, newUsername) {
  let q = query(collection(db, NEWS_FEED_PATH), where("likes", "array-contains", userName))
  let resp = await getDocs(q)
  return resp.forEach(async doc => {
    let post = doc.data()
    post.likes = post.likes.map(u => u == userName ? newUsername : userName)
    await updatePost(doc.id, post)
  })
}