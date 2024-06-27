import { db, doc, setDoc } from './config.js';

document.getElementById("submit1").addEventListener("click", function (e) {
    e.preventDefault();
    const fname = document.getElementById("studentName").value;
    const mname = document.getElementById("middleName").value;
    const sname = document.getElementById("surname").value;
    const dob = document.getElementById("dob").value;
    const origin1 = document.getElementById("nationality").value;
    const origin2 = document.getElementById("nationality2").value;
    const add = document.getElementById("address").value;
    const street = document.getElementById("street").value;
    const city = document.getElementById("city").value;
    const zipcode = document.getElementById("zipcode").value;
    const country = document.getElementById("country").value;
    const mobileno = document.getElementById("mobileNo").value;
    const email = document.getElementById("email").value;
    console.log("test");

    const userEmail = 'adirbhat@gmail.com';
    const stuDocRef = doc(db, `students/${userEmail}/stuInfo/${email}`)

    setDoc(stuDocRef, {
        studentName: fname,
        middleName: mname,
        surname: sname,
        Dob: dob,
        nationality: origin1,
        nationality2: origin2,
        address: add,
        Street: street,
        City: city,
        Zipcode: zipcode,
        Country: country,
        MobileNo: mobileno,
        Email: email,
    });
    alert("send hogaya");

});

document.getElementById("submit2").addEventListener("click", function (e) {
    e.preventDefault(); 
    const mother = document.getElementById("mother").value;
    const surname = document.getElementById("surname").value;
    const mob = document.getElementById("mob").value;
    const email = document.getElementById("email").value;
    const legace = document.getElementById("legace").value;
    const garduate = document.getElementById("garduate").value;
    const father = document.getElementById("father").value;
    const fsur = document.getElementById("fsur").value;
    const fno = document.getElementById("fno").value;
    const femail = document.getElementById("femail").value;
    const flegace = document.getElementById("flegace").value;
    const fgrad = document.getElementById("fgrad").value;

    const userEmail = 'adirbhat@gmail.com';
    const parDocRef = doc(db, `students/${userEmail}/parInfo/${email}`)

    setDoc(parDocRef, {
        Mother: mother,
        Surname: surname,
        Mob: mob,
        Email: email,
        Legace: legace,
        Garduate: garduate,
        Father: father,
        fsurname: fsur,
        fmob: fno,
        Femail: femail,
        Flegace: flegace,
        fgarduate: fgrad,

    })

        
})
