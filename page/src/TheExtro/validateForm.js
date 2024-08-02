$(document).ready(function () {
    $("#extroForm").validate({
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
            PROVINCE_INPUT: {
                required: true,
                notValidProvince: true,
            },
            DISTRICT_INPUT: {
                required: true,
                notValidDistrict: true,
            },
            // checkbox1: {
            //     checkboxRequired: true,
            // },
            // checkbox2: {
            //     checkboxRequired: true,
            // },
            // checkbox3: {
            //     checkboxRequired: true,
            // }
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
            MOBILE_PHONE_NUMBER: {
                required: "กรุณากรอกโทรศัพท์มือถือ",
                digits: "กรุณากรอกตัวเลข 0-9",
                minlength: jQuery.validator.format("กรุณากรอกโทรศัพท์มือถือ 10 หลัก"),
                maxlength: jQuery.validator.format("กรุณากรอกโทรศัพท์มือถือ 10 หลัก"),
                rangelength: jQuery.validator.format("กรุณากรอกโทรศัพท์มือถือ 10 หลัก"),
                rangelength: "หมายเลขโทรศัพท์ไม่ถูกต้อง",
            },
            EMAIL: {
                required: "กรุณากรอกอีเมล",
                email: "ตัวอย่างอีเมลที่ถูกต้อง name@domain.com",
                pattern: "กรุณากรอกอีเมลให้ถูกต้องตามรูปแบบ name@domain.com",
                maxlength: "ความยาวต้องไม่เกิน 40 ตัวอักษร",
            },
            PROVINCE_INPUT: {
                required: "กรุณาเลือกจังหวัด",
                notValidProvince: "กรุณาเลือกจังหวัด",
            },
            DISTRICT_INPUT: {
                required: "กรุณาเลือกอำเภอ / เขต",
                notValidDistrict: "กรุณาเลือกอำเภอ / เขต",
            },
            // checkbox1: {
            //     checkboxRequired: "กรุณาเลือกตัวเลือกนี้",
            // },
            // checkbox2: {
            //     checkboxRequired: "กรุณาเลือกตัวเลือกนี้",
            // },
            // checkbox3: {
            //     checkboxRequired: "กรุณาเลือกตัวเลือกนี้",
            // }
        },
        highlight: function (element, errorClass) {
            if (element.type === 'checkbox') {
                $(element).closest('.checkboxw').addClass('active');
            } else {
                $(element).addClass(errorClass);
            }
        },
        unhighlight: function (element, errorClass) {
            if (element.type === 'checkbox') {
                $(element).closest('.checkboxw').removeClass('active');
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
        "notValidProvince",
        function (value) {
            return value !== "";
        },
        "กรุณาเลือกจังหวัด"
    );
    $.validator.addMethod(
        "notValidDistrict",
        function (value) {
            return value !== "";
        },
        "กรุณาเลือกอำเภอ / เขต"
    );
    $.validator.addMethod(
        'checkboxRequired',
        function (value, element) {
            return $(element).is(':checked');
        },
        "กรุณาเลือกตัวเลือกนี้"
    );
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

document.getElementById('FIRST_NAME').addEventListener('input', updateFirstTemp);
document.getElementById('LAST_NAME').addEventListener('input', updateLastTemp);

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

$("#extroForm").submit(function () {
    event.preventDefault();
    let first = document.getElementById('FIRST_NAME').value;
    let last = document.getElementById('LAST_NAME').value;
    let tel = document.getElementById('MOBILE_PHONE_NUMBER').value;
    let email = document.getElementById('EMAIL').value;
    let budget = document.getElementById('budget').value;
    let province = document.getElementById('PROVINCE_INPUT').value;
    let district = document.getElementById('DISTRICT_INPUT').value;


    // let allCheckboxesChecked = true;
    // $('.checkboxw input[type="checkbox"]').each(function () {
    //     if (!$(this).is(':checked')) {
    //         $(this).closest('.checkboxw').addClass('active');
    //         allCheckboxesChecked = false;
    //     } else {
    //         $(this).closest('.checkboxw').removeClass('active');
    //     }
    // });

    let check1 = document.getElementById('checkbox1').checked ? 'accept' : 'not_accept';
    let check2 = document.getElementById('checkbox2').checked ? 'accept' : 'not_accept';
    let check3 = document.getElementById('checkbox3').checked ? 'accept' : 'not_accept';

    var tracking = {
        click_sub_header: "submit_lead",
        landing_page: "project_the_extro_page",
        section: "lead_register",
        event_action: "click",
        button: "submit_lead",
        budget: budget,
        consent_analytics: check1,
        consent_data_usage: check2,
        consent_third_party: check3,
        property_brand: "The EXTRO",
        project_label: "new_project",
        property_type: "condo",
        property_location: "Phayathai-Rangnam ",
        property_price: "STARTS 5.99 MB"
    }
    // console.log(tracking);
    // setDataLayer(tracking);

    let FValue = checkDataFL(first);
    let LValue = checkDataFL(last);
    let TValue = checkDataT(tel);
    let EValue = checkDataE(email);
    let PValue = checkDataFL(province);
    let DValue = checkDataFL(district);

    let object = {
        FIRST_NAME: normalizeData(first),
        LAST_NAME: normalizeData(last),
        MOBILE_PHONE_NUMBER: normalizeData(tel),
        EMAIL: normalizeData(email),
        BUDGET: normalizeData(budget),
        PROVINCE: normalizeData(province),
        DISTRICT: normalizeData(district),
    };
    if (FValue && LValue && TValue && EValue && PValue && DValue) {
        // sendData(object);
        console.log(object);
        console.log('submit complete')
    } else {
        event.preventDefault();
        console.log('submit not complete')
    }

});