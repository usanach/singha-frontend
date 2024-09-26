$(document).ready(function () {
    $("#agentsForm").validate({
        rules: {
            FIRST_NAME: {
                required: true,
                Characters: true,
                equalTo: "#firstTemp",
                maxlength: 40,
            },
            LAST_NAME: {
                required: true,
                Characters: true,
                equalTo: "#lastTemp",
                maxlength: 40,
            },
            MOBILE_PHONE_NUMBER: {
                required: true,
                digits: true,
                rangelength: [10, 10],
                startsWithZero: true,
            },
            EMAIL: {
                email: true,
                pattern: /^[a-zA-Z0-9._%+-]+(_?[a-zA-Z0-9._%+-]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                maxlength: 40,
            },
            PROJECT: {
                required: true,
                Characters: true,
                maxlength: 40,
            },
            TIME_SELECT: {
                checkAcknowledge: true,
                required: true,
            }
        },

        messages: {
            FIRST_NAME: {
                required: "กรุณากรอกชื่อ",
                equalTo: "กรุณากรอกชื่อโดยไม่มีช่องว่าง หรือ \"-\" ขึ้นต้น หรือตามหลังชื่อ",
                maxlength: "ความยาวต้องไม่เกิน 40 ตัวอักษร",
            },
            LAST_NAME: {
                required: "กรุณากรอกนามสกุล",
                equalTo: "กรุณากรอกชื่อโดยไม่มีช่องว่าง หรือ \"-\" ขึ้นต้น หรือตามหลังชื่อ",
                maxlength: "ความยาวต้องไม่เกิน 40 ตัวอักษร",
            },
            COMPANY: {
                required: "กรุณากรอกชื่อ",
                maxlength: "ความยาวต้องไม่เกิน 40 ตัวอักษร",
            },
            MOBILE_PHONE_NUMBER: {
                required: "กรุณากรอกโทรศัพท์มือถือ",
                digits: "กรุณากรอกตัวเลข 0-9",
            },
            EMAIL: {
                required: "กรุณากรอกอีเมล",
                email: "ตัวอย่างอีเมลที่ถูกต้อง name@domain.com",
                pattern: "กรุณากรอกอีเมลให้ถูกต้องตามรูปแบบ name@domain.com",
                maxlength: "ความยาวต้องไม่เกิน 40 ตัวอักษร",
            },
            PROJECT: {
                required: "กรุณากรอกชื่อโปรเจค",
                equalTo: "กรุณากรอกชื่อโปรเจคโดยไม่มีช่องว่าง หรือ \"-\" ขึ้นต้น หรือตามหลังชื่อ",
                maxlength: "ความยาวต้องไม่เกิน 40 ตัวอักษร",
            },
            TIME_SELECT: {
                checkAcknowledge: "กรุณาเลือกเวลาติดต่อ",
                required: "กรุณาเลือกเวลาติดต่อ",
            }
        },
        highlight: function (element, errorClass) {
            if (element.id === 'TIME_SELECT') {
                $(element).addClass('error-border');
            } else {
                $(element).addClass(errorClass);
            }
        },
        unhighlight: function (element, errorClass) {
            if (element.id === 'TIME_SELECT') {
                $(element).removeClass('error-border');
            } else {
                $(element).removeClass(errorClass);
            }
        }
    });

    $.validator.addMethod(
        'Characters',
        function (value) {
            return /^(?:[ก-ฮะ-ฺเ-ํ\s-]+|[a-zA-Z\s-]+)$/i.test(value);
        },
        "ไม่อนุญาตให้ใช้ตัวอักษรพิเศษยกเว้น ช่องว่าง และ \"-\""
    );
    $.validator.addMethod(
        'startsWithZero',
        function (value) {
            return value.startsWith('0');
        },
        "หมายเลขโทรศัพท์ไม่ถูกต้อง"
    );
    $.validator.addMethod(
        "checkAcknowledge",
        function (value, element) {
            return value !== "";
        },
        "กรุณาเลือกเวลาติดต่อ"
    );


});

const submitButton = document.getElementById('btnSubmit');

function checkCheckboxes() {
    const inputFormError = document.querySelectorAll('#agentsForm input.error');
    console.log(inputFormError);

    if (inputFormError.length == 0) {
        submitButton.classList.remove('disabled');
        submitButton.classList.add('active');
        submitButton.disabled = false;
    } else {
        submitButton.classList.add('disabled');
        submitButton.classList.remove('active');
        submitButton.disabled = true;
    }
}

checkCheckboxes();

function validateInputFL(input) {
    let regex = /^[ก-๙a-zA-Z\s-]+$/;
    let regexTN = /^[๐-๙]+$/;
    if (input.value.match(regexTN) || input.value.charAt(0).match(/[๐-๙]/) || input.value.charAt(input.value.length - 1).match(/[๐-๙]/)) {
        input.value = input.value.replace(/[๐-๙]+$/, '');
    } else if (!input.value.match(regex)) {
        input.value = input.value.replace(/[^ก-๙a-zA-Z\s-]+/g, '');
    }
    if (input.value.startsWith("-")) {
        input.value = input.value.replace(/^[-]+/, '');
    }
    if (input.value.startsWith(" ")) {
        input.value = input.value.replace(/^\s+/, '');
    }
    if (input.value.includes("฿")) {
        input.value = input.value.replace(/฿/g, '');
    }
}

function validateInputTel(input) {
    let regex = /^\d*$/;
    if (!input.value.match(regex)) {
        input.value = input.value.replace(/[^\d]+/g, '');
    }
}

function validateInputE(input) {
    var regex = /^[-_@0-9a-zA-Z.]+$/;
    if (!input.value.match(regex)) {
        input.value = input.value.replace(/[^-_@0-9a-zA-Z.]+/g, '');
    }
    if (input.value.startsWith("-")) {
        input.value = input.value.replace(/^[-]+/, '');
    }
    if (input.value.startsWith(" ")) {
        input.value = input.value.replace(/^\s+/, '');
    }
    if (input.value.startsWith("@")) {
        input.value = input.value.replace(/^@+/, '');
    }
    if (input.value.startsWith("_")) {
        input.value = input.value.replace(/^_+/, '');
    }
    if (input.value.startsWith(".")) {
        input.value = input.value.replace(/^\.+/, '');
    }
}

function checkPaste(event) {
    if (event.ctrlKey && (event.key === 'v' || event.key === 'V')) {
        event.preventDefault();
    }
}

function updateFirstTemp() {
    let input = document.getElementById('FIRST_NAME');
    let temp = document.getElementById('firstTemp');
    let value = input.value.trim();

    if (value.endsWith("-")) {
        value = value.replace(/-+$/, '');
    }
    if (value.endsWith(" ")) {
        value = value.replace(/\s+$/, '');
    }
    temp.value = value;
}

function updateLastTemp() {
    let input = document.getElementById('LAST_NAME');
    let temp = document.getElementById('lastTemp');
    let value = input.value.trim();

    if (value.endsWith("-")) {
        value = value.replace(/-+$/, '');
    }
    if (value.endsWith(" ")) {
        value = value.replace(/\s+$/, '');
    }
    temp.value = value;
}

function updateCompanyTemp() {
    let input = document.getElementById('COMPANY');
    let temp = document.getElementById('companyTemp');
    let value = input.value.trim();

    if (value.endsWith("-")) {
        value = value.replace(/-+$/, '');
    }
    if (value.endsWith(" ")) {
        value = value.replace(/\s+$/, '');
    }
    temp.value = value;
}

document.getElementById('FIRST_NAME').addEventListener('input', updateFirstTemp);
document.getElementById('LAST_NAME').addEventListener('input', updateLastTemp);
document.getElementById('COMPANY').addEventListener('input', updateCompanyTemp);

function trimString(inputId, tempId) {
    let input = document.getElementById(inputId);
    let temp = document.getElementById(tempId);
    let value = input.value.trim();

    if (value.endsWith("-")) {
        value = value.replace(/-+$/, '');
    }
    if (value.endsWith(" ")) {
        value = value.replace(/\s+$/, '');
    }
    temp.value = value;
}

document.getElementById('FIRST_NAME').addEventListener('contextmenu', event => {
    event.preventDefault();
});
document.getElementById('FIRST_NAME').addEventListener('paste', event => {
    event.preventDefault();
});

document.getElementById('LAST_NAME').addEventListener('contextmenu', event => {
    event.preventDefault();
});
document.getElementById('LAST_NAME').addEventListener('paste', event => {
    event.preventDefault();
});

document.getElementById('MOBILE_PHONE_NUMBER').addEventListener('contextmenu', event => {
    event.preventDefault();
});
document.getElementById('MOBILE_PHONE_NUMBER').addEventListener('paste', event => {
    event.preventDefault();
});

document.getElementById('EMAIL').addEventListener('contextmenu', event => {
    event.preventDefault();
});
document.getElementById('EMAIL').addEventListener('paste', event => {
    event.preventDefault();
});

document.getElementById('COMPANY').addEventListener('contextmenu', event => {
    event.preventDefault();
});
document.getElementById('COMPANY').addEventListener('paste', event => {
    event.preventDefault();
});

function normalizeData(data) {
    if (data.endsWith("-")) {
        data = data.replace(/-+$/, '');
    }
    if (data.endsWith(" ")) {
        data = data.replace(/\s+$/, '');
    }
    return data;
}

function checkDataFL(data) {
    let Wregex = /^[ก-ฮะ-ฺเ-ํa-zA-Z\s-]+$/;
    let regexN = /^[๐-๙0-9]+$/;
    if (data.match(regexN)) {
        return false;
    }
    if (data.startsWith("-") || data.startsWith(" ") || data.includes("฿") || data.endsWith("-") || data.endsWith(" ")) {
        return false;
    }
    if (data.match(Wregex) && data.length <= 40) {
        return true;
    } else {
        return false;
    }
}

function checkDataT(data) {
    let regex = /^\d*$/;
    if (data.match(regex) && data.length === 10) {
        return true;

    } else {
        return false;
    }


}

function checkDataE(data) {
    var regex = /^[-_@0-9a-zA-Z.]+$/;
    // var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.match(regex)) {
        return false;
    }
    if (data.startsWith("-") || data.startsWith(" ") || data.startsWith("@") || data.startsWith("_") || data.startsWith(".")) {
        return false;
    }
    if (data.endsWith("-") || data.endsWith(" ") || data.endsWith("@") || data.endsWith("_") || data.endsWith(".")) {
        return false;
    }
    if (data.match(regex) && data.length <= 40) {
        return true;
    } else {
        return false;
    }
}

function openpopup() {
    let openpopup = document.querySelectorAll('.form-popup-wrapper');
    openpopup.forEach(popup => {
        popup.style.display = 'block';
        popup.style.opacity = '1';
    })
}

function closepopup() {
    let openpopup = document.querySelectorAll('.form-popup-wrapper');
    openpopup.forEach(popup => {
        popup.style.display = 'none';
        popup.style.opacity = '0';
    })
}

let popupWrappers = document.querySelectorAll('.form-popup-wrapper');
popupWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', (event) => {
        if (event.target === wrapper) {
            wrapper.style.display = 'none';
        }
    });
});

let thankPopupClose = document.querySelectorAll('.thank-popup-close');
thankPopupClose.forEach(popclo => {
    popclo.addEventListener('click', () => {
        closepopup();
    });
});

$("#agentsForm").submit(function () {
    event.preventDefault();
    let first = document.getElementById('FIRST_NAME').value;
    let last = document.getElementById('LAST_NAME').value;
    let tel = document.getElementById('MOBILE_PHONE_NUMBER').value;
    let email = document.getElementById('EMAIL').value;
    let company = document.getElementById('COMPANY').value;
    let time = document.getElementById('TIME_SELECT').value;
    let detailArea = document.getElementById('detail-area').value;

    let telPrefix = document.getElementById('PRESET_PHONE').value;
    var tracking = {
        event: "submit_form",
        landing_page: landing_page,
        section: "become_agent",
        event_action: "submit_fill_info",
        button: "submit"
    }

    setDataLayer(tracking);
    let FValue = checkDataFL(first);
    let LValue = checkDataFL(last);
    let TValue = checkDataT(tel);
    let EValue = checkDataE(email);
    let CValue = checkDataFL(company);

    let object = {
        FIRST_NAME: normalizeData(first),
        LAST_NAME: normalizeData(last),
        MOBILE_PHONE_NUMBER: telPrefix + normalizeData(tel),
        EMAIL: normalizeData(email),
        COMPANY: normalizeData(company),
        TIME: normalizeData(time),
        DETAIL: normalizeData(detailArea),
    };
    if (FValue && LValue && TValue && EValue && CValue) {

        // sendData(object);
        // console.log(object);
        console.log('submit complete')
        openpopup();
    } else {
        event.preventDefault();
        console.log('submit not complete')
        checkCheckboxes();
    }
})