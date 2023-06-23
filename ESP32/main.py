
#States
OFF = 0
UP = 1
DOWN = 2
state = OFF
msg=""
data=[]

relayPowerA = machine.Pin(21, machine.Pin.OUT)
relayPowerB= machine.Pin(22, machine.Pin.OUT)
relayMoveA = machine.Pin(19, machine.Pin.OUT)
relayMoveB = machine.Pin(23, machine.Pin.OUT)

#Initialize Pins
relayPowerA.value(1)
relayPowerB.value(1)
relayMoveA.value(1)
relayMoveB.value(1)

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

def get_datalogger_data():
  gc.collect()
  # TCP Slave setup
  slave_tcp_port = 502           # port to listen to
  slave_id = 1                # bus address of client
  slave_ip = 'solarlab.upb.edu' 
  try:
    host = ModbusTCPMaster(
        slave_ip=slave_ip,
        slave_port=slave_tcp_port,
        timeout=2)   
    hreg_address = 0
    register_qty = 18
    register_values = host.read_holding_registers(
      slave_addr=slave_id,
      starting_addr=hreg_address,
      register_qty=register_qty, 
      signed=True)
  
    converted_data = []
    
    # Convert each cell to an unsigned 16-bit integer
    unsigned_data = [(cell & 0xFFFF) for cell in register_values]

    for i in range(0, len(unsigned_data), 2):
    # Combine the two cells into a single 32-bit integer
      combined_data = (unsigned_data[i+1] << 16) | unsigned_data[i]
      # Convert the integer to a 32-bit float (little-endian byte order)
      float_data = struct.unpack('<f', struct.pack('<i', combined_data))[0]
      converted_data.append(float_data)
  
    return converted_data
  except Exception as e:
    print(e)
    return get_datalogger_data()

def sendData(dataToSend):
  global topic_pub, client
  msg = {
  "departmentName": "Cochabamba",
  "voltage": round(dataToSend[7],2),
  "current": round(dataToSend[8],2),
  "power": round(dataToSend[7]*dataToSend[8],2),
  "uvaRadiation": round(dataToSend[5],2),
  "radiation": round(dataToSend[4],2),
  "panelangle": int(dataToSend[2]),
  "efficiencyTest": [],
  "isTesting": False
  }
  message = json.dumps(msg)
  client.publish(topic_pub, str(message))


def sub_cb(topic, msg):

  try:
    received_msg = json.loads(msg)
  except Exception:
    pass
  else:
    action = received_msg['action']
    print(action)
  
    if topic == topic_sub and action == "ANGLE":
      newAngle = received_msg['angle']
      currentAngle = get_datalogger_data()[2]
      print("New Requested Angle: ", newAngle)
      print('Current Panel Angle: {}'.format(currentAngle))
      movingUp = False
      movingDown = False
      notMovingCount = 0
      previousAngle = currentAngle
      while abs(int(newAngle) - int(currentAngle)) > 1:
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
        dataloggerData = get_datalogger_data()
        currentAngle = dataloggerData[2] 
        sendData(dataloggerData)
        print("Current: ", str(currentAngle))
        if(abs(int(currentAngle) - int(previousAngle))<1):
          notMovingCount +=1
          if(notMovingCount>3):
            print("Error Moving Panel") 
            break
        else: 
          notMovingCount=0
      print("Moved To: ", str(currentAngle)) 
      turnOff()
    #elif topic == topic_sub and action == 'DATA':
     #sendData(get_datalogger_data())

      
def connect_and_subscribe():
  global client_id, mqtt_server, topic_sub
  client.set_callback(sub_cb)
  client.connect()
  client.subscribe(topic_sub)
  client.subscribe(b'test/upb')
  print('Connected to %s MQTT broker, subscribed to %s topic' % (mqtt_server, topic_sub))
  
  return client

def restart_and_reconnect():
  print('Failed to connect to MQTT broker. Restarting...')
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
    sendData(get_datalogger_data())
    sleep(1)

    
  #except OSError as e:
   # restart_and_reconnect()


