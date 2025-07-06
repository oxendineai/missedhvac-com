# Important Decisions

This document tracks critical decisions made during conversations with Claude that impact project development.

## Format for Entries

### [YYYY-MM-DD] Decision Title
- **Project**: Which project this affects
- **Context**: Brief background on why the decision was needed
- **Options Considered**: What alternatives were evaluated
- **Decision**: What was decided
- **Rationale**: Why this option was chosen
- **Chat Reference**: Link to the full chat transcript

## Decisions

### [2025-07-03] Chat Archive System Implementation
- **Project**: All Projects
- **Context**: Needed a system to maintain continuity between Claude conversations
- **Options Considered**: 
  - Database storage
  - File-based system
  - Cloud document storage
- **Decision**: Implemented a file-based markdown system
- **Rationale**: Simple to implement, works with existing tools, easy to reference
- **Chat Reference**: [Initial Setup Chat](../active-projects/widget-development/chat-20250703-1.md)