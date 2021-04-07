'use strict';

var gProj = createProjects();

function createProject(id, title, desc, url, labels = []) {
    return {
        id,
        title,
        desc,
        url,
        publishedAt: Date.now(),
        labels
    };
}

function createProjects() {
    var projects = [
        createProject('minesweeper', 'Minesweeper', 'game', null, ['matrixes']),
        createProject('pacman', 'Pacman', 'game', null, ['basics']),
        createProject('guess-me', 'Guess Me', 'game', null, ['bootstrap', 'jQuery']),
        createProject('book-shop', 'Book Shop', 'e-commerce', null, ['tables']),
        createProject('todos', 'Todos', 'utility', null, ['lists']),
        createProject('touch-the-nums', 'Touch The Nums', 'game', null, ['matrixes'])
    ];
    return projects;
}

function getProjects() {
    return gProj;
}

function getProjectById(id) {
    return gProj.find(proj => proj.id === id)
}