# [Made the tasklist into a single, separate file]

* Status: [Accepted}
* Deciders: [Kevin]
* Date: [2021-3-1]

## Context and Problem Statement
Part of the pomodoro technique is having a tasklist to record your progress in your workday. We wanted to create this tasklist for our website. It was going to be small and completely separate from the rest of the timer functionality, so as the dev tasked with this I needed to decide how much time I wanted to put into it.

## Decision Drivers <!-- optional -->
* Pressing Deadlines of the end of the quarter

## Considered Options

* Modules
* Single file

## Decision Outcome

Chosen option: The tasklist was made into a single file because it was easiest to write this way.
### Positive Consequences

*Code is together and easier to understand and maintain

### Negative Consequences

* More difficult to unit test
* Not in line with the established style of control, display, and logic modules
