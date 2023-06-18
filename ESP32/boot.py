import machine
import ssd1306
import network
from umqttsimple import MQTTClient
import ubinascii
import esp
import json
from time import sleep
import time
import random
#from umodbus.tcp import TCP as ModbusTCPMaster
esp.osdebug(None)
import gc
gc.collect()

global oled 

#MQTT 

mqtt_server = '192.168.100.7'
#mqtt_server = '192.168.46.207'
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

#Initialize OLED params

pin16 = machine.Pin(16, machine.Pin.OUT)
pin16.value(1)
oled_width = 128
oled_height = 64
i2c = machine.SoftI2C(scl=machine.Pin(15), sda=machine.Pin(4), freq=10000)
oled = ssd1306.SSD1306_I2C(oled_width, oled_height, i2c)
#Display messages
oled.fill(0)
oled.text('Connecting to', 0, 0)
oled.text(ssid, 0, 10)
oled.show()

while station.isconnected() == False:
    pass

#print(station.ifconfig()[0]);
oled.fill(0)
oled.text('Connected to', 0, 0)
oled.text(ssid, 0, 10)
oled.text(station.ifconfig()[0], 0, 20)
oled.show()




