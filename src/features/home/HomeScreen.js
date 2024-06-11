import { FlatList, SafeAreaView } from 'react-native';
import Post from '../../components/PostComponent';
import { GlobalStyles } from '../../styles/shared.styles';

const DATA = [
  {
    key: 1,
    content: 'Tomorrow is PJ day!!!',
    images: [],
    timestamp: Date.now(),
    userAvatar: 'https://avataaars.io/?avatarStyle=Circle',
    userName: 'Nursery Office',
    likes: 0,
    comments: []
  },
  {
    key: 2,
    content: 'Fantastic experiement today!!!',
    images: [],
    timestamp: Date.now(),
    userAvatar: 'https://avataaars.io/?avatarStyle=Circle',
    userName: 'Nursery Office',
    likes: 0,
    comments: []
  }
]

export default function HomeScreen({navigation}) {
  return (
    <FlatList
      data={DATA}
      renderItem={({item}) => Post(item)}
    />
  );
}

