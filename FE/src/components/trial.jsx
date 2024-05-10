import axios from 'axios'

// Function to generate markdown content
function generateMarkdown(projectTitle, completedTodos, totalTodos, pendingTodos, completedTodosList) {
    const markdownContent = `
# ${projectTitle}

**Summary:** ${completedTodos} / ${totalTodos} completed.

## Section 1: Pending Todos
${pendingTodos.map(todo => `- [ ] ${todo}`).join('\n')}

## Section 2: Completed Todos
${completedTodosList.map(todo => `- [x] ${todo}`).join('\n')}
`;

    return markdownContent;
}

export async function createGist(token, projectTitle, completedTodos, totalTodos, pendingTodos, completedTodosList) {
    const gistContent = generateMarkdown(projectTitle, completedTodos, totalTodos, pendingTodos, completedTodosList);
console.log(token);
    const response = await axios.get('https://api.github.com/gists', {
        method: 'POST',
        headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            files: {
                [`${projectTitle}.md`]: {
                    content: gistContent,
                },
            },
            public: false,
        }),
    });

    
    return response;
}
