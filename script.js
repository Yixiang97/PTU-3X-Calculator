// Age categories with grade thresholds
const ageCategories = {
    "Category X": { minAge: 0, maxAge: 24, gradeA: 250 },
    "Category Y": { minAge: 25, maxAge: 29, gradeA: 240 },
    "Category Y1": { minAge: 30, maxAge: 34, gradeA: 230 },
    "Category Z": { minAge: 35, maxAge: 39, gradeA: 220 },
    "Category Z1": { minAge: 40, maxAge: 44, gradeA: 210 },
    "Category V": { minAge: 45, maxAge: 49, gradeA: 200 },
    "Category V1": { minAge: 50, maxAge: 100, gradeA: 170 }
};

// Function to calculate scores
function calculateScores() {
    const chinups = parseInt(document.getElementById("chinups").value);
    const situps = parseInt(document.getElementById("situps").value);
    const runtime = document.getElementById("runtime").value;
    const age = parseInt(document.getElementById("age").value);

    // Validate inputs
    if (isNaN(chinups) || isNaN(situps) || !runtime.match(/^\d{1,2}:\d{2}$/) || isNaN(age)) {
        alert("Please enter valid inputs in the correct format.");
        return;
    }

    // Convert runtime to total seconds
    const [runMinutes, runSeconds] = runtime.split(":").map(Number);
    const totalRunTime = runMinutes * 60 + runSeconds;

    // Chin-up score
    const chinupScoring = {
        20: 100, 19: 95, 18: 90, 17: 85, 16: 80,
        15: 75, 14: 70, 13: 65, 12: 60, 11: 55,
        10: 50, 9: 45, 8: 40, 7: 35, 6: 30,
        5: 25, 4: 20, 3: 15, 2: 10, 1: 5, 0: 0
    };
    const chinupScore = chinups >= 20 ? 100 : (chinupScoring[chinups] || 0);

    // Sit-up score
    const situpScore = situps >= 80 ? 100 : situps;

    // Run scoring
    const runScoring = [
        { maxTime: 840, score: 100 }, { maxTime: 900, score: 90 }, { maxTime: 960, score: 80 },
        { maxTime: 1020, score: 70 }, { maxTime: 1080, score: 60 }, { maxTime: 1140, score: 50 },
        { maxTime: 1200, score: 40 }, { maxTime: 1260, score: 30 }, { maxTime: 1320, score: 20 },
        { maxTime: 1380, score: 10 }, { maxTime: 1434, score: 1 }
    ];
    let runScore = 1; // Default to lowest score
    for (const entry of runScoring) {
        if (totalRunTime <= entry.maxTime) {
            runScore = entry.score;
            break;
        }
    }

    const totalScore = chinupScore + situpScore + runScore;

    // Determine Grade A threshold based on age
    let gradeAThreshold = 250; // Default threshold
    for (const category in ageCategories) {
        const { minAge, maxAge, gradeA } = ageCategories[category];
        if (age >= minAge && age <= maxAge) {
            gradeAThreshold = gradeA;
            break;
        }
    }

    // Calculate points to Grade A
    const pointsToGradeA = Math.max(gradeAThreshold - totalScore, 0);
    const gradeMessage = pointsToGradeA === 0
        ? `<p style="color: #00ff00;">CONGRATULATIONS! You achieved Grade A!</p>`
        : `${pointsToGradeA} points more to Grade A`;

    // Update progress bar
    const progress = Math.min((totalScore / gradeAThreshold) * 100, 100);

    // Display result in modal
    document.getElementById("modalContent").innerHTML = `
        <h2>Results</h2>
        <p><strong>Chin-up Score:</strong> ${chinupScore}</p>
        <p><strong>Sit-up Score:</strong> ${situpScore}</p>
        <p><strong>Run Score:</strong> ${runScore}</p>
        <p><strong>Total Score:</strong> ${totalScore}</p>
        <p><strong>${gradeMessage}</strong></p>
        <div class="progress-bar">
            <div class="progress" style="width: ${progress}%;"></div>
        </div>
    `;
    document.getElementById("resultModal").style.display = "block";
}

// Function to close modal
function closeModal() {
    document.getElementById("resultModal").style.display = "none";
}