
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const projects = [
    { title: "ONLINE QUIZ MAKER", description: "Built a website which allows user to create and take quiz .Implemented backend (Node.js & Express.js) , frontend(React.js) , database used (MongoDB) AND CSS for styling."
},
    { title: "A QUADCOPTER - (SAE AEROTHON 2023)", description:"Coordinated with the team members in designing of quadcopter.Assisted in innovation of drop mechanism using servo motor,carrying out mathematical calculations and in selection of materials and components." },
    
];

const projectGrid = document.querySelector('.project-grid');
projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');
    projectElement.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
    `;
    projectGrid.appendChild(projectElement);
});


const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Python","C++","SQL","Microprocessor 8085","Image Processing using OpenCv","Data structures","Algorithms"];

const skillsList = document.getElementById('skills-list');
skills.forEach(skill => {
    const skillElement = document.createElement('li');
    skillElement.textContent = skill;
    skillsList.appendChild(skillElement);
});


const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});








const education = [
    { degree: "Bachelor of Electronics & Communication ", school: "National Institute of Technology,Srinagar", year: "2021-2025" },
    { degree: "Higher Secondary School", school: "K.V.N Naik college of arts,commerce & science,Nashik", year: "2019-2021" }
];

const workExperience = [
    { position: "Image Processing Intern", company: "Eastro Control systems", year: "January 2024" },
    
];

const activities = [
"Member of team AVIATO ranked 28 th among 84 teams participating in AEROTHON 2023",
"Core Member of 'Sargam Club', NIT Srinagar’s official singing and dancing club under GYMKHANA.(organized and managed over 20+ events)",
"Member of core committee of 'Rang-e-chinar - NIT's culturalfest'.",
"NCC cadet of J&K battalion"
];


function populateResumeSection(data, elementId) {
    const list = document.getElementById(elementId);
    data.forEach(item => {
        const li = document.createElement('li');
        if (typeof item === 'string') {
            li.textContent = item;
        } else {
            li.innerHTML = `<strong>${item.degree || item.position}</strong><br>
                            ${item.school || item.company}, ${item.year}`;
        }
        list.appendChild(li);
    });
}

populateResumeSection(education, 'education-list');
populateResumeSection(workExperience, 'experience-list');
populateResumeSection(activities, 'activities-list');

