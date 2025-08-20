# **App Name**: ContractCheck

## Core Features:

- Contract Upload: Enable users to upload contract documents in PDF format or paste contract text directly into the app.
- Contract Summary: Use AI to generate a concise summary of the contract, highlighting key terms and obligations. Uses reasoning to choose the right key terms.
- Risk Clause Identification: Identify potentially risky clauses within the contract using AI, providing clear explanations of why these clauses are flagged as risky. Uses reasoning and multiple tools to generate the list of potentially risky clauses.
- Risk Highlighting: Visually highlight risky clauses within the contract text in red to draw the user's attention to potential issues.
- Risk Scoring: Provide an overall risk score (1-10) for the contract based on the AI analysis, displayed with a colored circle (green/yellow/red) to indicate the level of risk.
- Practical Tips: Offer practical advice and recommendations based on the AI analysis to help users better understand and mitigate potential risks.
- Analysis History (Local Storage): Store the history of contract analyses in local storage to enable users to easily view and track previous reviews. This feature will not be connected to a remote database, in accordance with the project prompt. It will maintain the users analysis locally until the users storage is cleared.

## Style Guidelines:

- Primary color: Desaturated blue (#5C80BC) to provide a professional and trustworthy feel. This is slightly darker than our background color.
- Background color: Light desaturated blue (#DDE5ED) to give a clean and modern look. It should make for a calm user experience and allow key elements to stand out.
- Accent color: Red (#E63946) to highlight potentially risky clauses, effectively drawing user's attention to sections of the document needing the most scrutiny.
- Font: 'Inter' (sans-serif) for both headlines and body text. Its modern, machined, neutral look fits a professional tone, is suitable for both headlines and body text, and aligns well with a clean design. The font will allow for readability on a variety of screens, improving accessibility for users.
- Employ a minimalistic layout with clear sections for contract summary, risky clauses, risk score, and practical tips, displayed in modern cards with a light shadow to add depth and visual appeal.
- Incorporate simple, recognizable icons to represent different risk levels and types of clauses, enhancing the user's understanding and navigation through the analysis results.
- Use subtle animations for loading states and transitions between sections, providing feedback to the user without being intrusive or distracting. Animations should primarily serve to enhance the user experience, ensuring smooth navigation throughout the analysis.