const fs = require("fs");

var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "10.1.2.108",
  port: "3307",
  user: "root",
  password: "root",
  database: "solar_lab_db",
  flags: ["+LOCAL_FILES"],
});

const query =
  `LOAD DATA LOCAL INFILE ? INTO TABLE Datalogger ` +
  `FIELDS TERMINATED BY ? ` +
  `ENCLOSED BY ? ` +
  `LINES TERMINATED BY ? ` +
  `IGNORE ? ROWS ` +
  `(@datetime,record,solarRadiationCMP,solarRadiationCMPAvg, uvaRadiationLP, uvaRadiationLPAvg, batteryVoltage, dataloggerTemperature, voltage, current, solarRadiationCS320) ` +
  `SET datetime = STR_TO_DATE(@datetime,'%Y-%m-%d %H:%i:%s')`;

const path = "./Data/Datalogger_Min5.dat";

connection.connect(function (err) {
  if (err) throw err;
});

fs.watchFile(
  path,
  {
    // Passing the options parameter
    bigint: false,
    persistent: true,
    interval: 1000,
  },
  (curr, prev) => {
    connection.query(
      "SELECT COUNT(*) FROM Datalogger",
      function (err, result, fields) {
        if (err) throw err;
        if (result[0]["COUNT(*)"] <= 0) {
          connection.query(
            {
              sql: query,
              values: [path, ",", '"', "\n", 4],
              infileStreamFactory: () => fs.createReadStream(path),
            },
            (err, _ok) => {
              if (err) {
                console.log(err);
                throw err;
              }
              ok = _ok;
            }
          );
        } else {
          var ignoredRows = 4 + result[0]["COUNT(*)"];
          connection.query(
            {
              sql: query,
              values: [path, ",", '"', "\n", ignoredRows],
              infileStreamFactory: () => fs.createReadStream(path),
            },
            (err, _ok) => {
              if (err) {
                console.log(err);
                throw err;
              }
              ok = _ok;
            }
          );
        }
      }
    );
  }
);
