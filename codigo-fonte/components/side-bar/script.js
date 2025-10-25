/**
 * Toggles the sidebar between open and closed states
 */
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");

  if (sidebar) {
    sidebar.classList.toggle("open");
    // Notify parent window about the toggle
    window.parent.postMessage("toggle", "*");
  }
}

// Add event listener for window resize to handle responsive behavior
window.addEventListener("resize", () => {
  const sidebar = document.querySelector(".sidebar");

  if (window.innerWidth <= 768 && sidebar) {
    sidebar.classList.remove("open");
  }
});

// Listen for messages from parent window
window.addEventListener("message", function (event) {
  if (event.data === "toggle") {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.toggle("open");
    }
  }
});
