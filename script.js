const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function hideError(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

function validateName() {
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        showError(nameInput, nameError, 'يرجى إدخال الاسم');
        return false;
    }
    if (nameValue.length < 3) {
        showError(nameInput, nameError, 'الاسم يجب أن يكون على الأقل 3 حروف');
        return false;
    }
    hideError(nameInput, nameError);
    return true;
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
        showError(emailInput, emailError, 'يرجى إدخال البريد الإلكتروني');
        return false;
    }
    if (!isValidEmail(emailValue)) {
        showError(emailInput, emailError, 'يرجى إدخال بريد إلكتروني صحيح');
        return false;
    }
    hideError(emailInput, emailError);
    return true;
}

function validatePassword() {
    const passwordValue = passwordInput.value;
    if (passwordValue === '') {
        showError(passwordInput, passwordError, 'يرجى إدخال كلمة المرور');
        return false;
    }
    if (passwordValue.length < 6) {
        showError(passwordInput, passwordError, 'كلمة المرور يجب أن تكون على الأقل 6 أحرف');
        return false;
    }
    hideError(passwordInput, passwordError);
    return true;
}

function validateConfirmPassword() {
    const confirmPasswordValue = confirmPasswordInput.value;
    const passwordValue = passwordInput.value;
    if (confirmPasswordValue === '') {
        showError(confirmPasswordInput, confirmPasswordError, 'يرجى تأكيد كلمة المرور');
        return false;
    }
    if (confirmPasswordValue !== passwordValue) {
        showError(confirmPasswordInput, confirmPasswordError, 'كلمة المرور غير متطابقة');
        return false;
    }
    hideError(confirmPasswordInput, confirmPasswordError);
    return true;
}

nameInput.addEventListener('blur', validateName);
nameInput.addEventListener('input', function() {
    if (nameInput.classList.contains('error')) {
        validateName();
    }
});

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', function() {
    if (emailInput.classList.contains('error')) {
        validateEmail();
    }
});

passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('input', function() {
    if (passwordInput.classList.contains('error')) {
        validatePassword();
    }
    if (confirmPasswordInput.value !== '') {
        validateConfirmPassword();
    }
});

confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
confirmPasswordInput.addEventListener('input', function() {
    if (confirmPasswordInput.classList.contains('error')) {
        validateConfirmPassword();
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        alert('تم إنشاء الحساب بنجاح!');
        form.reset();
        document.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('success', 'error');
        });
        document.querySelectorAll('.error-message').forEach(error => {
            error.classList.remove('show');
        });
    } else {
        if (!isNameValid) {
            nameInput.focus();
        } else if (!isEmailValid) {
            emailInput.focus();
        } else if (!isPasswordValid) {
            passwordInput.focus();
        } else if (!isConfirmPasswordValid) {
            confirmPasswordInput.focus();
        }
    }
});
