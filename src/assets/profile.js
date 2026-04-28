export const projects = [];

export const clusters = [
  {
    label: "Core Web",
    value: "HTML, CSS, JavaScript"
  },
  {
    label: "Frameworks + Runtime",
    value: "Vue, Node.js, Express.js, Flutter, PHP"
  },
  {
    label: "Data Layer",
    value: "MongoDB, MySQL"
  },
  {
    label: "Environment + DevOps",
    value: "WSL, Docker, Git"
  },
  {
    label: "AI Tooling",
    value: "LocalAI, Ollama"
  }
];

export const experiences = [
  {
    organization: "Cyber Command, Armed Forces of the Philippines (AFP)",
    program: "On-the-Job Training (OJT)",
    summary:
      "Contributed to internal cybersecurity and intelligence systems focused on document processing, automation, and open-source intelligence (OSINT).",
    contributions: [
      {
        project: "RAGAI Parser",
        detail:
          "Built parsing for scanned and original files (PDF, DOC, DOCX), using LanceDB for vector data and MongoDB for raw output data."
      },
      {
        project: "Uncover OSINT Tool",
        detail:
          "Built the username tracing and reverse image search features, and continue improving digital footprint analysis workflows and maintainability."
      }
    ]
  }
];
