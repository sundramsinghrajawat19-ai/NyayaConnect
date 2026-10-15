
const form = document.getElementById("case-form");
const results = document.getElementById("results");
const problemInput = document.getElementById("problem");
const categoryInput = document.getElementById("category");
const locationInput = document.getElementById("location");

const explanation = document.getElementById("explanation");
const nextSteps = document.getElementById("next-steps");
const lawyerList = document.getElementById("lawyer-list");
const resetButton = document.getElementById("reset-button");

// DEMO DATA ONLY: these are fictional profiles, not real lawyers.
const lawyers = [
  {
    name: "Demo Lawyer A",
    category: "property",
    specialty: "Property and tenancy disputes",
    experience: "8 years (illustrative)",
    fee: "₹800 (sample consultation fee)"
  },
  {
    name: "Demo Lawyer B",
    category: "family",
    specialty: "Family and matrimonial matters",
    experience: "10 years (illustrative)",
    fee: "₹1,000 (sample consultation fee)"
  },
  {
    name: "Demo Lawyer C",
    category: "employment",
    specialty: "Employment and wage disputes",
    experience: "6 years (illustrative)",
    fee: "₹700 (sample consultation fee)"
  },
  {
    name: "Demo Lawyer D",
    category: "consumer",
    specialty: "Consumer complaints and disputes",
    experience: "7 years (illustrative)",
    fee: "₹750 (sample consultation fee)"
  },
  {
    name: "Demo Lawyer E",
    category: "criminal",
    specialty: "Criminal law",
    experience: "9 years (illustrative)",
    fee: "₹1,200 (sample consultation fee)"
  },
  {
    name: "Demo Lawyer F",
    category: "business",
    specialty: "Contracts and business disputes",
    experience: "8 years (illustrative)",
    fee: "₹1,000 (sample consultation fee)"
  }
];

const guidance = {
  property: {
    title: "Possible property or tenancy issue",
    explanation:
      "Your description may involve a property, rental agreement, " +
      "security deposit or tenancy dispute. The relevant rights and " +
      "procedures depend on the agreement, facts and applicable local law.",
    steps: [
      "Keep your rental agreement, receipts and relevant correspondence.",
      "Make a dated record of important events and payments.",
      "Ask a qualified lawyer about the rules and options that apply to your situation."
    ]
  },
  family: {
    title: "Possible family law issue",
    explanation:
      "Your description may involve a family or matrimonial matter. " +
      "The applicable legal process depends on the specific issue, " +
      "the facts and the laws that govern your circumstances.",
    steps: [
      "Organize relevant documents and a timeline of events.",
      "Avoid sharing sensitive family information publicly.",
      "Consult a qualified lawyer about your options and any urgent concerns."
    ]
  },
  employment: {
    title: "Possible employment or wage issue",
    explanation:
      "Your description may involve employment terms, unpaid wages or " +
      "another workplace dispute. The appropriate route depends on " +
      "your employment arrangement and the applicable law.",
    steps: [
      "Keep employment documents, payslips and payment records.",
      "Save relevant written communications.",
      "Ask a qualified lawyer which procedures and deadlines may apply."
    ]
  },
  consumer: {
    title: "Possible consumer dispute",
    explanation:
      "Your description may involve a product, service, payment or " +
      "consumer complaint. The available options depend on the transaction, " +
      "supporting records and applicable consumer law.",
    steps: [
      "Keep invoices, receipts, order details and complaint numbers.",
      "Save messages exchanged with the seller or service provider.",
      "Ask a qualified lawyer or appropriate consumer support service about next steps."
    ]
  },
  criminal: {
    title: "Possible criminal law issue",
    explanation:
      "Your description may involve a criminal law concern. The appropriate " +
      "response depends on the facts and urgency. This preliminary tool " +
      "cannot determine criminal liability or replace legal advice.",
    steps: [
      "If someone is in immediate danger, contact local emergency services.",
      "Preserve relevant records without altering or circulating evidence.",
      "Seek advice from a qualified criminal lawyer promptly, especially if there is an urgent police or court matter."
    ]
  },
  business: {
    title: "Possible contract or business dispute",
    explanation:
      "Your description may involve a contract, payment obligation or " +
      "business disagreement. The terms, communications and applicable " +
      "law will affect how the issue should be assessed.",
    steps: [
      "Keep the signed agreement, invoices and payment records.",
      "Create a timeline of commitments and communications.",
      "Ask a qualified lawyer to review the agreement and relevant deadlines."
    ]
  },
  general: {
    title: "Let's clarify your legal concern",
    explanation:
      "Your description needs further review before a reliable legal " +
      "category can be suggested. A short consultation with a qualified " +
      "lawyer can help identify the relevant issues.",
    steps: [
      "Write down the important events in chronological order.",
      "Collect relevant documents and correspondence.",
      "Choose a lawyer whose verified experience fits your specific issue."
    ]
  }
};

function identifyCategory(text) {
  const value = text.toLowerCase();

  if (/salary|wage|employer|employment|workplace|termination/.test(value)) {
    return "employment";
  }

  if (/landlord|tenant|rent|rental|security deposit|property|eviction/.test(value)) {
    return "property";
  }

  if (/divorce|custody|matrimonial|marriage|maintenance|family dispute/.test(value)) {
    return "family";
  }

  if (/consumer|refund|defective product|seller|service complaint/.test(value)) {
    return "consumer";
  }

  if (/police|arrest|criminal|fir\b|theft|assault/.test(value)) {
    return "criminal";
  }

  if (/contract|business|invoice|commercial|breach of agreement/.test(value)) {
    return "business";
  }

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
  fee.className = "fee";
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

  const selected = categoryInput.value;
  const category = selected === "auto"
    ? identifyCategory(description)
    : selected;

  const result = guidance[category] || guidance.general;

  // Show a temporary loading message
  results.hidden = false;
  explanation.textContent = "Analyzing your description...";
  nextSteps.replaceChildren();
  lawyerList.replaceChildren();

  try {
    // Send the problem to our Express backend
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ problem: description })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to process your request.");
    }

    // Display the explanation returned by the backend
    explanation.textContent = data.explanation;

    // Display the returned checklist
    data.nextSteps.forEach(function (step) {
      const item = document.createElement("li");
      item.textContent = step;
      nextSteps.appendChild(item);
    });

    // Keep the existing demo lawyer-matching feature
    const matches = lawyers.filter(function (lawyer) {
      return lawyer.category === category;
    });

    (matches.length ? matches : lawyers).forEach(function (lawyer) {
      lawyerList.appendChild(createLawyerCard(lawyer));
    });

    results.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  } catch (error) {
    explanation.textContent = error.message;
    nextSteps.replaceChildren();

    const item = document.createElement("li");
    item.textContent =
      "Check that the NyayaConnect server is running, then try again.";
    nextSteps.appendChild(item);
  }
});


resetButton.addEventListener("click", function () {
  form.reset();
  results.hidden = true;
  problemInput.focus();
  document.getElementById("analyzer").scrollIntoView({
    behavior: "smooth"
  });
});
