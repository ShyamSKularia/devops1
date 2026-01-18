const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'ui' directory, which is one level up
app.use(express.static(path.join(__dirname, '../ui')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../ui/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running heavily on http://localhost:${PORT}`);
});
