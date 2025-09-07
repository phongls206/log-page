// xu li phan register
const register = document.getElementById("registerForm");
const user_register = document.querySelector(
  "#registerForm input[name='username']"
);
const pass_register = document.querySelector(
  "#registerForm input[name='password']"
);
const email = document.querySelector("#registerForm input[name='email']");

const birthday = document.getElementById("date");

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

  const PASS_RE =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,15}$/;
  if (!PASS_RE.test(newPassword)) {
    alert(
      "Password must be 6-15 characters, include letters, numbers, and special characters!"
    );
    return;
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
    date: birthday.value,
  };
  savedAccounts.push(account);
  localStorage.setItem("acc", JSON.stringify(savedAccounts));
  alert("Account created successfully!");
  register.reset();
});

// check birthday
const today = new Date();
//  built-in = “có sẵn trong ngôn ngữ”
// new: từ khóa để tạo một object mới từ class/hàm dựng sẵn.

// Date: là built-in object trong JS, chuyên dùng để làm việc với ngày và giờ.

// () : gọi constructor của Date. Nếu không truyền gì vào, nó tự lấy ngày giờ hiện tại của máy.

// today: biến chứa object ngày giờ vừa tạo.

//   Nếu truyền tham số vào Date():
// new Date("2024-12-25") → Tạo object đại diện ngày 25/12/2024
// quay lai 1 ngay trc de ko phai la hom nay
// const today = new Date(); → tạo ra 1 object chứa ngày + giờ hiện tại để mình có thể gọi tiếp .getFullYear(), .getMonth(), .getDate(), .getHours()...
today.setDate(today.getDate() - 1);
// format chuan date ( js thang bat dau tu 0 nen phai +1 cho chuan)
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const dayday = String(today.getDate()).padStart(2, "0");
// getDate() trả về ngày trong tháng (1–31).
// Dùng padStart(2, "0") để đảm bảo luôn có 2 số.
const totalDate = `${year}-${month}-${dayday}`;
document.getElementById("date").setAttribute("max", totalDate);

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
