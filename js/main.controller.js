'use strict';

$(function initPage() {
    renderProjects();
    $('.send').click(onContact);
})

function renderProjects() {
    var projects = getProjects();
    var strHtmls = projects.map(function(project) {
        return ` <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1" onclick="renderModal('${project.id}')">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${project.id}.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${project.title}</h4>
          <p class="text-muted">${project.labels}</p>
        </div>
      </div>`;
    })
    $('.projects').html(strHtmls);
}


function renderModal(projId) {
    var project = getProjectById(projId)
        // console.log({ strProject });
    var strHtml = `<h2>${project.title}</h2>
    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
    <a href="./proj/${project.id}/index.html"><img class="img-fluid d-block mx-auto" src="img/portfolio/${project.id}.jpg" alt=""></a>
        <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate,
            maiores repudiandae, nostrum, reiciendis facere nemo!</p>
        <ul class="list-inline">
        <li>Date: ${project.publishedAt}</li>
        <li>Client: Threads</li>
        <li>Category: ${project.labels}</li>
        </ul>
        <button class="btn btn-primary" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
        Close Project</button>`;

    $('.modal-body').html(strHtml);
}


function onContact() {
    var subject = $('input[name=subject]').val();
    var msg = $('textarea[name=message]').val();
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=dafnaba1@gmail.com&su=${subject}&body=${msg}`);
}