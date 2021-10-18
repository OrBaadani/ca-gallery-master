$(document).ready(initPage);

function initPage() {
    console.log('Starting up');
    renderProjs();
    renderModals();
    $('.btn-contact').click(onContact);
}