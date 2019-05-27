# Climate monitoring

This is a simple app to track temperature and humidity recorded by my 
small IoT device based on Photon from http://particle.io.

[This file](particle/tempreader.ino) is the source code running on Photon. 
Currently the device has two sensors attached. One is placed outside and one
is inside, on the board to gether with the device.

Results are published to Particle's cloud and later using a web hook sent
to Node.js app running on Google App Engine.

## To do
1. Frontend to present the graphs
1. Mini mobile app
1. Schematics and pictures of the device