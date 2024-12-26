import { db, doc, setDoc, collection } from "./config.js";

document.getElementById("submit").addEventListener("click", async function (e) {
  e.preventDefault();

  const allExtraCurriculars = document.querySelectorAll("#additionalActivities div form");

  const ecCollectionRef = collection(db, `students/${userEmail}/EC`);
  const ecSnapshot = await getDocs(ecCollectionRef);

  let activities = [];
  let positions = [];
  let organizations =[];
  let descriptions =[];
  let participations =[];
  let times= [];
  let hours = [];
  let weeks =[];
  let intends = [];

  activities[0] = document.getElementById("activities").value;
  positions[0] = document.getElementById("position").value;
  organizations[0] = document.getElementById("organization").value;
  descriptions[0] = document.getElementById("description").value;
  participations[0] = document.getElementById("participation").value;
  times[0] = document.getElementById("time").value;
  hours[0] = document.getElementById("hours").value;
  weeks[0] = document.getElementById("weeks").value;
  intends[0] = document.getElementById("intend").value;

  allExtraCurriculars.forEach((form) => {
    activities.push(form.querySelector('select[name="activity"]').value);
    positions.push(form.querySelector('input[name="position"]').value);
    organizations.push(form.querySelector('input[name="organization"]').value);
    descriptions.push(form.querySelector('input[name="description"]').value);
    participations.push(form.querySelector('input[name="participation"]').value);
    times.push(form.querySelector('select[name="time"]').value);
    hours.push(form.querySelector('input[name="hours"]').value);
    weeks.push(form.querySelector('input[name="weeks"]').value);
    intends.push(form.querySelector('select[name="intend"]').value);
  });

  const userEmail = document.cookie.split("sanitizedEmail=")[1].split(";")[0];

  try {
    for (let index = 0; index < activities.length; index++) {
      const userCollection = collection(db, "students", userEmail, "extra-curriculars");
      setDoc(doc(userCollection), {
        activityType: activities[index],
        position: positions[index],
        organization: organizations[index],
        description: descriptions[index],
        participationGradeLevels: participations[index],
        timeOfParticipation: times[index],
        hoursPerWeek: hours[index],
        weeksPerYear: weeks[index],
        intendToParticipateInCollege: intends[index],
      });
    }
    alert("data added successfully");
  } catch (error) {
    alert("Some error occurred");
    console.error(error);
  }
});