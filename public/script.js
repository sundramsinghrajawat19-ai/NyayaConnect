
const form = document.getElementById("case-form");

if (form) {
  const results = document.getElementById("results");
  const problemInput = document.getElementById("problem");
  const categoryInput = document.getElementById("category");
  const locationInput = document.getElementById("location");

  const explanation = document.getElementById("explanation");
  const nextSteps = document.getElementById("next-steps");
  const lawyerList = document.getElementById("lawyer-list");
  const resetButton = document.getElementById("reset-button");
  const status = document.getElementById("status");

  const lawyers = [
    { name: "Demo Lawyer A", category: "property", specialty: "Property and tenancy disputes", experience: "8 years (illustrative)", fee: "₹800 (sample fee)" },
    { name: "Demo Lawyer B", category: "family", specialty: "Family and matrimonial matters", experience: "10 years (illustrative)", fee: "₹1,000 (sample fee)" },
    { name: "Demo Lawyer C", category: "employment", specialty: "Employment and wage disputes", experience: "6 years (illustrative)", fee: "₹700 (sample fee)" },
    { name: "Demo Lawyer D", category: "consumer", specialty: "Consumer complaints and disputes", experience: "7 years (illustrative)", fee: "₹750 (sample fee)" },
    { name: "Demo Lawyer E", category: "criminal", specialty: "Criminal law", experience: "9 years (illustrative)", fee: "₹1,200 (sample fee)" },
    { name: "Demo Lawyer F", category: "business", specialty: "Contracts and business disputes", experience: "8 years (illustrative)", fee: "₹1,000 (sample fee)" }
  ];

  function identifyCategory(text) {
    const value = text.toLowerCase();

    if (/salary|wage|employer|employment|workplace|termination/.test(value)) return "employment";
    if (/landlord|tenant|rent|rental|security deposit|property|eviction/.test(value)) return "property";
    if (/divorce|custody|matrimonial|marriage|maintenance|family dispute/.test(value)) return "family";
    if (/consumer|refund|defective product|seller|service complaint/.test(value)) return "consumer";
    if (/police|arrest|criminal|\bfir\b|theft|assault/.test(value)) return "criminal";
    if (/contract|business|invoice|commercial|breach of agreement/.test(value)) return "business";

    return "general";
  }

  function createLawyerCard(lawyer) {
    const card = document.createElement("article");
    card.className = "lawyer-card";

    const name = document.createElement("h3");
    name.textContent = lawyer.name;

    const specialty = document.createElement("p");
    specialty.textContent = lawyer.specialty;

    const experience = document.createElement("p");
    experience.textContent = `Experience: ${lawyer.experience}`;

    const fee = document.createElement("p");
    fee.textContent = lawyer.fee;

    const note = document.createElement("p");
    note.className = "field-hint";
    note.textContent = "Fictional demonstration profile — not bookable.";

    card.append(name, specialty, experience, fee, note);
    return card;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const description = problemInput.value.trim();

    if (description.length < 15) {
      problemInput.focus();
      return;
    }

    const category = categoryInput && categoryInput.value !== "auto"
      ? categoryInput.value
      : identifyCategory(description);

    results.hidden = false;
    explanation.textContent = "Analyzing your description...";
    nextSteps.replaceChildren();

    if (lawyerList) lawyerList.replaceChildren();
    if (status) status.textContent = "Please wait while Gemini analyzes your description.";

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem: description })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to process your request.");
      }

      explanation.textContent = data.explanation;

      data.nextSteps.forEach(function (step) {
        const item = document.createElement("li");
        item.textContent = step;
        nextSteps.appendChild(item);
      });

      // Show lawyer matches only on pages that contain the lawyer list.
      if (lawyerList) {
        const matches = lawyers.filter(function (lawyer) {
  return lawyer.category === category;
});

if (matches.length) {
  matches.forEach(function (lawyer) {
    lawyerList.appendChild(createLawyerCard(lawyer));
  });
} else {
  const message = document.createElement("p");
  message.className = "field-hint";
  message.textContent =
    "We couldn't find a matching sample profile for this issue. " +
    "Try describing your problem in more detail or explore the full lawyer directory.";

  lawyerList.appendChild(message);
}
      }

      if (status) status.textContent = "Analysis complete. This is general information, not legal advice.";

      results.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      explanation.textContent = error.message;
      nextSteps.replaceChildren();

      const item = document.createElement("li");
      item.textContent = "Check your connection and make sure the NyayaConnect server is running, then try again.";
      nextSteps.appendChild(item);

      if (status) status.textContent = "Analysis failed.";
    }
  });

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      form.reset();
      results.hidden = true;
      if (status) status.textContent = "";
      problemInput.focus();

      const analyzer = document.getElementById("analyzer");
      if (analyzer) analyzer.scrollIntoView({ behavior: "smooth" });
    });
  }
}
