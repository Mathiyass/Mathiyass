document.addEventListener("DOMContentLoaded", () => {
  const lines = [
    "Full-Stack Architect & AI Specialist ⚡",
    "Building Distributed Cloud & Agentic Systems 🤖",
    "Software Engineering @ BCU 🎓",
    "Open Source Contributor & Performance Hacker 🚀",
  ];
  
  const typeSpeed = 65;
  const eraseSpeed = 35;
  const pauseDuration = 2000;
  
  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingEl = document.querySelector(".typing");
  if (!typingEl) return;

  const cursorEl = document.createElement("span");
  cursorEl.classList.add("cursor");
  cursorEl.textContent = "\u00A0";
  typingEl.after(cursorEl);

  function tick() {
    const currentText = lines[lineIndex];

    if (!isDeleting) {
      typingEl.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(tick, pauseDuration);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      typingEl.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, eraseSpeed);
    }
  }

  // Cursor blink interval
  setInterval(() => {
    cursorEl.classList.toggle("inactive");
  }, 530);

  // Initialize typing
  setTimeout(tick, 600);
});
