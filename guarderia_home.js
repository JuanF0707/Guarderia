// ══════════════════════════════════════════════════════════════════
// 🌸 GUARDERÍA — Scripts principales
// guarderia_home.js
// ══════════════════════════════════════════════════════════════════

// ── Cursor personalizado ────────────────────────────────────────
const cur = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, .service-card, .plan-card, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});

// ── Navbar: transparente → blanco al hacer scroll ───────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
});

// ── Scroll reveal ───────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Modal login ─────────────────────────────────────────────────
function openModal(e) {
  if (e) e.preventDefault();
  document.getElementById('loginModal').classList.add('open');
}

function closeModal() {
  document.getElementById('loginModal').classList.remove('open');
}

// Cerrar al hacer clic fuera del modal
document.getElementById('loginModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Cerrar con tecla Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

function handleLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  if (!user || !pass) {
    alert('Por favor completa usuario y contraseña.');
    return;
  }

  // TODO: reemplazar con autenticación real
  // Redirigir a la app de registro
  alert(`✅ Bienvenida, ${user}!\n\nRedirigiendo al sistema de registro...`);
  // window.location.href = 'guarderia_app.html';
}

// ── Formulario de contacto ──────────────────────────────────────
function sendContact() {
  // TODO: conectar con backend o EmailJS para envío real
  alert('✅ ¡Mensaje enviado! Te contactaremos pronto. 🌸');
}

// ── Animación de emojis en el hero ─────────────────────────────
document.querySelectorAll('.emoji-item').forEach((el, i) => {
  el.style.animationDelay    = (i * 0.08 + 0.3) + 's';
  el.style.animationDuration = '0.5s';
});