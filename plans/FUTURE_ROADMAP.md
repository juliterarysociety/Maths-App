# Future Upgrades & Roadmap

Backlog of product opportunities and architectural enhancements to explore in future iterations.

---

### 1. Socratic AI Step Tutor (`/api/hint`)
- **Opportunity**: Integrate `@google/genai` (declared in `metadata.json` and `package.json`) via an Express proxy route (`server.ts`) to provide personalized, step-specific coaching hints when a student fails a step twice, directly targeting their misconception.
- **Trade-off**: Requires establishing a full-stack Node/Express runner (`server.ts`) and handling network latency/fallbacks.

---

### 2. Class 10 Syllabus Problem Bank Expansion
- **Opportunity**: Author standalone `ProblemData` schemas for Unit 1 (e.g., finding roots of $2x^2 - 8x + 6 = 0$ via quadratic formula) and Unit 3 (Circle external tangent lengths) so each syllabus node links to its real curriculum problem.
- **Trade-off**: Purely static content authoring; minimal technical risk, high pedagogical value.

---

### 3. Interactive Board Exam Simulation Mode
- **Opportunity**: Wire the sample papers in `PapersTab.tsx` into a timed 3-hour exam runner with question skipping, marking scheme rubric review, and section tallies.
- **Trade-off**: Moderately large UI state model to coordinate timer and exam status.
