document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const boldBtn = document.getElementById('bold');
    const italicBtn = document.getElementById('italic');
    const h1Btn = document.getElementById('h1');
    const h2Btn = document.getElementById('h2');
    const h3Btn = document.getElementById('h3');
    const linkBtn = document.getElementById('link');
    const tableDropdown = document.getElementById('table-dropdown');
    const addRowBtn = document.getElementById('addRow');
    const deleteRowBtn = document.getElementById('deleteRow');
    const themeToggle = document.getElementById('themeToggle');
    const copyMarkdownBtn = document.getElementById('copyMarkdown');
    const copyTextBtn = document.getElementById('copyText');
    const copyRtfBtn = document.getElementById('copyRtf');
    const copyHtmlBtn = document.getElementById('copyHtml');
    const saveBtn = document.getElementById('save');
    const loadBtn = document.getElementById('load');
    const clearBtn = document.getElementById('clear');
    const cheatSheetBtn = document.getElementById('cheatSheet');
    const cheatSheetModal = document.getElementById('cheatSheetModal');
    const closeCheatSheet = document.querySelector('#cheatSheetModal .close');

    function updatePreview() {
        preview.innerHTML = marked.parse(editor.value);
    }

    // Update preview
    editor.addEventListener('input', updatePreview);

    // Toolbar actions
    boldBtn.addEventListener('click', () => insertText('**', '**'));
    italicBtn.addEventListener('click', () => insertText('*', '*'));
    h1Btn.addEventListener('click', () => insertText('\n# ', ''));
    h2Btn.addEventListener('click', () => insertText('\n## ', ''));
    h3Btn.addEventListener('click', () => insertText('\n### ', ''));
    linkBtn.addEventListener('click', () => insertText('[', '](https://)'));

    // Table dropdown
    tableDropdown.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            const cols = parseInt(e.target.dataset.cols, 10);
            createTable(cols);
        }
    });

    addRowBtn.addEventListener('click', addRow);
    deleteRowBtn.addEventListener('click', deleteRow);
    
    themeToggle.addEventListener('click', toggleTheme);

    // File operations
    saveBtn.addEventListener('click', () => {
        const textToSave = editor.value;
        const blob = new Blob([textToSave], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'note.md';
        a.click();
    });

    loadBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.md, .txt';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                editor.value = e.target.result;
                updatePreview();
            };
            reader.readAsText(file);
        };
        input.click();
    });

    clearBtn.addEventListener('click', () => {
        editor.value = '';
        updatePreview();
    });

    // Cheat sheet modal
    cheatSheetBtn.addEventListener('click', () => {
        cheatSheetModal.style.display = 'block';
    });

    closeCheatSheet.addEventListener('click', () => {
        cheatSheetModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === cheatSheetModal) {
            cheatSheetModal.style.display = 'none';
        }
    });

    // Copy buttons
    copyMarkdownBtn.addEventListener('click', () => copyToClipboard(editor.value));
    copyTextBtn.addEventListener('click', () => copyToClipboard(preview.innerText));
    copyRtfBtn.addEventListener('click', () => {
        alert('To copy rich text, please right-click on the preview content and select "Copy" or "Copy (with formatting)" from the context menu.');
    });
    copyHtmlBtn.addEventListener('click', () => copyToClipboard(preview.innerHTML));

    function insertText(start, end) {
        const startPos = editor.selectionStart;
        const endPos = editor.selectionEnd;
        const selectedText = editor.value.substring(startPos, endPos);
        const newText = start + selectedText + end;
        editor.value = editor.value.substring(0, startPos) + newText + editor.value.substring(endPos);
        editor.focus();
        editor.selectionEnd = startPos + newText.length - end.length;
        updatePreview();
    }

    function createTable(cols) {
        let table = '\n|';
        for (let i = 0; i < cols; i++) {
            table += ' Header |';
        }
        table += '\n|';
        for (let i = 0; i < cols; i++) {
            table += ' ------ |';
        }
        for (let r = 0; r < 3; r++) {
            table += '\n|';
            for (let i = 0; i < cols; i++) {
                table += '        |';
            }
        }
        insertText(table, '');
    }

    function addRow() {
        const text = editor.value;
        const tableRegex = /\n(\|.*\|\n)+\|/g;
        const match = text.match(tableRegex);
        if (match) {
            const lastTable = match[match.length - 1];
            const lines = lastTable.trim().split('\n');
            const lastRow = lines[lines.length - 1];
            const cols = (lastRow.match(/\|/g) || []).length -1;
            let newRow = '\n|';
            for (let i = 0; i < cols; i++) {
                newRow += '        |';
            }
            editor.value = text.replace(lastTable, lastTable + newRow);
            updatePreview();
        }
    }

    function deleteRow() {
        const text = editor.value;
        const tableRegex = /\n(\|.*\|\n)+\|/g;
        const match = text.match(tableRegex);
        if (match) {
            const lastTable = match[match.length - 1];
            const lines = lastTable.trim().split('\n');
            if (lines.length > 2) { // Keep header and separator
                lines.pop();
                const newTable = lines.join('\n');
                editor.value = text.replace(lastTable, newTable);
                updatePreview();
            }
        }
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    }

    function toggleTheme() {
        const body = document.body;
        body.classList.toggle('dark-theme');
        // Update button text
        if (body.classList.contains('dark-theme')) {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Initial load
    // Theme initialization
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '🌙';
    }

});
