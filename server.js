const express = require('express');
const app = express();
const port = 4000;

app.use(express.static('public'));

app.listen(port, () => console.log(`Sensor data app listening on port ${port}`));

require('dotenv').config();

const { Pool } = require('pg');
//coinnect to db
const pool = new Pool({
    connectionString: process.env.TIMESCALE_SERVER
});


app.get('/device/:device/temperature', async (req, res) => {
    const device = req.params.device;
    const query = `SELECT recorded_at, reading::float as temperature 
        FROM sensor_data 
        WHERE measurement = 'temperature' 
        AND device = $1
        LIMIT 2`;
    const params = [device];
    console.log(query, params);

    try {
        const results = await pool.query(query, params);
        console.log(`returning ${results.rowCount} rows`);
        res.send(results.rows);
    } catch(err) {
        console.log(err.stack);
        res.status(400).send('server error');
    }
});

