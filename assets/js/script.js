// Account;
const user = document.getElementById("username");
const pass = document.getElementById("password");
// lay du lieu tu local da luu ben register de check
const savedUser = JSON.parse(localStorage.getItem("acc") || "[]");

// const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; dung them lenh test de tra ve true + trim xac thuc user nhap dang mail hay thuong

// xac thuc
const authentication = () => {
  const matchAcc = savedUser.find(
    (acc) =>
      (user.value.trim() === acc.name && pass.value.trim() === acc.password) ||
      (user.value.trim() === acc.email && pass.value.trim() === acc.password)
  );
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  // dinh dang mail
  if (user.type === "email" && !EMAIL_RE.test(user.value.trim())) {
    alert("Email format is wrong");
    return;
  }

  const SPECIAL_CHAR_RE = /[^\w]/;
  // [^\w] nghĩa là bất kỳ ký tự nào **không phải** a-z, A-Z, 0-9, _
  if (user.type === "text" && SPECIAL_CHAR_RE.test(user.value.trim())) {
    alert("Username cannot contain special characters ");
    return;
  }

  if (user.value === "" || pass.value === "") {
    alert("Username or Password can't empty");
    return;
  }

  if (
    user.type === "text" &&
    (user.value.length < 5 || user.value.length > 15)
  ) {
    alert("Username is too short, please enter 5 to 15 characters");
    return;
  }

  const PASS_RE_SIMPLE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/;

  // Giải thích:
  // (?=.*[A-Za-z]) → ít nhất 1 chữ cái
  // (?=.*\d) → ít nhất 1 số
  // (?=.*[@$!%*#?&]) → ít nhất 1 ký tự đặc biệt
  // {6,15} → tổng độ dài 6–15 ký tự
  if (!PASS_RE_SIMPLE.test(pass.value)) {
    alert(
      "Password must be 6-15 characters long and include letters, numbers, and special characters!"
    );
    return;
  }

  if (matchAcc) {
    alert("Login Successfully");
    setTimeout(() => {
      window.location.href = "https://phongls206.github.io/Caculate/";
    }, 1000);
  } else {
    alert("Username Or Password Is Not Correct");
  }
};

// login click
const login = document.getElementById("btn");
login.addEventListener("click", (e) => {
  e.preventDefault();
  authentication();
});

// show PASS
const showPass = document.querySelector(".fa-lock");
showPass.addEventListener("click", () => {
  if (pass.type === "password") {
    pass.type = "text";
    showPass.classList.remove("fa-lock");
    showPass.classList.add("fa-unlock");
  } else {
    pass.type = "password";
    showPass.classList.add("fa-lock");
    showPass.classList.remove("fa-unlock");
  }
});

// change login form dung toggle cho le
const changeLogin = document.querySelector(".fa-solid.fa-user");
changeLogin.addEventListener("click", () => {
  if (user.placeholder === "Username") {
    user.placeholder = "Email";
    user.type = "email";
  } else {
    user.placeholder = "Username";
    user.type = "text";
  }
  changeLogin.classList.toggle("fa-user");
  changeLogin.classList.toggle("fa-envelope");
});
