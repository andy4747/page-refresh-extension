document.addEventListener("DOMContentLoaded", function () {
  const intervalInput = document.getElementById("interval");
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const presetButtons = document.querySelectorAll(".preset-button");

  presetButtons.forEach((button) => {
    button.addEventListener("click", function () {
      intervalInput.value = button.getAttribute("data-interval");
    });
  });

  startBtn.addEventListener("click", function () {
    const interval = parseInt(intervalInput.value);
    if (interval < 1) {
      alert("Please enter a valid interval (minimum 1 second)");
      return;
    }

    chrome.runtime.sendMessage(
      { action: "start", interval: interval },
      function (response) {
        if (response.success) {
          startBtn.style.display = "none";
          stopBtn.style.display = "block";
        }
      }
    );
  });

  stopBtn.addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "stop" }, function (response) {
      if (response.success) {
        stopBtn.style.display = "none";
        startBtn.style.display = "block";
      }
    });
  });

  chrome.runtime.sendMessage({ action: "getStatus" }, function (response) {
    if (response.isRunning) {
      startBtn.style.display = "none";
      stopBtn.style.display = "block";
    }
  });
});
