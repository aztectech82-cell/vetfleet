// VetFleet public website behavior.
// The contact form opens a local email draft. It does not claim to send data
// through an unconfigured third-party service.

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open navigation menu');
            });
        });
    }

    const form = document.getElementById('contact-form');

    if (!form) {
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const data = new FormData(form);
        const serviceSelect = document.getElementById('c-service');
        // Guard on the value, not the option count: the placeholder option is always
        // "selected", so a length check never falls through to the default.
        const service = serviceSelect && serviceSelect.value
            ? serviceSelect.selectedOptions[0].textContent
            : 'General inquiry';
        const subject = 'VetFleet Inquiry - ' + service;
        const body = [
            'Name: ' + (data.get('name') || ''),
            'Company: ' + (data.get('company') || 'Not provided'),
            'Email: ' + (data.get('email') || ''),
            'Phone: ' + (data.get('phone') || 'Not provided'),
            'Service: ' + service,
            '',
            'Message:',
            data.get('message') || ''
        ].join('\r\n');

        window.location.href = 'mailto:marcos@vetfleet.com?subject='
            + encodeURIComponent(subject)
            + '&body='
            + encodeURIComponent(body);

        const success = document.getElementById('contact-success');
        if (success) {
            success.style.display = 'block';
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});
