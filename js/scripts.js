/*!
* Start Bootstrap - Modern Business v5.0.7 (https://startbootstrap.com/template-overviews/modern-business)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-modern-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function scrollToDiv(event, divId) {
    event.preventDefault(); // Previne o comportamento padrão do link

    const div = document.getElementById(divId);
    if (div) {
        div.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}