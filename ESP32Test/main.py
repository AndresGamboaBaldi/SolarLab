
import time
import ubinascii
client = MQTTClient(client_id, mqtt_server, port)

#States
CONNECTED = 0
DISCONNECTED = 1
CHARGING = 2
DISCHARGING = 3
state = CONNECTED

relayDisconnect = machine.Pin(21, machine.Pin.OUT)
relayDisconnect2= machine.Pin(22, machine.Pin.OUT)
relayCharge = machine.Pin(19, machine.Pin.OUT)
relayDischarge = machine.Pin(23, machine.Pin.OUT)

#Initialize Pins
relayDisconnect.value(1)
relayDisconnect2.value(1)
relayCharge.value(1)
relayDischarge.value(1)

def setState(newState):
  global state, oled
  state = newState
  oled.fill(0)
  if (state == CONNECTED):
    oled.text('Panel CONNECTED', 0, 0)
    oled.text('Press the Button', 0, 10)
    oled.text('to Disconnect', 0, 20)
  
  elif (state == DISCONNECTED):
    oled.text('Panel DISCONNECTED', 0, 0)
    oled.text('Press the Button', 0, 10)
    oled.text('to Charge the', 0, 20)
    oled.text('Capacitors', 0, 30)

  elif (state == CHARGING):
    oled.text('Capacitors', 0, 0)
    oled.text('CHARGING', 0, 10)
    oled.text('Press the Button', 0, 20)
    oled.text('to Discharge', 0, 30)
    oled.text('the Capacitors', 0, 40)

  elif (state == DISCHARGING):
    oled.text('Capacitors', 0, 0)
    oled.text('DISCHARGING', 0, 10)
    oled.text('Press the Button', 0, 20)
    oled.text('to CONNECT', 0, 30)
    oled.text('the Panel Again', 0, 40)

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
      if state == CONNECTED:
        time.sleep(1)
        relayDisconnect.value(0)
        relayDisconnect2.value(0)
        setState(DISCONNECTED)  
      elif state == DISCONNECTED:
        time.sleep(1)
        relayCharge.value(0)
        setState(CHARGING)  
      elif state == CHARGING:
        time.sleep(1)
        relayDischarge.value(0)
        relayDisconnect.value(1)
        relayDisconnect2.value(1)
        setState(DISCHARGING) 
      elif state == DISCHARGING:
        time.sleep(1)
        relayCharge.value(1)
        relayDischarge.value(1)
        time.sleep(1)
        setState(CONNECTED) 

    
  

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
  oled.text('to DISCONNECT', 0, 30)
  oled.text('the PANEL', 0, 40)
  oled.show()

  return client


def restart_and_reconnect():
  print('Failed to connect to MQTT broker. Restarting...')
  oled.fill(0)
  oled.text('Failed to', 0, 0)
  oled.text('Connect to MQTT', 0, 10)
  oled.text('Restarting....', 0, 20)
  oled.show()
  time.sleep(3)
  machine.reset()

# MQTT Connection
try:
  client = connect_and_subscribe()
except OSError as e:
  restart_and_reconnect()

while True:
  try:
    client.check_msg()
    val = voltage.read()
    val = val * (3.3 / 4095)
    print(round(val, 2), "V") # Keep only 2 digits

    val2 = current.read()
    print(round(val2, 2), "A") # Keep only 2 digits
    time.sleep_ms(500)
    
  except OSError as e:
    restart_and_reconnect()


