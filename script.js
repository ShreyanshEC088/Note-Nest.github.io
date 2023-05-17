document.getElementById("minMarkCal").addEventListener("click", function () {
    let val1 = document.getElementById("minMark").value;
    let sub1 = document.getElementById("minMarkSub").value;
    let a = [90, 80, 70, 60, 55, 50, 40];
    let b = ['O', 'A+', 'A', 'B+', 'B', 'C', 'P'];
    var output = [];
    if (val1 < 0 || val1 > 50)
        alert("Enter the marks between 0 and 50");
    else if (val1 < 20)
        alert("You are not Eligible for SEE");
    else {
        var grades = []; var grade = [];
        if (sub1 == 1) {
            for (var i = 0; i < a.length; i++) {
                var k = a[i] - val1;
                if (k <= 50)
                    grades.push((k * 2) - 1);
                else
                    grades.push("You Cannot get this Grade!");
            }
            for (var i = 0; i < a.length; i++) {
                if (grades[i] >= 41 || grades[i] == "You Cannot get this Grade!") {
                    grade.push(grades[i]);
                }
            }
            grade.push(40);
            for (var i = 0; i < grades.length; i++) {
                if (grade[i] != undefined)
                    output.push(grade[i]);
                else
                    output.push("");
            }

        }
        else if (sub1 == 0) {
            for (var i = 0; i < a.length; i++) {
                var k = a[i] - val1;
                if (k <= 50)
                    grades.push(k);
                else
                    grades.push("You Cannot get this Grade!");
            }
            for (var i = 0; i < a.length; i++) {
                if (grades[i] >= 21 || grades[i] == "You Cannot get this Grade!") {
                    grade.push(grades[i]);
                }
            }
            grade.push(20);
            for (var i = 0; i < grades.length; i++) {
                if (grade[i] != undefined)
                    output.push(grade[i]);
                else
                    output.push("");
            }
        }
    }
    let ResultString = `  <thead>
           <tr>
             <th scope="col">Grade</th>
             <th scope="col">Minimum Marks</th>
           </tr>
         </thead>`;
    for (i = 0; i < grades.length; i++) {
        ResultString += `<tr>
               <th scope="row"><strong>${b[i]}</strong></th>
               <td >${output[i]}</td>
               </tr>`
    }

    let minMarkRes = document.getElementById("minMarkRes");
    minMarkRes.innerHTML = ResultString;

});

document.getElementById("subCgpa").addEventListener("click", function () {
    let subjects = ["Numerical Methods and Probability Models", "Engineering Electromagnetics", "Microprocessor", "Communication System-1", "Signal Processing", "Microprocessor Lab", "Communication System-1 Lab", "Signal Processing Lab", "Constitution of India & Professional Ethics", "Ability Enhancement Course"];
    let credits = [3, 3, 3, 3, 3, 1, 1, 1, 1, 1];
    let markssee = [];
    let markscie = [];
    let allMarkscie;
    let allMarkssee;
    let rangecie = 0; let rangesee = 0;
    allMarkscie = document.querySelectorAll('.cie1');
    allMarkssee = document.querySelectorAll('.see1');
    allMarkscie.forEach(element => {
        if (element.value < 0 || element.value > 100 || element.value == "")
            rangecie = 1;
    });
    allMarkssee.forEach(element => {
        if (element.value < 0 || element.value > 100 || element.value == "")
            rangesee = 1;
    });
    if (rangecie == 1 && rangesee == 1)
        alert("Please Enter the value in the indicated range.");
    else {
        for (i = 0; i < allMarkscie.length; i++) {
            markscie.push(parseInt(allMarkscie[i].value));
        }
        for (i = 0; i < allMarkssee.length; i++) {
            markssee.push(parseInt(allMarkssee[i].value));
        }
    }
    //made two arrays one of cie marks and the other consits of the see marks!!
    var gp1 = [];
    var g1 = [];

    for (var i = 0; i < 10; i++) {
        var str = gradeGenerator(markscie[i], markssee[i],credits[i]);
        var g = ""; // Initialize g as an empty string
        var gp = 0;

        for (var j = 0; j < str.length; j++) {
            if (Number.isInteger(parseInt(str.charAt(j)))) {
                gp = gp * 10 + parseInt(str.charAt(j));
            } else {
                g += str.charAt(j);
            }
        }

        gp1.push(gp);
        g1.push(g);
    }
    var mulCredits = 0;
    for (var i = 0; i < credits.length; i++) {
        var mul = credits[i] * gp1[i];
        mulCredits = mulCredits + mul;
    }
    var sgpa = (mulCredits/20.0);
    let gpaResultString = `  <thead>
    <tr>
      
      <th scope="col">Subject</th>
      <th scope="col">Grade</th>
      <th scope="col">Grade Point</th>
    </tr>
  </thead>`

    for (i = 0; i < 10; i++) {
        gpaResultString += `<tr>
        <th scope="row"><em>${subjects[i]}</em></th>
        <td>${g1[i]}</td>
        <td>${gp1[i]}</td>
        </tr>`
    }


    let gpaResult = document.getElementById("gpaResult");
    let res = document.getElementById("result");
    gpaResult.innerHTML = gpaResultString;
    res.innerHTML = `<h5><em>Your expected GPA is ${sgpa}</em></h5>`

});

function gradeGenerator(cie, see,credit) {
    var g=0;
    if(credit == 3)
    g = Math.round((see / 2));
    else 
    g = see;
    var k = cie + g;
    var grade;
    var gradePoint;
    if (k >= 90) {
        grade = 'O';
        gradePoint = 10;
    }
    else if (k >= 80) {
        grade = 'A+';
        gradePoint = 9;
    }
    else if (k >= 70) {
        grade = 'A';
        gradePoint = 8;
    }
    else if (k >= 60) {
        grade = 'B+';
        gradePoint = 7;
    }
    else if (k >= 55) {
        grade = 'B';
        gradePoint = 6;
    }
    else if (k >= 50) {
        grade = 'C';
        gradePoint = 5;
    }
    else if (k >= 40) {
        grade = 'P';
        gradePoint = 4;
    }
    else if (k >= 0 && k < 40) {
        grade = 'F';
        gradePoint = 0;
    }
    else {
        alert("Invalid marks Entry");
        grade = "";
        gradePoint = -99;
    }
    // alert(gradePoint + grade);
    return (gradePoint + grade);
}