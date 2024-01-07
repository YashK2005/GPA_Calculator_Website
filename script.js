function addCourse() {
    const coursesDiv = document.getElementById('courses');
    const courseInput = document.createElement('div');
    courseInput.className = 'course';
    courseInput.innerHTML = `
        <input type="number" min="0" max="100" placeholder="Grade (%)" step="0.01" required />
        <input type="number" min="0" placeholder="Weight" step="0.1" required />
        <button type="button" onclick="removeCourse(this)">Remove</button>
    `;
    coursesDiv.appendChild(courseInput);
    courseInput.addEventListener('input', calculateGPA);
}

function removeCourse(button) {
    button.parentElement.remove();
    calculateGPA();
}

function calculateGPA() {
    const courses = document.querySelectorAll('.course');
    let totalWeight = 0, totalWeightedGPA = 0;

    courses.forEach(course => {
        const grade = parseFloat(course.children[0].value);
        const weight = parseFloat(course.children[1].value);
        if (!isNaN(grade) && !isNaN(weight)) {
            totalWeight += weight;
            totalWeightedGPA += convertGradeToGPA(grade) * weight;
        }
    });

    const cumulativeGPA = totalWeight ? (totalWeightedGPA / totalWeight).toFixed(2) : 'N/A';
    document.getElementById('result').textContent = `Cumulative GPA: ${cumulativeGPA}`;
}

function convertGradeToGPA(grade) {
    if (grade >= 90) return 4.0;
    else if (grade >= 85) return 3.9;
    else if (grade >= 80) return 3.7;
    else if (grade >= 77) return 3.3;
    else if (grade >= 73) return 3.0;
    else if (grade >= 70) return 2.7;
    else if (grade >= 67) return 2.3;
    else if (grade >= 63) return 2.0;
    else if (grade >= 60) return 1.7;
    else if (grade >= 57) return 1.3;
    else if (grade >= 53) return 1.0;
    else if (grade >= 50) return 0.7;
    else return 0; // For grades below 50
}

// Initial course input
addCourse();