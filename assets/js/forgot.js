const forgotForm = document.getElementById("forgot-form");
const usernameType = document.getElementById("username");
const emailType = forgotForm.querySelector("input[type='email']");
const dateType = forgotForm.querySelector("input[type='date']");
const savedUser = JSON.parse(localStorage.getItem("acc") || "[]");

// tao nut countdown
const countdownDiv = document.createElement("div");
countdownDiv.style.color = "hotpink";
countdownDiv.style.fontSize = "16px";
countdownDiv.style.marginTop = "10px";
forgotForm.appendChild(countdownDiv);

forgotForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const submitBtn = forgotForm.querySelector("button[type='submit']");
  submitBtn.disabled = true;

  const matchNick = savedUser.find(
    (acc) =>
      usernameType.value.trim() === acc.name &&
      emailType.value.trim() === acc.email &&
      dateType.value === acc.date
  );

  if (matchNick) {
    let countdown = 10;
    countdownDiv.textContent = `Reset link sent to ${emailType.value}. Entering new password in ${countdown}...`;

    const countdownInterval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        countdownDiv.textContent = `Reset link sent to ${emailType.value}. Entering new password in ${countdown}...`;
      } else {
        clearInterval(countdownInterval);
        countdownDiv.textContent = "";

        let newPass = prompt(
          "Enter your new password (6-15 chars, must include letters, numbers, special characters):"
        );

        const passRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,15}$/;

        while (
          newPass &&
          (!passRegex.test(newPass) || newPass === matchNick.password)
        ) {
          if (newPass === matchNick.password) {
            newPass = prompt(
              "Password cannot be the same as the old one! Enter a new password:"
            );
          } else {
            newPass = prompt(
              "Invalid password! Must be 6-15 characters and include letters, numbers, and special characters. Try again:"
            );
          }
        }

        if (newPass) {
          matchNick.password = newPass;
          localStorage.setItem("acc", JSON.stringify(savedUser));
          alert("Password updated successfully!");
          forgotForm.reset();
        }

        submitBtn.disabled = false;
      }
    }, 1000); // giam countdown sau moi giay
  } else {
    alert("Username, email, or date not found");
    submitBtn.disabled = false; //bat lai nut neu k tim thay vi nay disable
  }
});
