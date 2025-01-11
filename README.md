# PTU-3X-Calculator
PTU 3X Calculator
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PTU 3x Fitness Test Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            text-align: center;
        }
        form {
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            background: #f9f9f9;
        }
        label {
            display: block;
            margin-top: 10px;
        }
        input, button {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
        }
        #result {
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>PTU 3x Fitness Test Calculator</h1>
    <form id="ptuForm">
        <label for="chinups">Chin-ups (Reps):</label>
        <input type="number" id="chinups" min="0" required>

        <label for="situps">Sit-ups (Reps):</label>
        <input type="number" id="situps" min="0" required>

        <label for="runtime">3.2km Run Time (MM:SS):</label>
        <input type="text" id="runtime" placeholder="e.g., 18:30" required>

        <label for="age">Age:</label>
        <input type="number" id="age" min="0" required>

        <button type="button" onclick="calculateScores()">Calculate</button>
    </form>

    <div id="result"></div>

    <script src="script.js"></script>
</body>
</html>
