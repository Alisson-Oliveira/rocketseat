import React, { useState } from 'react';
import { View, TextInput, Alert, Keyboard } from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const messageFormatted = message.trim();

    if(messageFormatted.length > 0) {
      setSendingMessage(true);

      await api.post('/messages', { message: messageFormatted })

      setMessage('');
      Keyboard.dismiss();
      setSendingMessage(false);
      Alert.alert('Mensagem enviada com sucesso!');

    } else {
      Alert.alert('Escreva a mensagem para enviar.');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        keyboardAppearance='dark'
        placeholder='Digite sua messagem :)'
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        style={styles.input}
        editable={!sendingMessage}
      />
      <Button 
        title='ENVIAR MENSAGEM'
        color={COLORS.WHITE}
        backgroundColor={COLORS.PINK}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  )
}