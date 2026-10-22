
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
    name: "Demo Lawyer A",
    category: "employment",
    specialty: "Unpaid Salary and Wage Disputes",
    experience: "8 years (illustrative)",
    fee: "₹800 (sample fee)",
    keywords: ["salary", "wage", "unpaid", "pay", "payment"]
  },
  {
    name: "Demo Lawyer B",
    category: "employment",
    specialty: "Workplace and Termination Disputes",
    experience: "10 years (illustrative)",
    fee: "₹1,000 (sample fee)",
    keywords: ["termination", "fired", "dismissed", "workplace", "harassment"]
  },
  {
    name: "Demo Lawyer C",
    category: "property",
    specialty: "Rental Deposits and Tenant Disputes",
    experience: "8 years (illustrative)",
    fee: "₹800 (sample fee)",
    keywords: ["rent", "rental", "tenant", "landlord", "deposit", "eviction"]
  },
  {
    name: "Demo Lawyer D",
    category: "property",
    specialty: "Property Ownership and Title Disputes",
    experience: "9 years (illustrative)",
    fee: "₹1,000 (sample fee)",
    keywords: ["ownership", "title", "land", "property", "boundary"]
  },
  {
    name: "Demo Lawyer E",
    category: "consumer",
    specialty: "Refunds and Defective Products",
    experience: "7 years (illustrative)",
    fee: "₹750 (sample fee)",
    keywords: ["refund", "defective", "consumer", "product", "seller"]
  },
  {
    name: "Demo Lawyer F",
    category: "business",
    specialty: "Contracts and Unpaid Invoices",
    experience: "8 years (illustrative)",
    fee: "₹1,000 (sample fee)",
    keywords: ["contract", "invoice", "commercial", "business", "agreement"]
  },
  {
    name: "Demo Lawyer G",
    category: "family",
    specialty: "Divorce and Matrimonial Matters",
    experience: "10 years (illustrative)",
    fee: "₹1,000 (sample fee)",
    keywords: ["divorce", "marriage", "matrimonial", "spouse"]
  },
  {
    name: "Demo Lawyer H",
    category: "criminal",
    specialty: "Criminal Complaints and Defence",
    experience: "9 years (illustrative)",
    fee: "₹1,200 (sample fee)",
    keywords: ["police", "arrest", "criminal", "fir", "theft", "assault"]
  }
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
  item.textContent = law;
  relevantLaws.appendChild(item);
});

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