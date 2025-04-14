// src/utils/logger.js
const DEV_MODE = true;

export const log = (msg, data = null) => {
  if (!DEV_MODE) return;

  const time = new Date().toLocaleTimeString();
  const output = `[🧠 ${time}] ${msg}`;
  console.log(output, data ?? '');

  // fire to browser event for UI
  window.dispatchEvent(
    new CustomEvent('timeline:log', {
      detail: `${output} ${data ? JSON.stringify(data) : ''}`,
    })
  );
};
