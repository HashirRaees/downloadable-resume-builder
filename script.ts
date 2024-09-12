// listing the elements
document.getElementById("resumeform")?.addEventListener("submit", function(event){
    event.preventDefault();

    // get references to form elements using their id's

  const profilePictureInput = document.getElementById('profilePic') as HTMLInputElement
    //type assertion
    const nameElement = document.getElementById('name') as HTMLInputElement
    const emailElement = document.getElementById('email') as HTMLInputElement
    const phoneElement = document.getElementById('phone') as HTMLInputElement
    const educationElement = document.getElementById('education') as HTMLInputElement
    const experienceElement = document.getElementById('experience') as HTMLInputElement
    const skillsElement = document.getElementById('skill') as HTMLInputElement
 //**
const usernameElement = document.getElementById('username') as HTMLInputElement;    

     if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement){
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skill = skillsElement.value; 
  //**
  const username = usernameElement.value;    
  const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`       
    
//Picture elements
const profilePictureFile = profilePictureInput.files?.[0]
const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
    //Create output
    const resumeHTML = `
    <h2>Resume</h2>
    ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
    <p><strong>Name:</strong>${name}</p>
    <p><strong>Email:</strong>${email}</p>
    <p><strong>Phone:</strong>${phone}</p>
  

    <h3>Education</h3>
    <p>${education}</p>

    <h3>Experience</h3>
    <p>${experience}</p>

    <h3>Skills</h3>
    <p>${skill}</p>
    `;

//Display resume in an output container
    const resumeOutputElement = document.getElementById('resumeoutput')
    if(resumeOutputElement){
        resumeOutputElement.innerHTML = resumeHTML;
        resumeOutputElement.classList.remove("hidden");

    // Create container for buttons    
     const buttonsContainer = document.createElement("div");
     buttonsContainer.id = "buttonsContainer";
     resumeOutputElement.appendChild(buttonsContainer);

    // Add Download pdf button
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download as Pdf";
    downloadButton.addEventListener("click", () =>{
        window.print(); //Open the print dialog, allowing user to save as pdf
    });
    buttonsContainer.appendChild(downloadButton);
    
    // Add shareable link button 
    const shareLinkButton = document.createElement("button")
    shareLinkButton.textContent = "Copy Shareable Link";
    shareLinkButton.addEventListener("click", async () =>{
        try{
            // Create a unique shareable link (stimulate it in this case)
            const shareableLink = `https://myresume.com/resumes/${name.replace(/\s+/g,"_")}_cv.html`
        
        // use clipboard API to copy the shareable link
        await navigator.clipboard.writeText(shareableLink);
        alert("Shareable link copied to clipboard");
      } catch(err){
        console.error("Failed to copy link:", err);
        alert("Failed top copy link to clipboard. Please try agin later.");
      }
    });
    buttonsContainer.appendChild(shareLinkButton);
      
    } else{
        console.error('The resume output elements are missing')
    }
}    else{
     console.error('One or more output elements are missing')
}
})