# ⚖️ NyayaConnect

### Legal clarity. Human connection.

**NyayaConnect is an AI-powered legal information platform designed to make legal information easier to understand and help people take informed next steps when facing everyday legal problems.**

Understanding legal rights, documents, procedures, and available options can be difficult for people without a legal background. NyayaConnect explores how artificial intelligence and web technologies can simplify this initial process by explaining legal concerns in plain language, summarizing legal documents, organizing case information, and helping users explore relevant legal practice areas.

🌐 **Live Demo:** https://nyayaconnect-ytx7.onrender.com  
💻 **GitHub Repository:** https://github.com/sundramsinghrajawat19-ai/NyayaConnect

---

## 📌 Table of Contents

- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Features and Real-World Applications](#-features-and-real-world-applications)
- [How It Works](#-how-it-works)
- [Technology Stack](#️-technology-stack)
- [Project Architecture](#️-project-architecture)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Security and Privacy](#-security-and-privacy)
- [Current Limitations](#-current-limitations)
- [Future Scope](#-future-scope)
- [Disclaimer](#️-disclaimer)
- [Author](#-author)

---

## 🎯 The Problem

Legal information is often difficult for ordinary people to understand and act upon.

Common challenges include:

- **Complex legal language:** Legal documents and terminology can be confusing for people without legal training.
- **Uncertainty about next steps:** People may not know what information to collect, which documents to preserve, or what questions to ask a lawyer.
- **Time-consuming document review:** Reading lengthy notices, agreements, or other legal documents can be challenging.
- **Scattered case information:** Important details about a legal problem can become difficult to organize and revisit.
- **Finding the right legal expertise:** People may struggle to identify the practice area relevant to their particular situation.
- **Preparing for consultations:** People may need help organizing their concerns before speaking with a legal professional.

These challenges can delay informed decision-making and make access to legal information more intimidating.

## 💡 Our Solution

NyayaConnect brings several useful tools together in one web application.

Users can describe a legal concern, receive an AI-generated explanation, review suggested next steps, summarize supported legal documents, revisit saved case analyses, explore sample lawyer profiles, and submit a consultation request.

The goal is to make the initial process of understanding a legal problem more approachable—not to replace qualified legal professionals.

---

## ✨ Features and Real-World Applications

### 1. 🤖 AI-Powered Legal Case Analysis

**What it does**

Users describe their legal situation in ordinary language. The application sends the case description to Google's Gemini AI model and presents an AI-generated analysis intended to make the situation easier to understand.

Depending on the response, the analysis can help explain the issue, identify potential concerns, and outline possible next steps.

**Real-world applications**

- **Unpaid salary:** An employee can describe delayed or unpaid wages and identify documents that may be useful when seeking professional guidance.
- **Rental disputes:** A tenant can explain a disagreement about a security deposit, repairs, or a rental agreement.
- **Consumer complaints:** A customer can describe a defective product, disputed charge, or unresolved service complaint.
- **Family-related concerns:** A user can organize the basic facts of a family or matrimonial issue before consulting a qualified professional.
- **Property disputes:** A user can describe a disagreement involving a rental property or other property-related concern.

**User benefit:** Helps users organize their thoughts and prepare for a more informed conversation with a lawyer.

**Important:** AI-generated analysis may be incomplete or inaccurate. It is a starting point for understanding a situation, not a determination of legal rights or the outcome of a case.

### 2. 📄 AI-Powered Legal Document Summarization

**What it does**

Users can upload supported legal documents or images through the document summarization interface. The application sends the supported file content to the configured Gemini model and requests a structured summary.

The results are designed to highlight:

- **Document summary:** A plain-language overview of the document.
- **Key details:** Important information identified by the AI.
- **Questions for a lawyer:** Suggested questions that users may want to discuss during a professional consultation.

**Real-world applications**

- Understanding the general contents of a rental agreement.
- Reviewing the main points of a legal notice before consulting a lawyer.
- Identifying important details in a consumer-related document.
- Preparing questions about an agreement, notice, or other supported legal document.
- Getting an initial overview of a lengthy or unfamiliar document.

**User benefit:** Reduces the initial effort required to understand a document and helps users prepare for professional advice.

**Important:** Summarization does not verify authenticity, detect every legal risk, or replace a complete professional review. Supported file types and size limits depend on the application configuration.

### 3. 🔐 User Authentication

**What it does**

NyayaConnect provides account registration and login functionality. Passwords are hashed before storage, and authenticated sessions are used to control access to protected features.

**Real-world applications**

- Allowing users to access their own accounts.
- Separating individual users' case histories.
- Protecting access to case-analysis and consultation-request features.
- Maintaining a signed-in experience across protected pages.

**User benefit:** Establishes a foundation for personalized access rather than treating every visitor as the same user.

### 4. 🗂️ Case History and Saved Analyses

**What it does**

The application stores case analyses in MongoDB so authenticated users can revisit previously saved information through the case history feature.

**Real-world applications**

- Revisiting an earlier analysis without rewriting the entire case description.
- Keeping track of different legal concerns.
- Reviewing information before a consultation.
- Maintaining a more organized record of AI-assisted preparation.

**User benefit:** Makes it easier to return to previously recorded information instead of starting from scratch each time.

**Current scope:** Case history is a record of saved application data; it is not a legally validated case-management or court-filing system.

### 5. 👨‍⚖️ Lawyer Directory

**What it does**

The lawyer directory organizes sample profiles by broad legal practice areas, including:

- Property and Rental Matters
- Family and Matrimonial Matters
- Employment and Consumer Matters

**Real-world applications**

A person dealing with a rental dispute can begin exploring the property-related practice area. Someone facing an employment concern can use the employment-related category as a starting point for identifying the kind of professional expertise they may need.

**User benefit:** Demonstrates how a legal platform can guide people toward a relevant category of professional assistance.

**Current scope:** The displayed lawyer profiles are fictional demonstration profiles. They are not real or verified lawyers, and the directory does not currently establish real lawyer availability or professional credentials.

### 6. 📅 Consultation Request System

**What it does**

Users can submit a consultation request with details such as:

- Preferred legal practice area
- Preferred appointment date
- Preferred time
- Description of the legal issue

Requests are saved in MongoDB and associated with the authenticated user. Users can also view their previously submitted requests.

**Real-world applications**

- Expressing interest in discussing a rental or property concern.
- Recording a preferred time for a future legal consultation.
- Sharing a short description of a legal issue in advance.
- Keeping a record of submitted consultation requests.

**User benefit:** Demonstrates the foundation of a consultation-booking workflow and helps organize a user's request.

**Current scope:** This is a demonstration request system. It does not currently confirm appointments with real lawyers, verify lawyer availability, send a confirmed booking to a professional, or guarantee a consultation.

### 7. 🌐 Web-Based User Interface

**What it does**

The application provides browser-based pages for the homepage, account access, case analysis, document summarization, case history, and lawyer directory.

**Real-world applications**

A user can access the available tools through a single application instead of navigating separate interfaces for each feature.

**User benefit:** Brings AI-assisted legal information, document preparation, saved analyses, and consultation-request functionality into one experience.

---

## 🔄 How It Works

A typical user journey looks like this:

1. **Create an account:** Register and log in to access protected features.
2. **Describe a legal issue:** Enter the situation in everyday language.
3. **Review the AI response:** Read the generated explanation and suggested next steps.
4. **Summarize a document if needed:** Upload a supported document or image and review the generated summary.
5. **Revisit saved information:** Open the case history to access saved analyses.
6. **Explore legal practice areas:** Browse the sample lawyer directory to understand which area may be relevant.
7. **Submit a consultation request:** Enter a preferred date, time, practice area, and issue description.

This workflow is intended to support the initial stages of understanding and preparing for a legal consultation.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and content |
| CSS3 | Styling and user interface |
| JavaScript | Frontend interactions and API requests |
| Node.js | Server-side JavaScript runtime |
| Express.js | HTTP server and API routes |
| MongoDB Atlas | Persistent application data |
| Google Gemini API | AI-generated case analysis and document summaries |
| `@google/genai` | Gemini integration in the backend |
| `express-session` | Session-based authentication |
| `connect-mongo` | MongoDB-backed session storage |
| `bcryptjs` | Password hashing |
| `multer` | Handling uploaded files |
| dotenv | Environment-variable configuration |
| Render | Live application hosting |
| Git and GitHub | Version control and source-code hosting |

---

## 🏗️ Project Architecture

NyayaConnect follows a straightforward client-server architecture.

```text
                       USER
                         |
                         v
               HTML / CSS / JavaScript
                         |
                         v
                  Express.js Server
                    /     |      \
                   /      |       \
                  v       v        v
             MongoDB    Gemini    File Upload
              Atlas       API      Processing
                |
                v
        Users, Case Analyses,
        Sessions and Requests
```

### Main components

- **Frontend:** Displays the application pages and collects user input.
- **Backend:** Handles API requests, authentication, input validation, database operations, and AI requests.
- **Database:** Stores application records and session information.
- **AI service:** Generates responses for legal case analysis and document summarization.
- **File processing:** Accepts supported uploads for document summarization.

The backend is responsible for interacting with the AI service and database so that secret credentials do not need to be embedded in frontend JavaScript.

### Project structure

```text
NyayaConnect/
├── public/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── analyze.html
│   ├── lawyers.html
│   ├── history.html
│   └── script.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

The exact files may evolve as the project develops.

---

## 🚀 Getting Started

Follow these instructions to run NyayaConnect locally.

### Prerequisites

Install or arrange access to:

- [Node.js](https://nodejs.org/)
- npm, included with Node.js
- A [MongoDB Atlas](https://www.mongodb.com/atlas) database
- A Google Gemini API key through [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the repository

```bash
git clone https://github.com/sundramsinghrajawat19-ai/NyayaConnect.git
cd NyayaConnect
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
SESSION_SECRET=your_long_random_secret
```

Replace each placeholder with the appropriate value for your environment.

- `PORT`: Local server port.
- `MONGODB_URI`: MongoDB Atlas connection string.
- `GEMINI_API_KEY`: API key used by the backend for Gemini requests.
- `SESSION_SECRET`: A long, random secret used to sign session cookies.

Use the environment-variable names expected by your current `server.js`. If your local configuration uses a different Gemini key name, keep the backend and `.env` consistent.

**Never commit `.env` or expose real API keys, database credentials, or session secrets in public code.**

### 4. Start the application

```bash
node server.js
```

Open the following address in your browser:

http://localhost:3000

### 5. Production deployment

The public demonstration is hosted on Render:

https://nyayaconnect-ytx7.onrender.com

A deployed instance requires its own environment variables, working database connectivity, and valid AI service credentials. Free hosting services may also experience cold starts or slower responses.

---

## 🔐 Security and Privacy

Security is especially important when an application handles legal concerns and potentially sensitive documents.

NyayaConnect incorporates foundational security practices:

- Password hashing using `bcryptjs`.
- Session-based authentication.
- MongoDB-backed session storage.
- Protected API routes for authenticated functionality.
- Server-side validation for consultation request fields.
- Environment variables for secrets and service credentials.
- A `.gitignore` to help prevent accidental commits of sensitive configuration.

### Important production considerations

A production-ready legal platform would require additional security and privacy work, including:

- Thorough authorization testing for every API and database operation.
- HTTPS enforcement and secure session-cookie configuration.
- File-type validation, upload-size limits, and malware scanning where appropriate.
- Rate limiting and protection against automated abuse.
- A clear data-retention and deletion policy.
- Appropriate privacy disclosures and consent for sending information to third-party AI services.
- Security testing, monitoring, backups, and incident-response procedures.

These considerations should be assessed before using the platform with real clients or confidential legal documents.

---

## ⚠️ Current Limitations

NyayaConnect is a working demonstration and learning project. Its current scope includes:

- AI-generated information is not guaranteed to be legally correct or complete.
- The lawyer directory contains fictional sample profiles.
- Consultation requests are stored as demo requests and are not confirmed appointments.
- Lawyer credentials, availability, pricing, and professional relationships are not verified.
- AI responses may not fully account for jurisdiction-specific laws, current amendments, or all facts of a case.
- Document summaries may omit important clauses, dates, exceptions, or risks.
- The application is not a substitute for a complete legal document review or professional legal advice.

The project demonstrates a foundation for a legal-information workflow rather than a fully operational legal-services marketplace.

---

## 🔮 Future Scope

Potential future enhancements include:

- **Verified lawyer onboarding:** Allow qualified legal professionals to create profiles and verify their credentials.
- **Real appointment booking:** Integrate lawyer calendars, availability checks, booking confirmations, and cancellation workflows.
- **Practice-area matching:** Match users with verified professionals based on the specific legal issue rather than broad categories alone.
- **Jurisdiction-aware guidance:** Improve responses using relevant, up-to-date legal sources for the applicable jurisdiction.
- **Source-backed AI responses:** Provide citations and links to authoritative legal provisions and explain uncertainty.
- **Secure document management:** Add stronger access controls, retention policies, and document deletion.
- **Consultation preparation:** Generate structured summaries and questions users can take to a lawyer.
- **Notifications:** Send appropriate status updates for real consultation requests and confirmed bookings.
- **Accessibility and localization:** Improve accessibility and support additional Indian languages.
- **Testing and monitoring:** Add automated tests, API validation, logging, and reliability monitoring.

These are potential improvements, not claims that the features are already implemented.

---

## ⚖️ Disclaimer

NyayaConnect is an educational and demonstration project intended to improve the accessibility of legal information.

It does not provide a lawyer-client relationship, guarantee legal accuracy, or replace advice from a qualified legal professional. AI-generated content should be independently checked before being used to make legal decisions.

The displayed lawyer profiles are fictional examples. Consultation requests submitted through the demo are not confirmed bookings with real lawyers.

**Do not upload confidential, privileged, or highly sensitive legal documents to the public demonstration.** Consider the privacy implications of transmitting information to third-party AI services.

---

## 👨‍💻 Author

### Sundaram Singh

B.Tech — Computer Science and Engineering  
Amity University, Gwalior, Madhya Pradesh, India

GitHub: [@sundramsinghrajawat19-ai](https://github.com/sundramsinghrajawat19-ai)

---

## ⭐ Project Overview

NyayaConnect combines full-stack web development, database integration, session-based authentication, file handling, and generative AI to explore a practical problem: making the first steps of understanding a legal concern less confusing.

The project demonstrates the development of an integrated web application from frontend interfaces to backend APIs, persistent storage, and external AI integration.

If you find this project interesting, feel free to explore the repository and follow its future development.

---

*Built with a focus on accessible legal information, practical problem-solving, and responsible AI integration.*
