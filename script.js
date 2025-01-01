 // Fireworks animation
 const canvas = document.querySelector('.fireworks');
 const ctx = canvas.getContext('2d');
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;

 let fireworks = [];

 class Firework {
     constructor(x, y) {
         this.x = x;
         this.y = y;
         this.particles = [];
         for (let i = 0; i < 100; i++) {
             this.particles.push(new Particle(x, y));
         }
     }

     draw() {
         this.particles.forEach(particle => particle.draw());
     }
 }

 class Particle {
     constructor(x, y) {
         this.x = x;
         this.y = y;
         this.size = Math.random() * 2 + 1;
         this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
         this.velocityX = (Math.random() - 0.5) * 6;
         this.velocityY = (Math.random() - 0.5) * 6;
         this.life = 100;
     }

     draw() {
         if (this.life > 0) {
             ctx.beginPath();
             ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
             ctx.fillStyle = this.color;
             ctx.fill();

             this.x += this.velocityX;
             this.y += this.velocityY;
             this.size *= 0.98;
             this.life -= 2;
         }
     }
 }

 function createFirework() {
     const x = Math.random() * canvas.width;
     const y = Math.random() * canvas.height;
     fireworks.push(new Firework(x, y));
 }

 function animate() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     fireworks.forEach((firework, index) => {
         firework.draw();
         if (firework.particles.every(p => p.life <= 0)) {
             fireworks.splice(index, 1);
         }
     });
     requestAnimationFrame(animate);
 }

 setInterval(createFirework, 500);
 animate();

 window.addEventListener('resize', () => {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
 });

 // Surprise message
 function showSurprise() {
     const message = document.getElementById('hiddenMessage');
     message.classList.add('show');
 }