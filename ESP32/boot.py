import machine
import network
from umqttsimple import MQTTClient
import ubinascii
import esp
import json
from time import sleep
import time
import random
import struct
from umodbus.tcp import TCP as ModbusTCPMaster
esp.osdebug(None)
import gc
gc.collect()

#MQTT 
#mqtt_server = '192.168.46.161'
#mqtt_server = '192.168.124.82'
mqtt_server = '192.168.100.7'
client_id = ubinascii.hexlify(machine.unique_id())
port = 1883
client = MQTTClient(client_id, mqtt_server, port)

#Topics
topic_sub = b'solarlab/esp32/cbba'
topic_pub = b'solarlab/server'

#Wifi
ssid = 'FLI GAMBOA BALDI'
password = 'Andres14213009'

#ssid = 'UPB'
#password = ''

station = network.WLAN(network.STA_IF)
station.active(True)
station.connect(ssid, password)
#wlan_mac = station.config('mac')
#print(ubinascii.hexlify(wlan_mac).decode().upper())

while station.isconnected() == False:
    pass





