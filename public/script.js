
const form = document.getElementById("case-form");

if (form) {
  const results = document.getElementById("results");
  const problemInput = document.getElementById("problem");
  const categoryInput = document.getElementById("category");
  const locationInput = document.getElementById("location");

  const explanation = document.getElementById("explanation");
const risks = document.getElementById("risks");
const nextSteps = document.getElementById("next-steps");
const evidenceChecklist = document.getElementById("evidence-checklist");
const relevantLaws = document.getElementById("relevant-laws");
  const lawyerList = document.getElementById("lawyer-list");
  const resetButton = document.getElementById("reset-button");
  const status = document.getElementById("status");

  const lawyers = [
  {
    name: "Romesh Pratap Singh",
    category: "general",
    specialty: "Practice areas need confirmation",
    location: "Gwalior, Madhya Pradesh",
    enrollmentNumber: "2410/2011 (listed in 2020 panel list)",
    experience: "",
    fee: "",
    keywords: [],
    isDemo: false
  },
  {
    name: "Himanshu Sharma",
    category: "general",
    specialty: "Practice areas need confirmation",
    location: "Gwalior, Madhya Pradesh",
    enrollmentNumber: "852/2011 (listed in 2020 panel list)",
    experience: "",
    fee: "",
    keywords: [],
    isDemo: false
  },
  {
    name: "Nitin Sharma",
    category: "general",
    specialty: "Practice areas need confirmation",
    location: "Gwalior, Madhya Pradesh",
    enrollmentNumber: "2118/2011 (listed in 2020 panel list)",
    experience: "",
    fee: "",
    keywords: [],
    isDemo: false
  }
];
  
function identifyCategory(text) {
  const value = text.toLowerCase();

  const rules = [
    ["employment", /\bsalary\b|\bunpaid wages?\b|\bemployer\b|\bworkplace\b|\btermination\b|\bwrongful dismissal\b|\bgratuity\b|\bpf\b/],
    ["property", /\blandlord\b|\btenant\b|\brent\b|\beviction\b|\bland dispute\b|\bproperty\b|\bpossession\b|\bbuilder\b/],
    ["family", /\bdivorce\b|\bcustody\b|\bmaintenance\b|\balimony\b|\bdomestic violence\b|\bmatrimonial\b|\bmarriage\b/],
    ["consumer", /\bconsumer\b|\brefund\b|\bdefective product\b|\bservice complaint\b|\bconsumer forum\b|\be-commerce\b/],
    ["criminal", /\bpolice\b|\barrest\b|\bcriminal\b|\bfir\b|\btheft\b|\bassault\b|\bbail\b|\bcheating\b|\bfraud\b/],
    ["business", /\bcontract\b|\binvoice\b|\bcommercial\b|\bbreach of agreement\b|\bbusiness dispute\b|\bpayment default\b/]
  ];

  for (const [category, pattern] of rules) {
    if (pattern.test(value)) return category;
  }

  return "general";
}


  function createLawyerCard(lawyer) {
  const card = document.createElement("article");
  card.className = "lawyer-card";

  const addText = function (label, value) {
    if (!value) return;

    const item = document.createElement("p");
    item.textContent = label ? `${label}: ${value}` : value;
    card.appendChild(item);
  };

  const name = document.createElement("h3");
  name.textContent = lawyer.name;
  card.appendChild(name);

  addText("", lawyer.specialty);
  addText("Location", lawyer.location);
  addText("Experience", lawyer.experience);
  addText("Consultation fee", lawyer.fee);
  addText("Enrollment number", lawyer.enrollmentNumber);
  addText("Public contact", lawyer.phone);

  const note = document.createElement("p");
  note.className = "field-hint";

  note.textContent = lawyer.isDemo
    ? "Fictional demonstration profile — not bookable."
    : "Verification pending — confirm credentials and availability before hiring.";

  card.appendChild(note);
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
    if (lawyerList) {
  const message = document.createElement("p");
  message.className = "field-hint";

  const categoryNames = {
    employment: "employment law",
    property: "property law",
    family: "family law",
    consumer: "consumer law",
    criminal: "criminal law",
    business: "business law",
    general: "general legal issues"
  };

  message.textContent =
    "Your issue appears related to " +
    (categoryNames[category] || "general legal issues") +
    ". We currently have no verified specialty or keyword data to rank these lawyer profiles accurately. Please confirm each lawyer's qualifications and practice area before hiring.";

  lawyerList.appendChild(message);

  lawyers.forEach(function (lawyer) {
    lawyerList.appendChild(createLawyerCard(lawyer));
  });
}
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
      risks.replaceChildren();
data.risks.forEach(function (risk) {
  const item = document.createElement("li");
  item.textContent = risk;
  risks.appendChild(item);
});

evidenceChecklist.replaceChildren();
data.evidenceChecklist.forEach(function (evidence) {
  const item = document.createElement("li");
  item.textContent = evidence;
  evidenceChecklist.appendChild(item);
});


relevantLaws.replaceChildren();

data.relevantLaws.forEach(function (law) {
  const item = document.createElement("li");

  const title = document.createElement("strong");
  title.textContent = law.actName || "Legal reference needs verification";
  item.appendChild(title);

  const section = document.createElement("p");
  section.textContent = "Section: " + (law.section || "Needs verification");
  item.appendChild(section);

  const details = document.createElement("p");
  details.textContent = law.explanation || "Check with a qualified lawyer.";
  item.appendChild(details);

  const status = document.createElement("p");
  status.textContent = "Status: Needs verification";
  item.appendChild(status);

  
let sourceUrl = "";

if (law.officialSourceUrl) {
  try {
    const url = new URL(law.officialSourceUrl);

    const trustedDomains = [
      "indiacode.gov.in",
      "www.indiacode.gov.in",
      "indiacode.nic.in",
      "www.indiacode.nic.in",
      "egazette.nic.in",
      "www.egazette.nic.in",
      "egazette.gov.in",
      "www.egazette.gov.in",
      "sci.gov.in",
      "www.sci.gov.in"
    ];

    if (
      url.protocol === "https:" &&
      trustedDomains.includes(url.hostname)
    ) {
      sourceUrl = url.href;
    }
  } catch {
    // Fall back to the official legislation portal.
  }
}

const link = document.createElement("a");
link.href = sourceUrl || "https://www.indiacode.nic.in/";
link.target = "_blank";
link.rel = "noopener noreferrer";
link.textContent = sourceUrl
  ? "Open official source"
  : "Search India Code (official legislation portal)";
item.appendChild(link);


  relevantLaws.appendChild(item);
});


      data.nextSteps.forEach(function (step) {
        const item = document.createElement("li");
        item.textContent = step;
        nextSteps.appendChild(item);
      });

      
      

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



const documentForm = document.getElementById("document-form");

if (documentForm) {
  const fileInput = document.getElementById("legal-document");
  const documentResults = document.getElementById("document-results");
  const documentSummary = document.getElementById("document-summary");
  const documentDetails = document.getElementById("document-details");
  const documentQuestions = document.getElementById("document-questions");
  const status = document.getElementById("status");
  const submitButton = documentForm.querySelector('button[type="submit"]');

  let lastFile = null;
  let isProcessing = false;
  let retryButton = null;

  function getRetryButton() {
    if (!retryButton) {
      retryButton = document.createElement("button");
      retryButton.type = "button";
      retryButton.id = "retry-document";
      retryButton.textContent = "Retry summarization";
      retryButton.hidden = true;
      retryButton.style.marginTop = "10px";

      documentForm.appendChild(retryButton);

      retryButton.addEventListener("click", function () {
        if (lastFile && !isProcessing) {
          summarizeDocument(lastFile);
        }
      });
    }

    return retryButton;
  }

  async function summarizeDocument(file) {
    if (isProcessing) return;

    isProcessing = true;

    const formData = new FormData();
    formData.append("document", file);

    documentResults.hidden = true;
    documentSummary.textContent = "";
    documentDetails.replaceChildren();
    documentQuestions.replaceChildren();

    const retry = getRetryButton();
    retry.hidden = true;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Summarizing...";
    }

    if (status) {
      status.textContent =
        "Uploading your document... Please wait.";
    }

    const controller = new AbortController();
    let seconds = 0;

    const progressTimer = setInterval(function () {
      seconds += 5;

      if (status) {
        status.textContent =
          `Analyzing your document... ${seconds} seconds elapsed.`;
      }
    }, 5000);

    const timeoutTimer = setTimeout(function () {
      controller.abort();
    }, 90000);

    try {
      const response = await fetch("/api/summarize-document", {
        method: "POST",
        body: formData,
        credentials: "same-origin",
        signal: controller.signal
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("The server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(
          data.error || `Summarization failed (HTTP ${response.status}).`
        );
      }

      if (
        typeof data.summary !== "string" ||
        !Array.isArray(data.keyDetails) ||
        !Array.isArray(data.questionsForLawyer)
      ) {
        throw new Error("The server returned an invalid summary.");
      }

      documentSummary.textContent = data.summary;

      data.keyDetails.forEach(function (detail) {
        const item = document.createElement("li");
        item.textContent = detail;
        documentDetails.appendChild(item);
      });

      data.questionsForLawyer.forEach(function (question) {
        const item = document.createElement("li");
        item.textContent = question;
        documentQuestions.appendChild(item);
      });

      documentResults.hidden = false;
      retry.hidden = true;

      if (status) {
        status.textContent =
          "Summary complete! Verify important details against the original document.";
      }

      documentResults.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } catch (error) {
      if (status) {
        if (error.name === "AbortError") {
          status.textContent =
            "This request took longer than 90 seconds. Gemini may be busy. Please retry.";
        } else if (!navigator.onLine) {
          status.textContent =
            "No internet connection. Reconnect and try again.";
        } else {
          status.textContent =
            error.message || "Something went wrong. Please try again.";
        }
      }

      retry.hidden = false;
    } finally {
      clearInterval(progressTimer);
      clearTimeout(timeoutTimer);

      isProcessing = false;

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Summarize document →";
      }
    }
  }

  documentForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (isProcessing) return;

    const file = fileInput.files[0];

    if (!file) {
      if (status) status.textContent = "Please select a document.";
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
      if (status) {
        status.textContent = "Choose a PDF, JPG, PNG, or WebP file.";
      }
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      if (status) {
        status.textContent = "The file must be 10 MB or smaller.";
      }
      return;
    }

    lastFile = file;
    await summarizeDocument(file);
  });
}