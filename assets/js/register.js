// xu li phan register
const register = document.getElementById("registerForm");
const user_register = document.querySelector(
  "#registerForm input[name='username']"
);
const pass_register = document.querySelector(
  "#registerForm input[name='password']"
);
const email = document.querySelector("#registerForm input[name='email']");

// NGAN LOAD TRANG  KHI AN SUBMIT , tao nick
register.addEventListener("submit", (e) => {
  e.preventDefault();
  // check acc ton tai chua
  const savedAccounts = JSON.parse(localStorage.getItem("acc") || "[]");
  // check mail va tk ton tai chua
  const newEmail = email.value.trim();
  const oldEmail = savedAccounts.some((acc) => acc.email === newEmail);
  const newUsername = user_register.value.trim().replace(/\s/g, "");
  const newPassword = pass_register.value.trim().replace(/\s/g, "");
  const oldName = savedAccounts.some(
    (acc) => acc.name.trim().replace(/\s/g, "") === newUsername
  );
  if (!/^[a-zA-Z0-9_]{3,15}$/.test(newUsername))
    return alert(
      "Username must be 3–15 characters long and contain only letters, numbers, or underscores."
    );

  if (newPassword.length < 6 || newPassword.length > 15) {
    return alert("Password must be between 6 and 15 characters.");
  }

  if (oldEmail) {
    return alert("This email is already registered.");
  }
  if (oldName) {
    return alert("This username is already taken.");
  }
  const account = {
    name: user_register.value.trim(),
    email: email.value.trim(),
    password: pass_register.value.trim(),
  };
  savedAccounts.push(account);
  localStorage.setItem("acc", JSON.stringify(savedAccounts));
  alert("Account created successfully!");
});

// toggle ben register
const toggleBtn = document.getElementById("togglePassword");

toggleBtn.addEventListener("click", () => {
  if (pass_register.type === "password") {
    pass_register.type = "text";
    toggleBtn.textContent = "🙉";
  } else {
    pass_register.type = "password";
    toggleBtn.textContent = "🙈";
  }
});
