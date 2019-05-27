// This #include statement was automatically added by the Particle IDE.
#include <Adafruit_Sensor.h>

#include <DHT.h>
#include <SHT1x.h>

// GND - black
// 3v3 - RED
#define DATAPIN D0 // GREEN
#define CLOCKPIN D1 // YELLOw
#define DHTPIN D4
#define DHTTYPE DHT22

SHT1x sht10(DATAPIN, CLOCKPIN);
DHT dht(DHTPIN, DHTTYPE);

void setup() {
    dht.begin();
}

void publishToParticle() {
    int sh_humidity = sht10.readHumidity();
    int sh_temperature = sht10.readTemperatureC();

    int temperature = dht.readTemperature(0);
    int humidity = dht.readHumidity();

    String sh_temp = String(sh_temperature);
    String sh_hum = String(sh_humidity);
    String data = sh_temp + ":" + sh_hum + ":" + temperature + ":" + humidity;
    Particle.publish("temperature", data, PRIVATE);
}

void loop(void) {
    publishToParticle();
    delay(15 * 60 * 1000);
}