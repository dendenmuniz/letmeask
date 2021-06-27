import { FormEvent, useState } from 'react';
import { useHistory }  from 'react-router-dom';
import { database } from '../services/firebase';

import '../styles/auth.scss';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';



export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('');
  
  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if(roomCode.trim() === ''){
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if(!roomRef.exists()){
      alert('Room does not exist.')
      return;
    }
    if(roomRef.val().closedAt){
      alert('Room already closed.');
      return;
    }
    history.push(`/rooms/${roomCode}`);
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
        <button className="create-room"
        onClick={handleCreateRoom}>
          <img src={googleIconImg} alt="Google logo" />
          Build your chat room with Google
        </button>
        <div className="separator">or entry in a room</div>
        <form onSubmit={handleJoinRoom}>
          <input type="text"
          placeholder="Type chat room code"
          onChange={e => setRoomCode(e.target.value)} 
          value={roomCode}/>
          <Button type="submit">Enter</Button>
        </form>
        </div>
      </main>
    </div>
  )
}