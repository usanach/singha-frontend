$(document).ready(function () {
    $("#questionForm").validate({
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
                maxlength: 40,
            },
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
            PROJECT: {
                required: "กรุณากรอกชื่อโปรเจค",
                equalTo: "กรุณากรอกชื่อโปรเจคโดยไม่มีช่องว่าง หรือ \"-\" ขึ้นต้น หรือตามหลังชื่อ",
                maxlength: "ความยาวต้องไม่เกิน 40 ตัวอักษร",

            },
        },

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
if (submitButton) {
    checkCheckboxes();
}
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

function updateProjectTemp() {
    let input = document.getElementById('PROJECT');
    let temp = document.getElementById('projectTemp');
    let value = input.value.trim();

    if (value.endsWith("-")) {
        value = value.replace(/-+$/, '');
    }
    if (value.endsWith(" ")) {
        value = value.replace(/\s+$/, '');
    }
    temp.value = value;
}

if (document.getElementById('FIRST_NAME')) {
    document.getElementById('FIRST_NAME').addEventListener('input', updateFirstTemp);
}
if (document.getElementById('LAST_NAME')) {
    document.getElementById('LAST_NAME').addEventListener('input', updateLastTemp);
}

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

if(document.getElementById('FIRST_NAME')){
    document.getElementById('FIRST_NAME').addEventListener('contextmenu', event => {
        event.preventDefault();
    });
    document.getElementById('FIRST_NAME').addEventListener('paste', event => {
        event.preventDefault();
    });
}

if(document.getElementById('LAST_NAME')){
    document.getElementById('LAST_NAME').addEventListener('contextmenu', event => {
        event.preventDefault();
    });
    document.getElementById('LAST_NAME').addEventListener('paste', event => {
        event.preventDefault();
    });
}

if(document.getElementById('MOBILE_PHONE_NUMBER')){
    document.getElementById('MOBILE_PHONE_NUMBER').addEventListener('contextmenu', event => {
        event.preventDefault();
    });
    document.getElementById('MOBILE_PHONE_NUMBER').addEventListener('paste', event => {
        event.preventDefault();
    });
}


if(document.getElementById('EMAIL')){
    document.getElementById('EMAIL').addEventListener('contextmenu', event => {
        event.preventDefault();
    });
    document.getElementById('EMAIL').addEventListener('paste', event => {
        event.preventDefault();
    });
}

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
    location.reload(true);
    openpopup.forEach(popup => {
        popup.style.display = 'none';
        popup.style.opacity = '0';
    })
}

let popupWrappers = document.querySelectorAll('.form-popup-wrapper');
popupWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', (event) => {
        if (event.target === wrapper) {
            location.reload(true);
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

const getUTMParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let utmParams = {};

    if (urlParams.has('utm_source')) {
        utmParams.utm_source = urlParams.get('utm_source');
    }
    if (urlParams.has('utm_medium')) {
        utmParams.utm_medium = urlParams.get('utm_medium');
    }
    if (urlParams.has('utm_campaign')) {
        utmParams.utm_campaign = urlParams.get('utm_campaign');
    }
    if (urlParams.has('utm_term')) {
        utmParams.utm_term = urlParams.get('utm_term');
    }
    if (urlParams.has('utm_content')) {
        utmParams.utm_content = urlParams.get('utm_content');
    }
    return utmParams;
};
$("#questionForm").submit(async function (event) {
    event.preventDefault();
    let first = document.getElementById('FIRST_NAME').value;
    let last = document.getElementById('LAST_NAME').value;
    let tel = document.getElementById('MOBILE_PHONE_NUMBER').value;
    let email = document.getElementById('EMAIL').value;

    let check = document.getElementById('check1');

    const dataset = await axios.get('/data/promotion.json');
    const data = await dataset.data;

    const datasets = data.items.filter((d, i) => d.data.link == getPath().campaign).map(d => d);


    var tracking = {
        event: "submit_lead",
        landing_page: landing_page,
        section: "lead_infomation",
        event_action: "submit_fill_info",
        promotion_name: promotionData.promotion_name,
        property_brand: promotionData.property_brand,
        project_label: promotionData.project_label,
        property_type: promotionData.property_type,
        property_location: promotionData.property_location,
        property_price: promotionData.property_price,
    }
    setDataLayer(tracking);
    let FValue = checkDataFL(first);
    let LValue = checkDataFL(last);
    let TValue = checkDataT(tel);
    let EValue = checkDataE(email);
    let ProjectValue = datasets[0].data.campaign["en"];
    let utmParams = getUTMParams();

    let object = {
        FIRST_NAME: normalizeData(first),
        LAST_NAME: normalizeData(last),
        MOBILE_PHONE_NUMBER: normalizeData(tel),
        EMAIL: normalizeData(email),
        CAMPAIGN: normalizeData(ProjectValue),
        consent: [check.checked],
        ...utmParams
    };


    // object.token = await window.recaptcha.execute(
    //     RECAPTCHA_KEY,
    //     { action: 'submit' },
    // );
    // console.log(object);
    // openpopup();
    if (FValue && LValue && TValue && EValue) {
        document.getElementById('btnSubmit').disabled = true;
        try {
            document.querySelector('.loading').classList.remove('hidden');
            document.querySelector('.loaded').classList.add('hidden');
            // Get reCAPTCHA token before submitting the form
            const token = await grecaptcha.execute('6LevUS0nAAAAAInOUaytl6bgNgWFE4FQt2yofWyZ', { action: 'submit' });

            // Add the token to the form object
            object.token = token;

            await axios.post('https://residential2.singhaestate.co.th/singlehouse/srin/prannok/en/droplead-campaign.php', object);
            openpopup();
        } catch (error) {
            document.querySelector('.loading').classList.add('hidden');
            document.querySelector('.loaded').classList.remove('hidden');
            console.log('>>error<<', error);
            const { response = {} } = error || {};
            const { status } = response;
            document.getElementById('btnSubmit').disabled = false;
        }

        console.log('submit complete')
    } else {
        event.preventDefault();
        console.log('submit not complete')
    }
    // if (first !== '' || last !== '' || tel !== '') {
    //     let FValue = checkDataFL(first);
    //     let LValue = checkDataFL(last);
    //     let TValue = checkDataT(tel);
    //     let EValue = checkDataE(email);
    //     let ProjectValue = project;

    //     if (email === '') {
    //         if (FValue && LValue && TValue) {

    //             let object = {
    //                 FIRST_NAME: normalizeData(first),
    //                 LAST_NAME: normalizeData(last),
    //                 MOBILE_PHONE_NUMBER: normalizeData(tel),
    //                 EMAIL: normalizeData(email),
    //                 // option: normalizeData(options.value),
    //                 // CONTACT_PERMISSION_CODE: normalizeData(formCheck)
    //             };
    //             sendData(object);
    //         } else {
    //             event.preventDefault();
    //             // console.log('case 1')
    //             // load.classList.remove('active');
    //         }

    //     } else {
    //         if (FValue && LValue && TValue && EValue) {
    //             let object = {
    //                 FIRST_NAME: normalizeData(first),
    //                 LAST_NAME: normalizeData(last),
    //                 MOBILE_PHONE_NUMBER: normalizeData(tel),
    //                 EMAIL: normalizeData(email),
    //                 // option: normalizeData(options.value),
    //                 // CONTACT_PERMISSION_CODE: normalizeData(formCheck)
    //             };
    //             sendData(object);
    //         } else {
    //             event.preventDefault();
    //             // console.log('case 2')
    //             // load.classList.remove('active');
    //         }
    //     }
    // } else {
    //     event.preventDefault();
    //     // console.log('case 3')
    //     // load.classList.remove('active');
    // }
    // // } else {
    // //     event.preventDefault();
    // //     // console.log('case 4')
    // //     // load.classList.remove('active');
    // // }
    // console.log('submit complete')
});