var API_URL = "https://private-b2e6827-robustatask.apiary-mock.com";
var API_PATH_SIGNUP = "/auth/register";
var API_PATH_SIGNIN = "/auth/login";
var emailRegex = /^\S+@\S+\.\S+$/;
var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(.){8,}$/;
var signType = "signUp";
var isShowPassword = false;

function setMinHeight() {
  document.getElementById("sign").style.minHeight =
    window.innerHeight - 1 + "px";
}

function sign(type) {
  document.getElementById("error").innerHTML =
    "Please fill the required fields with * symbol.";
  document.getElementById("error").className = "";
  document.getElementById("signType").innerHTML =
    type === "signIn" ? "In" : "Up";
  const inputs = document.getElementsByClassName("switchInput");
  if (type === "signIn") {
    signType = "signIn";
    for (const input of inputs) {
      input.style.display = "none";
    }
  } else {
    signType = "signUp";
    for (const input of inputs) {
      input.style.display = "flex";
    }
  }
}

function showPassword() {
  if (isShowPassword) {
    document.getElementById("passwardPic").src =
      "https://t3.ftcdn.net/jpg/01/78/96/78/240_F_178967820_27Bx4VjlrZYsVkAKt7FCLWh7Xen8r0Yk.jpg";
    document.getElementById("password").type = "password";
  } else {
    document.getElementById("passwardPic").src =
      "https://t4.ftcdn.net/jpg/00/96/48/11/240_F_96481104_qBddfJ8fTT5Rsi8eRuJvFCWN9H6qhD4O.jpg";
    document.getElementById("password").type = "text";
  }
  isShowPassword = !isShowPassword;
}

function inputChange(event, type) {
  switch (type) {
    case "length":
      if (event.target.value.length === 0) {
        document.getElementById(event.target.id).style.borderBottomColor =
          "firebrick";
      } else {
        document.getElementById(event.target.id).style.borderBottomColor =
          "black";
      }
      break;
    case "email":
      if (!emailRegex.test(event.target.value)) {
        document.getElementById(event.target.id).style.borderBottomColor =
          "firebrick";
      } else {
        document.getElementById(event.target.id).style.borderBottomColor =
          "black";
      }
      break;
    case "password":
      if (!passwordRegex.test(event.target.value)) {
        document.getElementById(event.target.id).style.borderBottomColor =
          "firebrick";
      } else {
        document.getElementById(event.target.id).style.borderBottomColor =
          "black";
      }
      break;

    default:
      break;
  }
}

function checkInputData(inputs) {
  if (signType === "signUp") {
    if (inputs[0].value.length === 0) {
      return "Full name is required !";
    } else if (!emailRegex.test(inputs[1].value)) {
      return "Email is incorrect !";
    } else if (inputs[2].value.length === 0) {
      return "Username is required !";
    } else if (!passwordRegex.test(inputs[3].value)) {
      return "Password should contain at least one digit, one lower case letter, one upper case letter, and at least 8 characters !";
    } else {
      return "";
    }
  } else {
    if (!emailRegex.test(inputs[1].value)) {
      return "Email is incorrect !";
    } else if (!passwordRegex.test(inputs[3].value)) {
      return "Password should contain at least one digit, one lower case letter, one upper case letter, and at least 8 characters !";
    } else {
      return "";
    }
  }
}

function submitform(event) {
  event.preventDefault();
  event.stopPropagation();
  const err = checkInputData(event.target);
  if (err.length > 0) {
    document.getElementById("error").innerHTML = err;
    document.getElementById("error").className = "err";
  } else {
    var formData = {
      email: $("#email").val(),
      name: $("#name").val(),
      username: $("#username").val(),
      password: $("#password").val(),
    };

    if (signType === "signIn") {
      delete formData.name;
      delete formData.username;
    }

    document.getElementById("formLoading").className = "show";

    $.ajax({
      url:
        API_URL + (signType === "signIn" ? API_PATH_SIGNIN : API_PATH_SIGNUP),
      type: "post",
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        document.getElementById("error").innerHTML = data.message;
        document.getElementById("error").className = "success";
      },
      error: function (data) {
        document.getElementById("error").innerHTML =
          "Sorry, something went wrong !!";
        document.getElementById("error").className = "err";
      },
      complete: function (data) {
        document.getElementById("formLoading").className = "remove";
      },
      data: JSON.stringify(formData),
    });
  }
}
