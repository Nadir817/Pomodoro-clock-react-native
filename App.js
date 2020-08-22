import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TextInput, Vibration } from 'react-native';
import { Audio } from 'expo-av';

const soundObject = new Audio.Sound()
const source = require('./assets/sounds/lovingly.mp3');

const Pomodoro = () => {
  const [text, setText] = useState('Pomodoro')
  const [inputValue, setInputvalue] = useState()
  const [time, setTime] = useState(new Date(1500000).toISOString().substr(14, 5));
  const [running, setRunning] = useState(false)
  const [timerId, setTimerId] = useState('')
  const [workTime, setWorkTime] = useState(1500)
  const [play, setPlay] = useState('none')


  const handleClick = () => {
    if (!running) {
      let sec = workTime
      setTimerId(setInterval(() => {
        setWorkTime(sec -= 1)
        setTime(new Date(sec * 1000).toISOString().substr(14, 5))
      }, 1000)
      )
    }
  }

  const handlePause = () => {
    clearInterval(timerId)
    setTimerId('')
    setRunning(false)
  }

  const handleReset = () => {
    clearInterval(timerId)
    setTimerId('')
    setRunning(false)
    setWorkTime(1500)
    setTime(new Date(1500000).toISOString().substr(14, 5))
    setPlay('none')
  }

  const handleBreak = () => {
    if (running) {
      clearInterval(timerId)
    }
    setTimerId('');
    setRunning(false);
    setTime(new Date(300000).toISOString().substr(14, 5))
    setWorkTime(300);
    if (workTime == 300) {
      handleClick()
    }
  }

  const playSound = async () => {
    await soundObject.loadAsync(source)
    await soundObject.playAsync()
  }

  const stopPlay = async () => {
    await soundObject.stopAsync()
  }

  if (workTime === 0) {
    clearInterval(timerId);
    Vibration.vibrate([1000, 2000, 2000]);
    if (play == 'none') {
      setPlay('play')
      playSound()
    }
  }

  if (play == 'stop') {
    stopPlay()
  }



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput onChangeText={(text) => {
        setText(text)
        setInputvalue(text)
      }} placeholder='type something here...' onEndEditing={() => setInputvalue('')} value={inputValue} />
      <View>
        <Text style={{ fontSize: 40, color: 'orange' }}>{text}</Text>
      </View>
      <View style={styles.clock} onStartShouldSetResponder={() => play == 'play' ? setPlay('stop') : null}>
        <Text style={{ fontSize: 25 }}>{time}</Text>
      </View>
      <View style={styles.buttons1}>
        <Button title='Start' color='white' onPress={handleClick} />
      </View>
      <View style={styles.buttons2}>
        <Button title='Pause' color='white' onPress={handlePause} />
      </View>
      <View style={styles.buttons3}>
        <Button title='Reset' color='white' onPress={handleReset} />
      </View>
      <View style={styles.buttons4}>
        <Button title='Break' color='white' onPress={handleBreak} />
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  buttons1: {
    width: '30%',
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: 'blue'
  },
  buttons2: {
    width: '30%',
    margin: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'orange',
    backgroundColor: 'orange'
  },
  buttons3: {
    width: '30%',
    margin: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'red'
  },
  buttons4: {
    width: '30%',
    margin: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgb(45,223,255)',
    backgroundColor: 'rgb(45,223,255)'
  },
  clock: {
    padding: 70,
    margin: 10,
    marginTop: 50,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 50
  }
})


export default Pomodoro;



