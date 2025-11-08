const BACKEND_URL = 'https://pokebakend.onrender.com';

document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const msg = document.getElementById('msg');

  if (!email || !password) {
    msg.textContent = "Completa todos los campos";
    msg.style.color = "red";
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      msg.textContent = "✅ Inicio de sesión exitoso";
      msg.style.color = "green";

      setTimeout(() => {
        window.location.href = "api.html";
      }, 1000);
    } else {
      msg.textContent = data.message || "Credenciales incorrectas";
      msg.style.color = "red";
    }
  } catch (error) {
    console.error(error);
    msg.textContent = "Error de conexión con el servidor";
    msg.style.color = "red";
  }
});
