const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore({
    projectId: "climate-monitoring",
});

router.post('/store', async function(req, res) {
    const body = req.body;
    let hash = crypto.createHash('sha256').update(body.key).digest('hex');
    if (hash !== "79a82b2818d6488e881cd5df4d58da530caff1ea9dbc2d19307846fed4cf29a4") {
        console.warn("Wrong key");
        res.send('NOT OK');
    } else {
        const raw = body.data;
        if (raw.endsWith(":0:0")) {
            res.send("Incomplete data");
            return;
        }
        const taskKey = datastore.key(["Record"]);
        const parts = body.data.split(":");
        const record = {
            key: taskKey,
            data: {
                raw: body.data,
                temperatureOutside: parts[0],
                humidityOutside: parts[1],
                temperatureInside: parts[2],
                humidityInside: parts[3],
                created: new Date()
            }
        };
        const task = await datastore.save(record);

        res.send(task);
    }
});

router.get('/get/:id', async function(req, res) {
    const id = req.params.id;
    const taskKey = datastore.key(["Record", parseInt(id)]);
    const [task] = await datastore.get(taskKey);
    res.send(task);
});

router.get('/recent', async function(req, res) {
    const query = datastore.createQuery("Record").order("created", {descending: true}).limit(30);
    const result = await datastore.runQuery(query);
    res.send(result);
});

module.exports = router;
