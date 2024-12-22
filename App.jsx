import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Voice from '@react-native-community/voice';

function App() {
  const [voiceSettings, setVoiceSettings] = useState({
    result: '',
    error: '',
    isRecording: false,
  });

  useEffect(() => {
    Voice.onSpeechStart = () =>
      setVoiceSettings(prev => ({...prev, isRecording: true}));
    Voice.onSpeechEnd = () =>
      setVoiceSettings(prev => ({...prev, isRecording: false}));
    Voice.onSpeechError = err =>
      setVoiceSettings(prev => ({...prev, error: err}));
    Voice.onSpeechResults = res =>
      setVoiceSettings(prev => ({...prev, result: res.value?.[0]}));

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    try {
      await Voice.start('id-ID');
      setVoiceSettings(prev => ({...prev, isRecording: true}));
    } catch (error) {
      setVoiceSettings(prev => ({...prev, error}));
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setVoiceSettings(prev => ({...prev, isRecording: false}));
    } catch (error) {
      setVoiceSettings(prev => ({...prev, error}));
    }
  };

  return (
    <SafeAreaView style={{justifyContent: 'center', flex: 1}}>
      <Text style={{fontSize: 40, textAlign: 'center', fontWeight: '700'}}>
        Speech to Text
      </Text>
      <View
        style={{
          paddingVertical: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20}}>Result: {voiceSettings.result}</Text>
        {/* <Text style={{fontSize: 20}}>Error: {voiceSettings.error}</Text> */}
      </View>
      <TouchableOpacity
        onPress={voiceSettings.isRecording ? stopRecording : startRecording}
        style={{
          backgroundColor: voiceSettings.isRecording ? 'green' : 'red',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
          padding: 5,
          marginHorizontal: 30,
          borderRadius: 8,
        }}>
        <Text
          style={{
            fontSize: 28,
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
          }}>
          {voiceSettings.isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default App;
