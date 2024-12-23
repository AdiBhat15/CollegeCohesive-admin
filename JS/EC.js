import { db, doc, setDoc } from './config.js';

document.addEventListener('DOMContentLoaded',function(){

const allExtraCurriculars = document.querySelectorAll('#additionalActivitiess div form');

  let activities = [];
  let positions = [];
  let organizations =[];
  let descriptions =[];
  let participations =[];
  let times= [];
  let hours = [];
  let weeks =[];
  let intends = [];

  activities[0]=document.getElementById("activities").values;
  positions[0]=document.getElementById("position").values;
  organizations[0]=document.getElementById("organization").values;
  descriptions[0]=document.getElementById("description").values;
  participations[0]=document.getElementById("participation").values;
  times[0]=document.getElementById("time").values;
  hours[0]=document.getElementById("hours").values;
  weeks[0]=document.getElementById("weeks").values;
  intends[0]=document.getElementById("intend").values;
  
allExtraCurriculars.forEach((form)=>{
   activities.push(form.querySelector('select[name = "activity"]').value)
   activities.push(form.querySelector('select[name = "activity"]').value)
   activities.push(form.querySelector('select[name = "activity"]').value)
   activities.push(form.querySelector('select[name = "activity"]').value)
   activities.push(form.querySelector('select[name = "activity"]').value)
   activities.push(form.querySelector('select[name = "activity"]').value)
   activities.push(form.querySelector('select[name = "activity"]').value)
   activities.push(form.querySelector('select[name = "activity"]').value)
   activities.push(form.querySelector('select[name = "activity"]').value)
})
})

