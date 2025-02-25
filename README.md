# Dynamic Form

This project is a dynamic form that allows adding, removing, reordering, and updating links. 
It uses React, react-hook-form, and framer-motion to create an interactive and responsive user interface.


## Technologies Used
- React
- React-Hook-Form
- Framer Motion
- Shadcn

## Installation

1. Clone the repository:
2. Navigate to the project directory
3. Install the dependencies
4. Run:
```sh
pnpm dev
```
## Code Structure
The main component of the project is the App component, located in App.tsx.

### Hooks and Libraries:

- useForm and useFieldArray from react-hook-form to manage the form state.
- Reorder from framer-motion to enable reordering of list items.
- Custom components Button, Input, and Label from Shadcn.

### Features
- Add Link: Adds a new link to the top or the end of the list.
- Remove Link: Removes a specific link from the list.
- Reorder Links: Allows drag and drop to reorder the links.
- Update Link: Updates the title and URL of a specific link.
- Save: Saves the list of links and prints it to the console.