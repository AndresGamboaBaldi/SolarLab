

import machine
from time import sleep
import ubinascii
client = MQTTClient(client_id, mqtt_server, port)

#States
OFF = 0
UP = 1
DOWN = 2
state = OFF

relayPowerA = machine.Pin(21, machine.Pin.OUT)
relayPowerB= machine.Pin(22, machine.Pin.OUT)
relayMoveA = machine.Pin(19, machine.Pin.OUT)
relayMoveB = machine.Pin(23, machine.Pin.OUT)

#Initialize Pins
relayPowerA.value(1)
relayPowerB.value(1)
relayMoveA.value(1)
relayMoveB.value(1)


def setState(newState):
  global state, oled
  state = newState
  oled.fill(0)
  if (state == OFF):
    oled.text('MOTOR OFF', 0, 0)
    oled.text('Press the Button', 0, 20)
    oled.text('to Move the', 0, 30)
    oled.text('Motor UP', 0, 40)
  
  elif (state == UP):
    oled.text('Motor Moving UP', 0, 0)
    oled.text('Press the Button', 0, 20)
    oled.text('to Move the', 0, 30)
    oled.text('Motor DOWN', 0, 40)

  elif (state == DOWN):
    oled.text('Motor Moving DOWN', 0, 0)
    oled.text('Press the Button', 0, 20)
    oled.text('to Move TURN OFF', 0, 30)
    oled.text('the Motor', 0, 40)

  oled.show()

def sub_cb(topic, msg):
  try:
    received_msg = json.loads(msg)
  except Exception:
    pass
  else:
    action = received_msg['action']
    print(action)
    if topic == b'test/upb' and action == 'UP':
      relayPowerA.value(1)
      relayPowerB.value(1)
      sleep(1)
      relayMoveA.value(0)
      relayMoveB.value(0)
      sleep(1)
      relayPowerA.value(0)
      relayPowerB.value(0)
      setState(UP)  
    elif topic == b'test/upb' and action == 'DOWN':
      relayPowerA.value(1)
      relayPowerB.value(1)
      sleep(1)
      relayMoveA.value(1)
      relayMoveB.value(1)
      sleep(1)
      relayPowerA.value(0)
      relayPowerB.value(0)
      setState(DOWN)  
    elif topic == b'test/upb' and action == 'OFF':
      relayPowerA.value(1)
      relayPowerB.value(1)
      relayMoveA.value(1)
      relayMoveB.value(1)
      setState(DOWN)  
  

def connect_and_subscribe():
  global client_id, mqtt_server, topic_sub
  client.set_callback(sub_cb)
  client.connect()
  client.subscribe(topic_sub)
  print('Connected to %s MQTT broker, subscribed to %s topic' % (mqtt_server, topic_sub))
  #Display messages
  oled.fill(0)
  oled.text('UPB', 0, 0)
  oled.text('Solar Remote Lab', 0, 10)
  oled.text('Press the Button', 0, 20)
  oled.text('to Move the', 0, 30)
  oled.text('Motor UP', 0, 40)
  oled.show()

  return client


def restart_and_reconnect():
  print('Failed to connect to MQTT broker. Restarting...')
  oled.fill(0)
  oled.text('Failed to', 0, 0)
  oled.text('Connect to MQTT', 0, 10)
  oled.text('Restarting....', 0, 20)
  oled.show()
  sleep(3)
  machine.reset()

# MQTT Connection
try:
  client = connect_and_subscribe()
except OSError as e:
  restart_and_reconnect()

while True:
  try:
    client.check_msg()
    
  except OSError as e:
    restart_and_reconnect()


