$(document).ready(function () {
    // $.validator.addMethod(
    //     'Characters',
    //     function (value) {
    //         return /^(?:[ก-ฮะ-ฺเ-ํ\s-]+|[a-zA-Z\s-]+)$/i.test(value);
    //     },
    //     "ไม่อนุญาตให้ใช้ตัวอักษรพิเศษยกเว้น ช่องว่าง และ \"-\""
    // );
    // $(document).on('keypress', '#MOBILE_PHONE_NUMBER', function (e) {
    //     var regex = /[0-9]/
    //     e = e || window.event;
    //     // console.log(e.target.value);
    //     if (!regex.test(e.key) || e.target.value.length > 9) {
    //         return false;
    //     }
    //     return true;
    // });


    $("#agentsForm").validate({
        rules: {
            // simple rule, converted to {required:true}
            FIRST_NAME: {
                required: true,
                // pattern: /^[ก-ฮเ-์a-zA-Z\s-]+$/,
                Characters: true,
                equalTo: "#firstTemp",
                maxlength: 40,
            },
            LAST_NAME: {
                required: true,
                // pattern: /^[ก-ฮเ-์a-zA-Z\s-]+$/,
                Characters: true,
                equalTo: "#lastTemp",
                maxlength: 40,
            },
            COMPANY: {
                required: true,
                // pattern: /^[ก-ฮเ-์a-zA-Z\s-]+$/,
                Characters: true,
                // equalTo: "#projectTemp",
                maxlength: 40,
            },
            MOBILE_PHONE_NUMBER: {
                required: true,
                digits: true,
                // rangelength: [9, 9],
            },
            // compound rule
            EMAIL: {
                email: true,
                pattern: /^[a-zA-Z0-9._%+-]+(_?[a-zA-Z0-9._%+-]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                maxlength: 40,
            },
            PROJECT: {
                required: true,
                // pattern: /^[ก-ฮเ-์a-zA-Z\s-]+$/,
                Characters: true,
                // equalTo: "#projectTemp",
                maxlength: 40,
            },
            TIME_SELECT: {
                checkAcknowledge: true,
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
                // pattern: "กรุณากรอกชื่อโดยไม่ใชอักษรพิเศษ",
                // equalTo: "กรุณากรอกชื่อโปรเจคโดยไม่มีช่องว่าง หรือ \"-\" ขึ้นต้น หรือตามหลังชื่อ",
                maxlength: "ความยาวต้องไม่เกิน 40 ตัวอักษร",
            },
            MOBILE_PHONE_NUMBER: {
                required: "กรุณากรอกโทรศัพท์มือถือ",
                digits: "กรุณากรอกตัวเลข 0-9",
                // minlength: jQuery.validator.format("กรุณากรอกโทรศัพท์มือถือ 10 หลัก"),
                // maxlength: jQuery.validator.format("กรุณากรอกโทรศัพท์มือถือ 10 หลัก"),
                // rangelength: jQuery.validator.format("กรุณากรอกโทรศัพท์มือถือ 10 หลัก"),
                // rangelength: "หมายเลขโทรศัพท์ไม่ถูกต้อง",
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
            }

        },
        submitHandler: function (form) {
        //         $('#btnSubmit').val('true')
        //         form.submit();
        
        },
        invalidHandler: function (event, validator) {
            //     // checkTermsAndConditions()
        }
    });

    var checkTermsAndConditions = function () {
        var cTermsAndConditions = $('#acknowledge')[0].checked;

        if (!cTermsAndConditions) {
            $('#acknowledge').addClass('error-check');
            $("#acknowledge-error").show();
            return false;
        } else {
            $('#acknowledge').removeClass('error-check');
            $("#acknowledge-error").hide();
            return true;
        }
    }

    // $.validator.addMethod(
    //     "checkAcknowledge",
    //     function (value, element) {
    //         return $('#acknowledge').is(':checked');
    //     },
    //     "กรุณาเลือกตัวเลือกนี้"
    // );

    $.validator.addMethod(
        'Characters',
        function (value) {
            return /^(?:[ก-ฮะ-ฺเ-ํ\s-]+|[a-zA-Z\s-]+)$/i.test(value);
        },
        "ไม่อนุญาตให้ใช้ตัวอักษรพิเศษยกเว้น ช่องว่าง และ \"-\""
    );

    $.validator.addMethod(
        "checkAcknowledge",
        function (value, element) {
            return value !== ""; // Ensure a value is selected
        },
        "กรุณาเลือกเวลาติดต่อ" // Custom error message
    );

    const checkboxes = document.querySelectorAll('#check1, #check2, #check3');
    const submitButton = document.getElementById('btnSubmit');

    function checkCheckboxes() {
        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
        if (allChecked) {
            submitButton.classList.remove('disabled');
            submitButton.classList.add('active');
            submitButton.disabled = false;
        } else {
            submitButton.classList.add('disabled');
            submitButton.classList.remove('active');

            submitButton.disabled = true;
        }
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkCheckboxes);
    });

    checkCheckboxes();
});


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
    if (data.match(regex) && data.length === 9) {
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




// function submitForm(event) {
//     event.preventDefault();
//     // let load = document.getElementById('loadingForm');
//     let first = document.getElementById('FIRST_NAME').value;
//     let last = document.getElementById('LAST_NAME').value;
//     let tel = document.getElementById('MOBILE_PHONE_NUMBER').value;
//     let email = document.getElementById('EMAIL').value;
//     // let options = document.querySelector('input[name="nameplate"]:checked');
//     // let formCheck = document.getElementById('CONTACT_PERMISSION_CODE').value;
//     // let formCheckBox = document.getElementById('acknowledge');

//     // if (formCheckBox.checked) {
//     // load.classList.add('active');
//     if (first !== '' || last !== '' || tel !== '') {
//         let FValue = checkDataFL(first);
//         let LValue = checkDataFL(last);
//         let TValue = checkDataT(tel);
//         let EValue = checkDataE(email);

//         if (email === '') {
//             if (FValue && LValue && TValue) {

//                 let object = {
//                     FIRST_NAME: normalizeData(first),
//                     LAST_NAME: normalizeData(last),
//                     MOBILE_PHONE_NUMBER: normalizeData(tel),
//                     EMAIL: normalizeData(email),
//                     // option: normalizeData(options.value),
//                     // CONTACT_PERMISSION_CODE: normalizeData(formCheck)
//                 };
//                 console.log(object);
//                 // sendData(object);
//             } else {
//                 event.preventDefault();
//                 // console.log('case 1')
//                 // load.classList.remove('active');
//             }

//         } else {
//             if (FValue && LValue && TValue && EValue) {
//                 let object = {
//                     FIRST_NAME: normalizeData(first),
//                     LAST_NAME: normalizeData(last),
//                     MOBILE_PHONE_NUMBER: normalizeData(tel),
//                     EMAIL: normalizeData(email),
//                     // option: normalizeData(options.value),
//                     // CONTACT_PERMISSION_CODE: normalizeData(formCheck)
//                 };
//                 console.log(object);
//                 // sendData(object);
//             } else {
//                 event.preventDefault();
//                 // console.log('case 2')
//                 // load.classList.remove('active');
//             }
//         }
//     } else {
//         event.preventDefault();
//         // console.log('case 3')
//         // load.classList.remove('active');
//     }
//     // } else {
//     //     event.preventDefault();
//     //     // console.log('case 4')
//     //     // load.classList.remove('active');
//     // }
//     console.log('submit complete')
// }