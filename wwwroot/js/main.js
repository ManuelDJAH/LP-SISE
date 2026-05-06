/* ============================================
   Soporte Integral SE — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* -------- 1. Header con efecto scroll -------- */
    const header = document.getElementById('header');
    const onScroll = () => {
        if (window.scrollY > 30) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll);
    onScroll();

    /* -------- 2. Menú móvil -------- */
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    navToggle.addEventListener('click', () => {
        const open = nav.classList.toggle('active');
        navToggle.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', String(open));
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    /* -------- 3. Animaciones al scroll -------- */
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => io.observe(el));

    /* -------- 4. Validación + envío del formulario -------- */
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            status.textContent = '';
            status.className = 'form__status';

            // Validación cliente (rápida, antes de enviar al servidor)
            const data = Object.fromEntries(new FormData(form));
            const errors = [];
            if (!data.nombre.trim()) errors.push('nombre');
            if (!/^[\d+\s()-]{7,}$/.test(data.telefono.trim())) errors.push('telefono');
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email.trim())) errors.push('email');
            if (!data.servicio) errors.push('servicio');
            if (!data.mensaje.trim()) errors.push('mensaje');

            if (errors.length) {
                status.textContent = 'Por favor revisa los campos marcados.';
                status.classList.add('error');
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            try {
                const res = await fetch('/Contacto/Enviar', {
                    method: 'POST',
                    body: new FormData(form)
                });
                const result = await res.json();

                status.textContent = result.mensaje;
                status.classList.add(result.ok ? 'success' : 'error');
                if (result.ok) form.reset();
            } catch (err) {
                status.textContent = 'Error de conexión. Intenta más tarde.';
                status.classList.add('error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar solicitud';
            }
        });
    }

    /* -------- 5. Año dinámico en footer -------- */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});