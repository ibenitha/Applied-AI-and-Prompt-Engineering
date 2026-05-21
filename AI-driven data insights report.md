# AI-driven data insights report

## 1. Objective and scenario

### Objective

Use AI to analyze a provided dataset, extract meaningful patterns, and produce a concise insights report for a non-technical audience. This lab focuses on using AI for data analysis, pattern recognition, and strategic communication.

### Scenario

- The client: "UrbanTransit," a mid-sized city's public transportation authority. They have provided a CSV dataset of daily ridership, ticket sales, and delay reports from the past year.

- The task: The operations team, who are not data experts, needs a clear, plain-English report. You must use AI to explore the data and generate a report that highlights key trends in ridership (e.g., peak days, seasonality), any correlation between delays and ticket sales, and notable anomalies that a human analyst might miss.

**Key considerations:**

| Area | Detail |
| --- | --- |
| Audience | The operations team is non-technical — avoid jargon |
| Accuracy | You must fact-check the AI's insights — do not trust its conclusions blindly; cross-check patterns with a spreadsheet or simple data visualization |
| Actionable | Insights should lead to clear recommendations |

---

## 2. Final deliverables

Submit a single document containing:

- A 2–3 page data insights report including:

  - A summary of key trends

  - A section on notable anomalies

  - 3–5 scannable, actionable recommendations backed by your findings

- Your prompt history — a log of the prompts you used to explore the data and generate the report

- A short reflection (200 words or fewer) answering:

  - What was the biggest challenge in using AI for data analysis?

  - How did you ensure the AI's insights were accurate and not hallucinations?

  - How did your prompts evolve during this lab?

---

## 3. Step-by-step instructions

### Phase 1: Understand the task (15 mins)

- Read the scenario and review the provided [dataset.csv](https://amalitech.sharepoint.com/:x:/s/global/training/EeKYmb3S2zxDs7LiVNWR3d4BIJH42Br-_w8HGmWijbodkA?e=9YvNYr)

- Identify the deliverables and constraints (non-technical audience, data-backed insights)

- Check the evaluation rubric in Section 4 to understand the success criteria

### Phase 2: Deconstruct the problem (30 mins)

Break the large task into a logical sequence of prompts:

- "Analyze the headers and structure of this CSV."

- "Identify the peak ridership day of the week based on this data."

- "Is there a correlation between the 'Delay' column and the 'Ticket Sales' column?"

- "Draft a key insight for a non-technical manager based on this finding."

Draft your initial "first pass" prompts before moving on.

### Phase 3: Iterative prompting and chaining (60 mins)

- First pass — run your initial prompts. The AI will give you basic answers.

- Review — are the answers clear? Do they seem plausible?

- Refine and fact-check — ask follow-up questions to dig deeper. This is the most important step.

|  | Example |
| --- | --- |
| Bad prompt | "Tell me about the data." |
| Good prompt | "Using the provided CSV, act as a data analyst. Calculate the average ridership for each month and list the 3 lowest-performing months. Then, formulate a one-sentence insight about seasonality." |

- Chain — use the AI to transform your findings into the final report

Example: "Here are three key insights: [Insight 1, Insight 2, Insight 3]. Now, write a 3-bullet-point 'Actionable Recommendations' section for an operations manager based only on these insights."

- Assemble — combine your fact-checked insights and recommendations into the final 2–3 page report

### Phase 4: Submit and reflect (15 mins)

- Assemble your final report, prompt history, and reflection

- Proofread for clarity and ensure the report is 100% jargon-free before submitting

---

## 4. Evaluation rubric

| Criteria | Points | Description |
| --- | --- | --- |
| Accuracy and relevance of insights | 5 | Findings are accurate and correctly reflect the provided dataset |
| Clarity and brevity | 5 | Report is clear, concise, and easily understood by a non-technical audience |
| Strategic implications | 5 | Recommendations are actionable and logically flow from the data insights |
| Iterative refinement and chaining | 3 | Prompt history shows a clear progression of data exploration |
| Reflection on process | 2 | Reflection is insightful about the challenges of AI data analysis |
| Total | 20 |  |
