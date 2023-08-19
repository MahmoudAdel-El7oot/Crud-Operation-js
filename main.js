var fullName = document.getElementById("name");
var age = document.getElementById("Age");
var phone = document.getElementById("phone");
var academic = document.getElementById("AC");
var id = document.getElementById("id");
var btn = document.getElementById("btn");
var inputs = document.getElementsByClassName("input");
var addBtn = document.getElementById("addBtn");
var students = [];

fullName.onkeyup = function () {
    var nameRegex = /^[a-z A-Z]{15,35}$/;
    if (nameRegex.test(fullName.value)) {
        btn.removeAttribute("disabled");
        document.getElementById("va").innerHTML = "";

    } else {
        btn.disabled = "true";
        document.getElementById("va").innerHTML = "* blease enter full name"

    }

}

age.onkeyup = function () {
    var ageRegex = /^([2][0-9]{1}|18|19|30)$/;
    if (ageRegex.test(age.value)) {
        btn.removeAttribute("disabled");
        document.getElementById("vb").innerHTML = "";
    } else {
        btn.disabled = "true";
        document.getElementById("vb").innerHTML = "* your age is not exist[18-->30]";
    }
}

phone.onkeyup = function () {
    var phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (phoneRegex.test(phone.value)) {
        btn.removeAttribute("disabled");
        document.getElementById("vc").innerHTML = "";
    } else {
        btn.disabled = "true";
        document.getElementById("vc").innerHTML = "* invalid phone number";
    }
}

academic.onkeyup = function () {
    var academicRegex = /^(general|first|second|third|fourth) (year)/;
    if (academicRegex.test(academic.value)) {
        btn.removeAttribute("disabled");
        document.getElementById("vd").innerHTML = "";
    } else {
        btn.disabled = "true";
        document.getElementById("vd").innerHTML = "* incorrect academic year "
    }
}

id.onkeyup = function () {
    var idRegex = /^[1-9][0-9]{13}$/;
    if (idRegex.test(id.value)) {
        btn.removeAttribute("disabled")
        document.getElementById("ve").innerHTML = "";
    } else {
        btn.disabled = "true";
        document.getElementById("ve").innerHTML = "* please enter valid National ID";
    }
}

if (JSON.parse(localStorage.getItem("student")) != null) {
    students = JSON.parse(localStorage.getItem("student"));
    disblayData()

}

btn.addEventListener("click", function () {
    if (fullName.value && age.value && phone.value && academic.value && id.value != '') {
        if (btn.value == "SAVE") {
            collectData();
            disblayData();
            clear();

        }
    }
})

function collectData() {
    var student =
    {
        name: fullName.value,
        age: age.value,
        phone: phone.value,
        academic: academic.value,
        id: id.value,
    }

    students.push(student);
    localStorage.setItem("student", JSON.stringify(students));
}

function disblayData() {
    trs = "";
    for (i = 0; i < students.length; i++) {
        trs += `<tr>
        <td>${i + 1}</td>
        <td>${students[i].name}</td>
        <td>${students[i].age}</td>
        <td>${students[i].phone}</td>
        <td>${students[i].academic}</td>
        <td>${students[i].id}</td>
        <td><button onclick="deleteRow(${i})" style="background-color: red;font-size: 25px;">delete</button></td>
        <td><button onclick="updataRow(${i})"  style="background-color: yellow;font-size: 25px;">update</button></td>
        
                </tr>`

        document.getElementById("tbody").innerHTML = trs;
    }
}

function clear() {
    for (i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function deleteRow(index) {
    var sure = confirm("do you sure for deleting this data ?");
    if (sure == true) {
        students.splice(index, 1)
        localStorage.setItem("student", JSON.stringify(students));
        disblayData()
    }
}

function search(value) {
    trs = "";
    for (i = 0; i < students.length; i++) {
        if (students[i].name.toUpperCase().includes(value.toUpperCase())) {
            trs += `<tr>
        <td>${i + 1}</td>
        <td>${students[i].name}</td>
        <td>${students[i].age}</td>
        <td>${students[i].phone}</td>
        <td>${students[i].academic}</td>
        <td>${students[i].id}</td>
        <td><button onclick="deleteRow(${i})" style="background-color: red;font-size: 25px;">delete</button></td>
        <td><button onclick="updataRow(${i})"  style="background-color: yellow;font-size: 25px;">update</button></td>
        
              </tr>`


        }
    }
    document.getElementById("tbody").innerHTML = trs;
}

function changeBtn() {
    btn.value = "updata"
    btn.style = "background-color: yellow;font-size: 25px;";
    btn.removeAttribute("disabled");
}

function updataRow(index) {
    var indexBtn = index;
    collectRow(indexBtn);
    addUpdateBtn();
    var updateBtn = document.getElementById("updateBtn");
    updateBtn.addEventListener("click", function () {
        if (fullName.value && age.value && phone.value && academic.value && id.value != '') {
            collectUpdateValue(indexBtn);
            disblayData();
            clear();
            addSaveBtn();
        }
    })
}

function collectRow(index) {
    fullName.value = students[index].name;
    age.value = students[index].age;
    phone.value = students[index].phone;
    academic.value = students[index].academic;
    id.value = students[index].id;
}

function collectUpdateValue(index) {
    var student =
    {
        name: fullName.value,
        age: age.value,
        phone: phone.value,
        academic: academic.value,
        id: id.value,
    }

    students.splice(index, 1, student);
    localStorage.setItem("student", JSON.stringify(students));
}

function addUpdateBtn() {
    addBtn.innerHTML = `<input  type="submit" id="updateBtn" value="update" style="background-color: yellow;font-size: 25px;">`
}

function addSaveBtn() {
    addBtn.innerHTML = `<input disabled type="submit" id="btn" value="SAVE" style="color: rgb(5, 47, 5);background-color: rgb(13, 83, 134);font-size: 25px;">`
}

