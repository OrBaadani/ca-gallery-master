'use strict'


function onContact() {
    var mail = $('.mail-contact').val();
    var sbj = $('.sbj-contact').val();
    var msg = $('.msg-contact').val();
    var str = `https://mail.google.com/mail/?view=cm&fs=1&to=${mail}&su=${sbj}&body=${msg}`;
    window.open(str);
}

function renderProjs() {
    const projs = getProjs();

    var strHtmls = projs.map(function(proj, idx) {
        var str = ` <div class="col-md-4 col-sm-6 portfolio-item" id="${proj.id}">
                    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${idx+1}">
                    <div class="portfolio-hover">
                 <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
        </div>
    </div>
    <img class="img-fluid" src="img/portfolio/${proj.id}.png" alt="">
</a>
<div class="portfolio-caption">
    <h4>${proj.name}</h4>
    <p class="text-muted">Illustration</p>
</div>
</div>`;

        return str;
    });

    $('.portfolio-container').html(strHtmls);

}

function renderModals() {
    var projsMod = getProjs();
    var strHtmlsModals = projsMod.map(function(proj, idx) {
        console.log(idx + 1);
        return `<div class="portfolio-modal modal fade" id="portfolioModal${idx+1}" tabindex="-1" role="dialog" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
            <div class="lr">
                <div class="rl"></div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <div class="modal-body">
                        <!-- Project Details Go Here -->
                        <h2>${proj.name}</h2>
                        <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                        <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}.png" alt="">
                        <p>${proj.desc}</p>
<a class="btn btn-primary" href="${proj.url}" target="_blank">Check it Out</a>
                        <ul class="list-inline">
                            <li>Date: ${proj.publishedAt}</li>
                            <li>Client: Threads</li>
                            <li>Category: Illustration</li>
                        </ul>
                        <button class="btn btn-primary" data-dismiss="modal" type="button">
          <i class="fa fa-times"></i>
          Close Project</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>`;
    });
    $('.portfolio-modal-container').html(strHtmlsModals);
}