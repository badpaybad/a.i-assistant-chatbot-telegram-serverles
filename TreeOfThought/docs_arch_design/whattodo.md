🎭 Role & Context
Act as a Senior Staff Engineer and Principal System Architect. Your task is to analyze the entire source code base and the existing .md documentation in this workspace. You need to write a comprehensive, crystal-clear technical documentation guide.

Target Audience: Junior Developers. They understand basic programming concepts but lack deep experience in system design, design patterns, and enterprise architecture. Avoid overly dense academic jargon without explanation; use analogies and clear step-by-step breakdowns where necessary.
📝 Core Instructions
Please scan the codebase and documentation, then generate a comprehensive guide structured strictly into two distinct sections:

🏛️ Part 1: Architecture Design (The "Why" and "What")
This section must explain the high-level design, structural boundaries, and architectural patterns of the system.

High-Level Overview: A simple, high-level summary of what this system does and its core architectural style (e.g., Microservices, Monolith, Event-Driven, Layered/Hexagonal Architecture).

System Components & Boundaries: Breakdown of the main modules/services/folders. Explain what each component is responsible for and where its boundaries lie.

Key Design Patterns: Identify the major design patterns used in the codebase (e.g., Repository Pattern, CQRS, Factory, Singleton, Dependency Injection). Explain why they were chosen for this specific project.

Data & Message Flow: Trace how a request or data flows through the system (from entry point to database/external services). Use ASCII diagrams if helpful to visualize the flow.

Tech Stack & Tooling: Briefly list the core technologies, frameworks, and self-hosted/open-source tools utilized, along with their roles in the architecture.

🚀 Part 2: Architecture Usage (The "How")
This section must be a practical, hands-on guide for a Junior Developer to start contributing to the codebase without breaking the architecture.

Codebase Navigation: Guide them on where to look. (e.g., "If you want to add a new API endpoint, go to folder X; if you need to change database logic, go to folder Y").

Standard Workflow (Step-by-Step): Provide an exact template/example of how to implement a typical feature (e.g., How to add a new API route, write its business logic, connect it to the repository, and expose it).

Architectural Rules & Guardrails: What are the strict "Do's and Don'ts"? (e.g., "Do NOT call repositories directly from controllers", "Do use the predefined Message Queue/Event bus for inter-agent communication").

Error Handling & Logging: How should they catch errors and log events uniformly across the system?

Testing & Validation: Where to write tests (Unit/Integration) and how to run them locally.

📋 Output Format
Output the final document in clean, highly readable Markdown (.md).

Use bolding (**text**) for emphasis on critical rules.

Use code blocks for folder structures or code snippets.

Maintain an encouraging, professional, and mentoring tone (like a helpful tech lead).

**chú ý** folder source code và các tài liệu cần để làm ở : TreeOfThought cần trừ subfolder TreeOfThought/docs_arch_design . Kết quả cần đưa các file vào trong folder: TreeOfThought/docs_arch_design

**cập nhật 1** dựa trên docs/{tên nghiệp vụ}/whattodo.md ban đầu và nếu có ảnh thiết kế để A.I IDE eg antigravity-ide làm thì lần đầu tiên đã có kết quả và có thể chạy được, về lý thuyết có thể đạt 80% chức năng như yêu cầu mong muốn. Sau đó developer sẽ viết thêm các cập nhật liên tục vào docs/{tên nghiệp vụ}/whattodo.md để yêu cầu A.I IDE tiếp tục xây dựng và hoàn thiện. Phát triển agile process liên tục
Ở TreeOfThought/howtodev là các hướng dẫn để A.I IDE có thể làm dễ dàng và developer có thể kiểm soát chất lượng của A.I IDE 
