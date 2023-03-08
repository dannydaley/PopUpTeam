const express = require("express");
const router = express.Router();

const db = require("../config/db");

// Add message to recipient from sender
router.post("/insertMessage", (req, res) => {
    const sender = (req.session.userData.firstName + ' ' + req.session.userData.lastName);
    const { recipient, message, time, date } = req.body;

    const insertMessage = "INSERT INTO messages (sender, recipient, message, time, date) VALUES(?, ?, ?, ?, ?)"; // Inserts new message

    db.query(insertMessage, [sender, recipient, message, time, date], (err, rows) => {
        if (err) throw err;
        res.send("Message sent");
    });
});

// Get all messages
router.get("/getMessages", (req, res) => {
  const sender = (req.session.userData.firstName + ' ' + req.session.userData.lastName);
  const recipient = req.query.recipient;

  // Selects all messages where sender is logged in user and recipient is specified recipient
  const getSentMessages = "SELECT * FROM messages WHERE sender = ? AND recipient = ?"; 
  // Selects all messages where recipient is logged in user and sender is specified recipient
  const getReceivedMessages = "SELECT * FROM messages WHERE recipient = ? AND sender = ?";

  db.query(getSentMessages, [sender, recipient], (err, sentRows) => {
      if (err) throw err;
      db.query(getReceivedMessages, [sender, recipient], (err, receivedRows) => {
          if (err) throw err;

          // Combine the results of sent and received messages
          const allMessages = sentRows.concat(receivedRows);
          res.send(allMessages); // Sends message, session user and time of message
      });
  });
});

module.exports = router;