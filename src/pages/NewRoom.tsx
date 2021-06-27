import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { database } from '../services/firebase';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';



export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

async function handleCreateRoom(event: FormEvent) {
  event.preventDefault();
  if (newRoom.trim() === '') {
    return;
  }
  const roomRef = database.ref('rooms');
  const firebaseRoom = await roomRef.push({
    title: newRoom,
    authorId: user?.id,
  })
  history.push(`/rooms/${firebaseRoom.key}`)
}


  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="ilustracao" />
        <strong>Build Q&amp;A live chats</strong>
        <p>Answer your audience in real time. </p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Create new room</h2>
        <form onSubmit={handleCreateRoom}>
          <input type="text"
          placeholder="Type chat room code" 
          onChange={e => setNewRoom(e.target.value)}
          value={newRoom}/>
          <Button type="submit">Create room</Button>
        </form>
        <p><Link to="/">Click here</Link> to enter in a existing room</p>
        </div>
      </main>
    </div>
  )
}