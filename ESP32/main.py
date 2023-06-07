
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

"""def get_datalogger_angle():
    # TCP Slave setup
    slave_tcp_port = 502            # port to listen to
    slave_addr = 0                 # bus address of client
    slave_ip = '192.168.100.7' 
    try:
      host = ModbusTCPMaster(
          slave_ip=slave_ip,
          slave_port=slave_tcp_port,
          timeout=1)   
      hreg_address = 0
      register_qty = 1
      register_value = host.read_holding_registers(
        slave_addr=slave_addr,
        starting_addr=hreg_address,
        register_qty=register_qty,
        signed=False)
      return register_value[0]
    except Exception:
      return "-1"

      """

def moveUp():
  relayPowerA.value(1)
  relayPowerB.value(1)
  sleep(1)
  relayMoveA.value(0)
  relayMoveB.value(0)
  sleep(1)
  relayPowerA.value(0)
  relayPowerB.value(0)

def moveDown():
  relayPowerA.value(1)
  relayPowerB.value(1)
  sleep(1)
  relayMoveA.value(1)
  relayMoveB.value(1)
  sleep(1)
  relayPowerA.value(0)
  relayPowerB.value(0)

def turnOff():
  relayPowerA.value(1)
  relayPowerB.value(1)
  relayMoveA.value(1)
  relayMoveB.value(1)

def messageAngle(currentAngle, newAngle):
  oled.fill(0)
  oled.text('MOVING MOTOR', 0, 0)
  oled.text('Current angle:', 0, 20)
  oled.text(str(currentAngle), 0, 30)
  oled.text('New Angle:', 0, 40)
  oled.text(str(newAngle), 0, 50)
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
      moveUp()
      setState(UP) 
    elif topic == b'test/upb' and action == 'DOWN':
      moveDown()
      setState(DOWN)  
    elif topic == b'test/upb' and action == 'OFF':
      turnOff()
      setState(OFF)
    """elif topic == b'test/upb' and action == "ANGLE":
      newAngle = received_msg['angle']
      currentAngle = get_datalogger_angle() 
      print("New Requested Angle: ", newAngle)
      print('Current Panel Angle: {}'.format(currentAngle))
      messageAngle(currentAngle, newAngle)
      movingUp = False
      movingDown = False
      while abs(int(newAngle) - int(currentAngle)) > 1:
        print(abs(int(newAngle) - int(currentAngle)))
        if int(newAngle) > int(currentAngle):
          movingDown = False
          if(not movingUp):
            moveUp()
            movingUp = True
        else:
          movingUp = False
          if(not movingDown):
            moveDown()
            movingDown = True
        sleep(1)
        currentAngle = get_datalogger_angle() 
        print("Current: ", str(currentAngle))
        print("New: ", str(newAngle))
        messageAngle(currentAngle, newAngle)
      turnOff()"""

      


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
  #try:
    client.check_msg()
    
  #except OSError as e:
   # restart_and_reconnect()


