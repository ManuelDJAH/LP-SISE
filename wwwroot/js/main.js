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

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
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
                // En la versión estática solo simula. En el proyecto MVC, descomenta el fetch:
                // const res = await fetch('/Contacto/Enviar', { method: 'POST', body: formData });
                // const result = await res.json();
                // status.textContent = result.mensaje;
                // status.classList.add(result.ok ? 'success' : 'error');
                // if (result.ok) form.reset();

                // SIMULACIÓN (versión estática)
                await new Promise(r => setTimeout(r, 600));
                status.textContent = '✓ ¡Gracias! Te contactaremos pronto.';
                status.classList.add('success');
                form.reset();
            } catch (err) {
                status.textContent = 'Error de conexión. Intenta más tarde.';
                status.classList.add('error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar solicitud';
            }
        });
    }

    /* -------- 5. Carrusel del hero -------- */
    const slides = document.querySelectorAll('.hero__slide');
    if (slides.length > 1) {
        const heroImgs = Array.from(slides)
            .map(s => s.querySelector('img'))
            .filter(Boolean);

        // Espera a que cada imagen esté cargada (o falle) antes de continuar
        const ready = (img) =>
            (img.complete && img.naturalWidth > 0)
                ? Promise.resolve()
                : new Promise(resolve => {
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true });
                });

        Promise.all(heroImgs.map(ready)).then(() => {
            let current = 0;
            setInterval(() => {
                slides[current].classList.remove('active');
                current = (current + 1) % slides.length;
                slides[current].classList.add('active');
            }, 8000); // 8 segundos por imagen
        });
    }

    /* -------- 6. Año dinámico en footer -------- */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});