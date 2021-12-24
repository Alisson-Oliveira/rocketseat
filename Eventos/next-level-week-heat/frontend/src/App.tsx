import { useContext } from 'react';
import styles from './App.module.scss';

import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { SendMessageFrom } from './components/SendMessageFrom';
import { AuthContext } from './contexts/auth';

export function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessageList />
      { !!user ? <SendMessageFrom /> : <LoginBox /> }
    </div>
  )
}