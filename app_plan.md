# Markdown Note Taker - Application Plan

This document outlines the plan for the browser-based Markdown note-taking application.

## 1. Core Components

-   **`index.html`**: The main HTML file containing the structure of the application.
-   **`style.css`**: The stylesheet for the application's appearance.
-   **`script.js`**: The JavaScript file containing the application's logic.
-   **Libraries**:
    -   `marked.js`: For converting Markdown to HTML.
    -   `html-to-rtf.js`: For converting HTML to Rich Text Format.

## 2. UI Layout

-   A main container split into two vertical panes:
    -   **Editor Pane (Left)**: A `<textarea>` for Markdown input.
    -   **Preview Pane (Right)**: A `<div>` to display the rendered HTML.
-   **Toolbar**: A bar at the top with buttons for Markdown formatting.
-   **File Operations**: A section at the bottom with buttons for file operations.

## 3. Functionality

### 3.1. Editor Pane
-   A `<textarea>` with the ID `editor`.
-   A "Copy Markdown" button (`copyMarkdown`) to copy the raw Markdown text.

### 3.2. Preview Pane
-   A `<div>` with the ID `preview`.
-   Three copy buttons:
    1.  **"Copy Text" (`copyText`)**: Copies the plain text content, stripped of all formatting.
    2.  **"Copy Rich Text" (`copyRtf`)**: Copies the content in RTF format for pasting into rich text editors.
    3.  **"Copy HTML" (`copyHtml`)**: Copies the formatted HTML source code.

### 3.3. Toolbar
-   **Bold** button (`bold`).
-   **Italic** button (`italic`).
-   **Heading** dropdown with H1, H2, H3 options.
-   **Link** button (`link`).
-   **Table** dropdown to insert tables of varying column counts.
-   **Add Row** button (`addRow`).
-   **Delete Row** button (`deleteRow`).

### 3.4. File Operations
-   **Save** button (`save`): Downloads the content of the editor pane as a `.md` file.
-   **Load** button (`load`): Opens a file picker to load `.md` or `.txt` files into the editor.
-   **Clear** button (`clear`): Clears the content of both the editor and preview panes.

## 4. Styling
-   Buttons will be styled for clarity and readability.
-   Copy buttons will be distinctly colored and labeled.
-   The layout will be responsive and user-friendly.
