# Skill: new-feature

This skill automates the creation of a new business feature (nghiệp vụ mới) following the Tree of Thought project structure.

## Activation
Triggered by: `@new-feature [BusinessName]`

## Workflow Steps

### 1. Scaffolding Documentation
- **Folder**: `TreeOfThought/docs/[BusinessName]`
- **Files**:
    - `yeucau.md`: Template for business requirements.
    - `phattrien.md`: Solution and implementation plan (to be filled by AI).

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
- Iterations on `yeucau.md` must trigger updates to `phattrien.md`.
- All code must adhere to the principles defined in `TreeOfThought/readme.md`.
