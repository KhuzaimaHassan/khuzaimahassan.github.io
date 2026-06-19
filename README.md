<![CDATA[<div align="center">

# 🌐 khuzaimahassan.github.io

**Personal Portfolio — AI / ML Engineer**

[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-2ea44f?logo=github)](https://khuzaimahassan.github.io)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3 / SASS](https://img.shields.io/badge/CSS3%20%2F%20SASS-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-528DD7?logo=fontawesome&logoColor=white)](https://fontawesome.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📌 Problem

Building a strong online presence as an AI / ML professional requires more than a résumé — it demands a living, interactive showcase of projects, skills, certifications, and services. Generic portfolio templates rarely convey the depth of technical work in data engineering, deep learning, and agentic AI systems. This portfolio solves that gap by providing a fast, fully static website that is easy to maintain, costs nothing to host, and is tailored to highlight the breadth and depth of my work.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Markup** | HTML5 |
| **Styling** | CSS3 / SASS |
| **Scripting** | Vanilla JavaScript |
| **Icons** | Font Awesome |
| **Hosting** | GitHub Pages |

---

## 🏗️ Architecture

The site follows a clean, static front-end architecture — no build tools, no frameworks, just fast-loading pages served directly from GitHub Pages.

```mermaid
graph LR
    subgraph "GitHub Repository"
        A["HTML Pages"] --> B["CSS / SASS Stylesheets"]
        A --> C["Vanilla JavaScript"]
        A --> D["Font Awesome CDN"]
    end

    subgraph "GitHub Pages"
        E["Static Hosting & CDN"]
    end

    A -- "git push" --> E
    E -- "https://khuzaimahassan.github.io" --> F["Visitor's Browser"]

    style A fill:#E34F26,color:#fff
    style B fill:#CC6699,color:#fff
    style C fill:#F7DF1E,color:#000
    style D fill:#528DD7,color:#fff
    style E fill:#2ea44f,color:#fff
    style F fill:#0d1117,color:#fff
```

**Page Map**

```
/
├── index.html          # Home — hero, intro, call-to-action
├── about.html          # About — background, education (NED University)
├── projects.html       # Projects — featured AI/ML case studies
├── resume.html         # Resume — experience & skills overview
├── certifications.html # Certifications — verified credentials
└── contact.html        # Contact — form / social links
```

---

## 🔗 Demo

👉 **Live Site:** [https://khuzaimahassan.github.io](https://khuzaimahassan.github.io)

---

## ✨ Features

### 🗂️ Pages

| Page | Highlights |
|---|---|
| **Home** | Hero section, quick bio, call-to-action buttons |
| **About** | Education (NED University), career summary |
| **Projects** | Filterable project cards with descriptions & links |
| **Resume** | Downloadable résumé, skills chart |
| **Certifications** | Verified badges and credential links |
| **Contact** | Contact form and social media links |

### 🚀 Featured Projects

| Project | Domain |
|---|---|
| **AQI Predictor** | Environmental ML — air quality index forecasting |
| **AI Academic Mentor** | Agentic AI — intelligent tutoring system |
| **Fraud Detection** | Financial ML — anomaly & fraud classification |
| **Data Warehousing** | Data Engineering — ETL pipeline & warehouse design |

### 💼 Services Showcased

- **Data Engineering & ETL** — scalable pipelines, warehouse design, data integration
- **Deep Learning & Forecasting** — time-series models, CNNs, transformers
- **Agentic AI & LLM Systems** — autonomous agents, RAG pipelines, prompt engineering
- **MLOps & Deployment** — CI/CD for ML, containerisation, model monitoring

---

## 🚀 Getting Started

### Prerequisites

Any modern web browser — no build step required.

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/khuzaimahassan/khuzaimahassan.github.io.git

# 2. Enter the project directory
cd khuzaimahassan.github.io

# 3. Open in your browser (pick one)
#    macOS
open index.html
#    Linux
xdg-open index.html
#    Windows
start index.html
```

> For live-reload during development you can use any static server:
>
> ```bash
> # Using Python
> python -m http.server 8000
>
> # Using Node (npx)
> npx serve .
> ```

### Deployment

Push to the `main` branch — GitHub Pages will automatically build and deploy.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository
2. **Create** a feature branch — `git checkout -b feature/awesome-improvement`
3. **Commit** your changes — `git commit -m "Add awesome improvement"`
4. **Push** to the branch — `git push origin feature/awesome-improvement`
5. **Open** a Pull Request

Please open an issue first to discuss major changes.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [Khuzaima Hassan](https://github.com/khuzaimahassan)**

AI / ML Engineer · NED University

</div>
]]>
