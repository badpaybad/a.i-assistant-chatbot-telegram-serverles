# Skill: dev-feature

This skill automates the creation of a new business feature, fixing bugs, or modifying existing features following the Tree of Thought project structure.

## Activation
Triggered by: `@dev-feature [BusinessName]`

## Workflow Steps

### 1. Scaffolding Documentation
- **Folder**: `TreeOfThought/docs/[BusinessName]`
- **Files**:
    - `yeucau.md`: Template for business requirements. (Must include a note to refer to base standards in `backend/yeucau.md` and `frontend/yeucau.md`).
    - `phattrien.md`: Solution and implementation plan (to be filled by AI, must refer to base standards).

### 2. Scaffolding Backend
- **Folder**: `TreeOfThought/backend/[BusinessName]`
- **Action**: Create a new C# project (class library or web api as appropriate) that references the Core infrastructure.
- **Reference**: `TreeOfThought/backend/yeucau.md` for base standards.

### 3. Scaffolding Frontend
- **Folder**: `TreeOfThought/frontend/web/src/modules/[BusinessName]`
- **Action**: Create the module directory and initialize standard folders:
    - `pages/`
    - `components/`
    - `services/`
    - `hooks/`
    - `types/`
- **Reference**: `TreeOfThought/frontend/web/yeucau.md` for base standards.

## Execution Rules
- The AI should wait for the user to fill in `yeucau.md` before generating `phattrien.md`.
- When generating `phattrien.md`, the AI **must** strictly follow the base standards defined in `TreeOfThought/backend/yeucau.md` and `TreeOfThought/frontend/yeucau.md`.
- Iterations on `yeucau.md` must trigger updates to `phattrien.md`.
- **Crucial**: The AI must wait for user confirmation of the solution in `phattrien.md` before proceeding with any code implementation.
- All code must adhere to the principles defined in `TreeOfThought/readme.md`.
