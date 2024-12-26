import { db, doc, setDoc, collection } from './config.js';

document.getElementById("submit1").addEventListener("click", function (e) {
    e.preventDefault();
  const userEmail = document.cookie.split("sanitizedEmail=")[1]?.split(";")[0];

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

    // const docRef = doc(db, "Si", fname); // Firestore document reference
    const userCollection = collection(db, "students", userEmail, "StuInfo");

    setDoc(doc(userCollection), {
        fname: fname,
        mname: mname,
        sname: sname,
        dob: dob,
        origin1: origin1,
        origin2: origin2,
        add: add,
        street: street,
        city: city,
        zipcode: zipcode,
        country: country,
        mobileno: mobileno,
        email: email,
    }).then(() => {
        alert("Data sent successfully!");
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
});

document.getElementById("submit2").addEventListener("click", function (e) {
    e.preventDefault(); 
  const userEmail = document.cookie.split("sanitizedEmail=")[1]?.split(";")[0];

    const mother = document.getElementById("mother-name").value;
    const surname = document.getElementById("mother-surname").value;
    const mob = document.getElementById("mother-mobile").value;
    const email = document.getElementById("mother-email").value;
    const legace = document.getElementById("mother-undergraduate").value;
    const garduate = document.getElementById("mother-graduate").value;
    const father = document.getElementById("father-name").value;
    const fsur = document.getElementById("father-surname").value;
    const fno = document.getElementById("father-mobile").value;
    const femail = document.getElementById("father-email").value;
    const flegace = document.getElementById("father-undergraduate").value;
    const fgrad = document.getElementById("father-graduate").value;

    // const userEmail = 'adirbhat@gmail.com';
    // const parDocRef = doc(db, `students/${userEmail}/parInfo`, email); // Firestore document reference
    const userCollection = collection(db, "students", userEmail, "ParInfo");


    setDoc(doc(userCollection), {
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
    }).then(() => {
        alert("Parent information sent successfully!");
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
});
