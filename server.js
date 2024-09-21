const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle the Pressure Ratio calculation
app.post('/calculate-pressure-ratio', (req, res) => {
    const { PSIa, PSIg, systemDepression } = req.body;

    // Calculate P2c and P1c
    const P2c = PSIg + PSIa;
    const P1c = PSIa - systemDepression;

    // Validate P1c to avoid division by zero or negative values
    if (P1c <= 0) {
        return res.status(400).json({ error: "P1c (PSIa - System Depression) must be greater than 0." });
    }

    // Calculate Pressure Ratio
    const pressureRatio = P2c / P1c;
    res.json({ pressureRatio });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
