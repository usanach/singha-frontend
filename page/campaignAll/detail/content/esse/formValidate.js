$(document).ready(function () {
    $(function () {

  // =========================
  // ✅ Custom Methods
  // =========================

  // อนุญาต: ไทย/อังกฤษ + ช่องว่าง + -
  $.validator.addMethod('Characters', function (value, element) {
    return this.optional(element) || /^(?:[ก-ฮะ-ฺเ-ํ\s-]+|[a-zA-Z\s-]+)$/i.test(value);
  }, 'ไม่อนุญาตให้ใช้ตัวอักษรพิเศษยกเว้น ช่องว่าง และ "-"');

  // ✅ ห้ามขึ้นต้น/ลงท้ายด้วย " " หรือ "-"
  $.validator.addMethod('noEdgeSpaceDash', function (value, element) {
    if (this.optional(element)) return true;
    const v = value; // ไม่ trim เพราะต้อง detect ช่องว่างหน้า/หลัง
    if (v.startsWith(' ') || v.endsWith(' ')) return false;
    if (v.startsWith('-') || v.endsWith('-')) return false;
    return true;
  }, 'กรุณากรอกชื่อโดยไม่มีช่องว่าง หรือ "-" ขึ้นต้น หรือตามหลังชื่อ');

  // เบอร์ต้องขึ้นต้นด้วย 0
  $.validator.addMethod('startsWithZero', function (value, element) {
    if (this.optional(element)) return true;
    return /^0/.test(value);
  }, 'หมายเลขโทรศัพท์ไม่ถูกต้อง');

  // =========================
  // ✅ Validate Setup
  // =========================
  $("#questionForm").validate({
    onkeyup: function (element) { $(element).valid(); toggleSubmit(); },
    onfocusout: function (element) { $(element).valid(); toggleSubmit(); },
    onclick: function () { toggleSubmit(); },

    rules: {
      FIRST_NAME: {
        required: true,
        Characters: true,
        noEdgeSpaceDash: true,
        maxlength: 40
      },
      LAST_NAME: {
        required: true,
        Characters: true,
        noEdgeSpaceDash: true,
        maxlength: 40
      },
      MOBILE_PHONE_NUMBER: {
        required: true,
        digits: true,
        rangelength: [10, 10],
        startsWithZero: true
      },
      EMAIL: {
        required: true,
        email: true,
        pattern: /^[a-zA-Z0-9._%+-]+(_?[a-zA-Z0-9._%+-]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        maxlength: 40
      }
      // PROJECT: ถ้าไม่มี input name="PROJECT" จริง ๆ ให้ไม่ต้องใส่
    },

    messages: {
      FIRST_NAME: {
        required: "กรุณากรอกชื่อ",
        maxlength: "ความยาวต้องไม่เกิน 40 ตัวอักษร"
      },
      LAST_NAME: {
        required: "กรุณากรอกนามสกุล",
        maxlength: "ความยาวต้องไม่เกิน 40 ตัวอักษร"
      },
      MOBILE_PHONE_NUMBER: {
        required: "กรุณากรอกโทรศัพท์มือถือ",
        digits: "กรุณากรอกตัวเลข 0-9",
        rangelength: "กรุณากรอกโทรศัพท์มือถือ 10 หลัก",
        startsWithZero: "หมายเลขโทรศัพท์ไม่ถูกต้อง"
      },
      EMAIL: {
        required: "กรุณากรอกอีเมล",
        email: "ตัวอย่างอีเมลที่ถูกต้อง name@domain.com",
        pattern: "กรุณากรอกอีเมลให้ถูกต้องตามรูปแบบ name@domain.com",
        maxlength: "ความยาวต้องไม่เกิน 40 ตัวอักษร"
      }
    },

    // ทำให้ error อยู่บรรทัดเดียวตาม input (ถ้าต้องการ)
    errorElement: "div",
    errorClass: "error",
    errorPlacement: function (error, element) {
      // วางหลัง input
      error.insertAfter(element);
    }
  });

  // =========================
  // ✅ Submit Button Toggle
  // =========================
  const submitButton = document.getElementById('btnSubmit');

  function toggleSubmit() {
    if (!submitButton) return;

    const validator = $("#questionForm").data("validator");
    const isValid = validator.checkForm(); // ✅ เช็คเงียบ ไม่โชว์ error
    if (isValid) {
      submitButton.classList.remove('disabled');
      submitButton.classList.add('active');
      submitButton.disabled = false;
    } else {
      submitButton.classList.add('disabled');
      submitButton.classList.remove('active');
      submitButton.disabled = true;
    }
  }

    toggleSubmit();
    $("#questionForm").on("input change", "input, select, textarea", toggleSubmit);

    });
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
$(document).on("submit", "#questionForm", async function (event) {
  event.preventDefault();
  event.stopPropagation();

    document.querySelector(".loading")?.classList.remove("hidden");
    document.querySelector(".loaded")?.classList.add("hidden");
    // ✅ ถ้า validate ไม่ผ่าน หยุด
    if (!$("#questionForm").valid()) {
        document.querySelector(".loading")?.classList.add("hidden");
        document.querySelector(".loaded")?.classList.remove("hidden");
        return false;
    }


  const btn = document.getElementById("btnSubmit");
  if (btn) btn.disabled = true;

  try {

const object = {
  FIRST_NAME: $("#FIRST_NAME").val().trim(),
  LAST_NAME: $("#LAST_NAME").val().trim(),
  MOBILE_PHONE_NUMBER: $("#MOBILE_PHONE_NUMBER").val().trim(),
  EMAIL: $("#EMAIL").val().trim(),

  // ✅ campaign slug จาก url (กันไม่ให้ query string ปน)
  CAMPAIGN: (function () {
    const parts = window.location.pathname.split("/").filter(Boolean);
    // /th/campaigns/2bed-the-esse  => parts[2] = "2bed-the-esse"
    return parts[2] || "";
  })(),
  PROMOTIONID :promotionItemIds ,
  // ✅ project ที่ user เลือกจาก select
  PROJECT: ($("#PROJECT").val() || "").trim(),

  // ✅ ถ้าคุณใช้ value แบบ "lv2|lv3" ให้แตกส่งเพิ่ม (optional แต่แนะนำ)
  ...(function () {
    const raw = ($("#PROJECT").val() || "").trim();
    if (!raw || !raw.includes("|")) return {};
    const [brand, location] = raw.split("|").map(s => (s || "").trim());
    return {
      PROJECT_BRAND: brand || "",
      PROJECT_LOCATION: location || ""
    };
  })(),

  consent: [$("#check1").prop("checked")],
  ...getUTMParams()
};

    // reCAPTCHA
    const token = await grecaptcha.execute(
      "6LevUS0nAAAAAInOUaytl6bgNgWFE4FQt2yofWyZ",
      { action: "submit" }
    );
    object.token = token;

    // ส่ง lead
    await axios.post(
      "https://residential-uat.singhaestate.co.th/leadadmin/api/droplead-promotion",
      object
    );
    
    console.log(object);
    // ensure hidden iframe exists
    let iframe = document.getElementById('zapier-iframe');
    const createdTime = new Date().toLocaleString();
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.name = 'zapier-iframe';
        iframe.id = 'zapier-iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }

    // dynamic form for Zapier event
    const zapForm = document.createElement('form');
    zapForm.method = 'POST';
    zapForm.action = zap;
    zapForm.target = 'zapier-iframe';
    zapForm.style.display = 'none';

    const eventData = {
        event: 'page_view',
        url: window.location.href,
        page_path: window.location.pathname + '/thankyou',
        title: document.title,
        timestamp: createdTime,
        ...object
    };

    Object.entries(eventData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        zapForm.appendChild(input);
    });

    document.body.appendChild(zapForm);
    zapForm.submit();

  } catch (error) {
    console.error("submit error:", error);
    document.querySelector(".loading")?.classList.add("hidden");
    document.querySelector(".loaded")?.classList.remove("hidden");
    if (btn) btn.disabled = false;
  }

  return false; // ✅ กัน native submit อีกรอบ
});
