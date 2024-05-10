const { Octokit } = require('@octokit/rest')

const octokit = new Octokit({
    baseUrl: 'https://api.github.com'
})
octokit.rest.gists.create({
    
})