document.getElementById('loginBtn').addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const msg = document.getElementById('msg');

  if (!username || !password) {
    msg.textContent = "Completa todos los campos";
    msg.style.color = "red";
    return;
  }

  try {
    const res = await fetch('http://backend:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify({
        username,
        role: data.role
      }));
      window.location.href = "api.html";
    } else {
      msg.textContent = data.message || "Credenciales incorrectas";
      msg.style.color = "red";
    }
  } catch (error) {
    msg.textContent = "Error de conexión con el servidor";
    msg.style.color = "red";
  }
});
