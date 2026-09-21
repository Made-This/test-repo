// Switch the plan prices between monthly and yearly billing.
const toggle = document.querySelector(".billing-toggle");
let yearly = false;
toggle.addEventListener("click", () => {
  yearly = !yearly;
  document.querySelectorAll("[data-monthly]").forEach((el) => {
    el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly;
  });
  toggle.textContent = yearly ? "Show monthly prices" : "Show yearly prices";
});
