export function initGlowEffect() {
  console.log('Glow effect initialized'); // Debugging

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '0';
  canvas.style.pointerEvents = 'none';

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
  });

  let glowIntensity = 0;
  const maxGlowIntensity = 1;
  const glowSpeed = 0.01;

  function drawGlow() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      glowIntensity = Math.min(glowIntensity + glowSpeed, maxGlowIntensity);
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 * glowIntensity})`); 
      gradient.addColorStop(0.1, `rgba(240, 240, 240, ${0.2 * glowIntensity})`);
      gradient.addColorStop(0.2, `rgba(220, 220, 220, ${0.1 * glowIntensity})`);
      gradient.addColorStop(0.3, `rgba(200, 200, 200, ${0.05 * glowIntensity})`);
      gradient.addColorStop(0.6, `rgba(255, 255, 255, ${0.04 * glowIntensity})`);
      gradient.addColorStop(0.7, `rgba(240, 240, 240, ${0.03 * glowIntensity})`); 
      gradient.addColorStop(0.8, `rgba(220, 220, 220, ${0.02 * glowIntensity})`); 
      gradient.addColorStop(0.9, `rgba(200, 200, 200, ${0 * glowIntensity})`);
      
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
  }

  function animate() {
      drawGlow();
      requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  });

  animate();
}