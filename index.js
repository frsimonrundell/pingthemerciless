const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;
app.use(cors()); 

// Parse JSON requests
app.use(bodyParser.json());

// Handle JSON PUT requests
app.put('/updateSite', (req, res) => {
  const { uid, siteName, siteURL, Passphrase } = req.body;


// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'mysql.pingthemerciless.codemonkey.design',
  port: 3306,
  user: 'pingthemerciless',
  password: 'zrNkPy2T',
  database: 'pingthemerciless_codemon',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Date Stamp
const currentDate = new Date();

// Format the date and time as a string
const formattedDateTime = currentDate.toISOString();

// Perform a basic write operation (insert data)
const pingData = {
  GUID: uid,
  siteName: siteName,
  siteURL: siteURL,
  lastChecked: currentDate,
};

connection.query('INSERT INTO wp_pingthemerciless SET ?', pingData, (err, results, fields) => {
  if (err) {
    console.error('Error inserting data:', err);
    throw err;
  }
  console.log('Data inserted successfully at ' +currentDate);
});

// Close the connection
connection.end((err) => {
  if (err) {
    console.error('Error closing connection:', err);
  }
  console.log('Connection closed');
});

  console.log('Received PUT request with data:', { uid, siteName, siteURL });

  // Send a success response
  res.json({ message: 'Site data updated successfully' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
