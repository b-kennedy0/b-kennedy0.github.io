const queueSection = document.getElementById("queue-section");
const meetingSection = document.getElementById("meeting-section");
let waitingList = [];
let inMeetingList = [];

// Function to fetch the latest data from the Google Sheet
function fetchData() {
  // Make an AJAX request to fetch the data from the Google Sheet
  fetch(
    "https://opensheet.elk.sh/1cg3rOzKUCB3tG3p0TERC1KhXAzYX55Kydg-JWmO9LhI/inMeetingList"
  )
    .then((response) => response.json())
    .then((data) => {
      // Extract the inMeetingList from the fetched data
      inMeetingList = data;

      // Render the updated list
      renderInMeeting();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  fetch(
    "https://opensheet.elk.sh/1cg3rOzKUCB3tG3p0TERC1KhXAzYX55Kydg-JWmO9LhI/waitingList"
  )
    .then((response) => response.json())
    .then((data) => {
      // Extract the waitingList from the fetched data
      waitingList = data;

      // Render the updated list
      renderQueue();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Render waiting list
function renderQueue() {
  queueSection.innerHTML = "";
  waitingList.forEach((person) => {
    const card = createCard(
      person.ticketNumber,
      person.position,
      "queue-card",
      person.addedTime
    );
    queueSection.appendChild(card);
  });
}

// Render in-meeting list
function renderInMeeting() {
  meetingSection.innerHTML = "";
  inMeetingList.forEach((person) => {
    const card = createCard(person.ticketNumber, null, "meeting-card");
    meetingSection.appendChild(card);
  });
}

// Function to update the current time and date
function updateTime() {
  const now = new Date();

  // Format the current date
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric"
  };
  const currentDate = now.toLocaleDateString("en-US", options);

  // Format the current time
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const currentTime = `${hours}:${minutes}:${seconds}`;

  // Update the page title element
  const pageTitle = document.getElementById("page-title");
  pageTitle.innerHTML = `${currentDate} -- ${currentTime}<br> Brad K - Virtual Appointments Waiting List`;
}

// Create card element
function createCard(ticketNumber, position, cardClass, addedTime) {
  const card = document.createElement("div");
  card.classList.add("card", cardClass);

  const ticketNumberElement = document.createElement("p");
  ticketNumberElement.textContent = `Ticket Number: ${ticketNumber}`;

  card.appendChild(ticketNumberElement);

  if (Number(position) === 1) {
    const next = document.createElement("p");
    next.textContent = "Up Next!";
    next.style.fontWeight = "bold"; // Add this line to make the text bold
    card.appendChild(next);

    card.classList.add("up-next"); // Add the 'up-next' class to the card
  }

  if (position !== null) {
    const positionElement = document.createElement("p");
    positionElement.textContent = `Position: ${position}`;
    card.appendChild(positionElement);
  }

  if (cardClass === "queue-card") {
    // Calculate the minutes elapsed
    const elapsedMinutes = Math.floor(
      (new Date() - Date.parse(addedTime)) / (1000 * 60)
    );

    // Display the elapsed minutes on the card
    const elapsedMinutesElement = document.createElement("p");
    elapsedMinutesElement.textContent = `Waiting: ${elapsedMinutes} mins`;
    card.appendChild(elapsedMinutesElement);
  }

  return card;
}

document.addEventListener("DOMContentLoaded", function() {
  // Your JavaScript code here
  // ...
  
  // Call the initial rendering functions
  renderQueue();
  renderInMeeting();

  // ...
});

// Initial update
updateTime();

// Update time every second
setInterval(updateTime, 1000);

// Fetch data immediately
fetchData();

// Polling interval in milliseconds (e.g., poll every 5 seconds)
const pollingInterval = 3000;

// Start polling
setInterval(fetchData, pollingInterval);

// Check-in Button

document.addEventListener("DOMContentLoaded", function () {
  // Get the check-in form and close button
  const checkinForm = document.getElementById("checkin-form");
  const closeButton = document.getElementById("close-button");

  // Function to show form
  function showCheckinForm() {
    const checkinFormPopup = document.getElementById("checkin-form-popup");
    const checkinFormOverlay = document.getElementById("checkin-form-overlay");
    checkinFormPopup.style.display = "block";
    checkinFormOverlay.style.display = "block";
  }

  // Function to hide form
  function hideCheckinForm() {
    const checkinFormPopup = document.getElementById("checkin-form-popup");
    const checkinFormOverlay = document.getElementById("checkin-form-overlay");
    checkinFormPopup.style.display = "none";
    checkinFormOverlay.style.display = "none";
  }

  // Event listener for close button
  closeButton.addEventListener("click", function () {
    hideCheckinForm(); // Hide the check-in form
  });

  // Event listener for check-in form submit
  checkinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get the student number value
    const studentNumber = document.getElementById("student-number").value;

    // Perform the check-in process (you can customize this part according to your needs)
    if (studentNumber) {
      console.log("Checking in student with number:", studentNumber);

      // Clear the student number field
      document.getElementById("student-number").value = "";

      // Hide the check-in form after submission
      hideCheckinForm(); // Hide the check-in form

      // Send the student number to the webhook
      sendStudentNumberToWebhook(studentNumber);
    }
  });

  // Function to send the student number to the webhook
  function sendStudentNumberToWebhook(studentNumber) {
    const webhookURL =
      "https://hook.eu1.make.com/wxhmb96glgblw7xwbrngp4usei7acdbv?number=" +
      studentNumber;

    // Make an AJAX request to the webhook URL
    fetch(webhookURL, {
      method: "POST"
      // Add any necessary headers or body payload to the request
      // For example, if the webhook requires a specific content type or data format
    })
      .then((response) => {
        // Handle the response from the webhook
        // For example, you can check the response status and display a success message
        if (response.ok) {
          console.log("Student number sent to webhook successfully.");
          displayConfirmationMessage("Check-in Successful");
          setTimeout(fetchData, 5000); // Wait for 5 seconds before calling fetchData()
        } else {
          console.error("Failed to send student number to webhook.");
          displayErrorMessage("Error Checking-in");
        }
      })
      .catch((error) => {
        console.error("Error sending student number to webhook:", error);
        displayErrorMessage("Error Checking-in");
      });
  }

  // Function to display a confirmation message with a green tick icon
  function displayConfirmationMessage(message) {
    const popupContainer = document.createElement("div");
    popupContainer.id = "message-popup-container";

    const popupContent = document.createElement("div");
    popupContent.id = "message-popup-content";

    const tickIcon = document.createElement("span");
    tickIcon.innerHTML = "&#10004;"; // HTML entity for a green tick

    const messageText = document.createElement("p");
    messageText.textContent = message;

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
      popupContainer.remove();
    });

    popupContent.appendChild(tickIcon);
    popupContent.appendChild(messageText);
    popupContent.appendChild(closeButton);
    popupContainer.appendChild(popupContent);
    document.body.appendChild(popupContainer);
  }

  // Function to display an error message with a red cross icon
  function displayErrorMessage(message) {
    const popupContainer = document.createElement("div");
    popupContainer.id = "message-popup-container";

    const popupContent = document.createElement("div");
    popupContent.id = "message-popup-content";

    const crossIcon = document.createElement("span");
    crossIcon.innerHTML = "&#10008;"; // HTML entity for a red cross

    const messageText = document.createElement("p");
    messageText.textContent = message;

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
      popupContainer.remove();
    });

    popupContent.appendChild(crossIcon);
    popupContent.appendChild(messageText);
    popupContent.appendChild(closeButton);
    popupContainer.appendChild(popupContent);
    document.body.appendChild(popupContainer);
  }

  // Check-in Button event listener
  const checkinButton = document.getElementById("checkin-button");
  checkinButton.addEventListener("click", function () {
    showCheckinForm(); // Show the check-in form
  });
});
