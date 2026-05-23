document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('inquiry-form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = document.getElementById('submit-btn');
      btn.disabled = true;
      btn.innerText = 'Sending...';

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      data.addons = formData.getAll('addons'); // Capture multiple checkboxes

      try {
        const response = await fetch('/api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          // 1. Hide the form entirely
          form.classList.add('u-hidden');

          // 2. Select the message
          const successBox = document.getElementById('success-message');

          // 3. Remove the 'none' display and trigger the animation
          successBox.classList.remove('u-hidden');
          successBox.classList.add('u-fade-in');

          // 4. Smooth scroll to the message (UX pro-move)
          successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          throw new Error();
        }
      } catch (err) {
        alert('Issue sending inquiry. Please email hello@fincacoffee.com');
        btn.disabled = false;
        btn.innerText = 'Request Consultation →';
      }
    });
  }
});
