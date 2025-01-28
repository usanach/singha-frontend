<?php

require_once './config.php';

require './vendor/phpmailer/phpmailer/src/PHPMailer.php';
require './vendor/phpmailer/phpmailer/src/Exception.php';
require './vendor/phpmailer/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;

function createEmail()
{
    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->CharSet = 'UTF-8';
    $mail->Host = $GLOBALS['SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $GLOBALS['SMTP_USERNAME'];
    $mail->Password = $GLOBALS['SMTP_PASSWORD'];
    $mail->Port = $GLOBALS['SMTP_PORT'];
    $mail->setFrom($GLOBALS['FROM_EMAIL'], $GLOBALS['FROM_NAME']);
    return $mail;
}

function respond($code, $message, $data = NULL)
{
    $body = array(
        'successful' => $code === 200,
        'meta' => array(
            'code' => $code,
            'message' => $message,
        ),
    );

    if (isset($data)) {
        $body['data'] = $data;
    }

    http_response_code($code);
    echo json_encode($body);
}

respond(200, 'OK');

function respondInvalidInput()
{
    respond(400, 'Invalid Input');
}

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    respond(403, 'Forbidden');
}

function sendMail() {
    
    $json = file_get_contents('php://input');
    $input = json_decode($json);

    $token = '';
    if (!property_exists($input, 'token')) {
        respondInvalidInput();
    } else {
        $token = $input->token;
    }

    $apiBody = array(
        'secret' => $GLOBALS['RECAPTCHA_SECRET'],
        'response' => $token
    );

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => $GLOBALS['RECAPTCHA_URL'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 60,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => http_build_query($apiBody),
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/x-www-form-urlencoded'
        ),
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_SSL_VERIFYHOST => 0,
    ));

    $responseJson = curl_exec($curl);
    $curlError = curl_errno($curl);

    $recaptchaResponse = json_decode($responseJson);
    if (!$recaptchaResponse->success) {
        respond(403, 'Forbidden');
    }

    $firstName = '';
    $lastName = '';
    $email = '';
    $phoneNumber = '';
    $budget = '';
    $province = '';
    $district = '';
    $locationOptions = '';

    if (!property_exists($input, 'firstName')) {
        respondInvalidInput();
    } else {
        $firstName = $input->firstName;
    }

    if (!property_exists($input, 'lastName')) {
        respondInvalidInput();
    } else {
        $lastName = $input->lastName;
    }

    if (!property_exists($input, 'email')) {
        respondInvalidInput();
    } else {
        $email = $input->email;
    }

    if (!property_exists($input, 'phoneNumber')) {
        respondInvalidInput();
    } else {
        $phoneNumber = $input->phoneNumber;
    }

    if (!property_exists($input, 'province')) {
        respondInvalidInput();
    } else {
        $province = $input->province;
    }

    if (!property_exists($input, 'district')) {
        respondInvalidInput();
    } else {
        $district = $input->district;
    }

    if (property_exists($input, 'budget')) {
        $budget = $input->budget;
    }

    if (property_exists($input, 'locationOptions')) {
        $locationOptions = $input->locationOptions;
    }

    $consent01 = array(
        'Id' => 'c96371c9-9491-4a0b-81e4-f01dd4010297',
        'TransactionType' => 'NOTGIVEN'
    );


    if (!property_exists($input, 'consents') || !is_array($input->consents) || count($input->consents) !== 1) {
        respondInvalidInput();
    } else {
        $consent01['TransactionType'] = key_exists(0, $input->consents) && $input->consents[0] === TRUE
            ? 'CONFIRMED' : 'NOTGIVEN';
    }


    // Receipt API
    //SMYTH’S RAMINTRA

    if($locationOptions['0'] == 1 ) {
        $apiBody = array(
            'identifier' => $email,
            'requestInformation' => $GLOBALS['RECEIPT_REQUEST_INFORMATION_RAM'],
            'purposes' => array(
                $consent01,
            ),
            'dsDataElements' => array(
                'FirstName' => $firstName,
                'LastName' => $lastName,
                'Mobile' => $phoneNumber,
                'Budget' => $budget,
                'Province' => $province,
                'District' => $district,
            ),
        );

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $GLOBALS['RECEIPT_API_URL'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($apiBody),
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_SSL_VERIFYHOST => 0,
        ));

        $responseJson = curl_exec($curl);
        $curlError = curl_errno($curl);

        curl_close($curl);

        $response = json_decode($responseJson);

        if ($curlError !== CURLE_OK || !property_exists($response, 'receipt')) {
            respond(500, 'Internal Server Error (1)');
        }

        // Icon API

        $apiBody = array(
            'username' => $GLOBALS['ICON_API_USERNAME'],
            'password' => $GLOBALS['ICON_API_PASSWORD'],
            'fname' => $firstName,
            'lname' => $lastName,
            'phone' => $phoneNumber,
            'email' => $email,
            'msg' => '',
            'address' => '',
            'houseNumber' => '',
            'villageNumber' => '',
            'village' => '',
            'alley' => '',
            'road' => '',
            'subDistrict' => '',
            'district' => $district,
            'province' => $province,
            'postalCode' => '',
            'budget' => $budget,
            'roomType' => '',
            'project' => $GLOBALS['ICON_PROJECT_NAME_RAM'],
            'source' => $GLOBALS['ICON_SOURCE'],
            'isJuristic' => '',
            'grade' => '',
            'fname_en' => '',
            'lname_en' => '',
            'status' => '',
        );

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $GLOBALS['ICON_API_URL'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($apiBody),
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_SSL_VERIFYHOST => 0,
        ));

        $responseJson = curl_exec($curl);
        $curlError = curl_errno($curl);

        curl_close($curl);

        $response = json_decode($responseJson);

        if ($curlError !== CURLE_OK || !property_exists($response, 'status') || $response->status !== 1) {
            respond(500, 'Internal Server Error (2)');
        }

        // Send an e-mail to the customer

        $mail = createEmail();
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject = 'Thank you for your interest : SMYTH\'S Ramintra';
        $mail->Body = '<center><img src="https://residential.singhaestate.co.th/privateestate/smyths/images/smyth_thnkyou_bn_rtr.jpg" style="width: 100%;max-width:500px;"/></center><br/>';
        if($mail->Send()) {
            //echo "Email send";
        } else {
            //echo $mail->ErrorInfo;
        }

        // Send an e-mail to staff


        $mail = createEmail();
        foreach ($GLOBALS['STAFF_EMAILS_RAM'] as $staffEmail) {
            $mail->addAddress($staffEmail);
        }
        foreach ($GLOBALS['DEV_EMAILS'] as $devEmail) {
            $mail->addBCC($devEmail);
        }
        //$mail->SMTPDebug  = 1;
        $mail->isHTML(true);
        $mail->Subject = 'เมลจาก droplead โครงการ Smyth Ramintra';
        $mail->Body = 'รายละเอียดตามด้านล่าง<br/><br/>'
            . "ชื่อลูกค้า: <b>$firstName $lastName</b><br/>"
            . "อีเมล: <b>$email</b><br/>"
            . "โทรศัพท์: <b>$phoneNumber</b><br/>"
            . 'งบประมาณ: <b>' . ($budget ?: '-') . '</b><br/>'
            . "อำเภอ: <b>$district</b><br/>"
            . "จังหวัด: <b>$province</b><br/>";
        if($mail->Send()) {
            //echo "Email send";
        } else {
            //echo $mail->ErrorInfo;
        }
    }

    if($locationOptions['1'] == 1 ) {

    //SMYTH’S KASET-NAWAMIN
        $apiBody = array(
            'identifier' => $email,
            'requestInformation' => $GLOBALS['RECEIPT_REQUEST_INFORMATION_KSM'],
            'purposes' => array(
                $consent01,
            ),
            'dsDataElements' => array(
                'FirstName' => $firstName,
                'LastName' => $lastName,
                'Mobile' => $phoneNumber,
                'Budget' => $budget,
                'Province' => $province,
                'District' => $district,
            ),
        );

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $GLOBALS['RECEIPT_API_URL'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($apiBody),
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_SSL_VERIFYHOST => 0,
        ));

        $responseJson = curl_exec($curl);
        $curlError = curl_errno($curl);

        curl_close($curl);

        $response = json_decode($responseJson);

        if ($curlError !== CURLE_OK || !property_exists($response, 'receipt')) {
            respond(500, 'Internal Server Error (3)');
        }

        // Icon API

        $apiBody = array(
            'username' => $GLOBALS['ICON_API_USERNAME'],
            'password' => $GLOBALS['ICON_API_PASSWORD'],
            'fname' => $firstName,
            'lname' => $lastName,
            'phone' => $phoneNumber,
            'email' => $email,
            'msg' => '',
            'address' => '',
            'houseNumber' => '',
            'villageNumber' => '',
            'village' => '',
            'alley' => '',
            'road' => '',
            'subDistrict' => '',
            'district' => $district,
            'province' => $province,
            'postalCode' => '',
            'budget' => $budget,
            'roomType' => '',
            'project' => $GLOBALS['ICON_PROJECT_NAME_KSM'],
            'source' => $GLOBALS['ICON_SOURCE'],
            'isJuristic' => '',
            'grade' => '',
            'fname_en' => '',
            'lname_en' => '',
            'status' => '',
        );

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $GLOBALS['ICON_API_URL'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($apiBody),
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_SSL_VERIFYHOST => 0,
        ));

        $responseJson = curl_exec($curl);
        $curlError = curl_errno($curl);

        curl_close($curl);

        $response = json_decode($responseJson);

        if ($curlError !== CURLE_OK || !property_exists($response, 'status') || $response->status !== 1) {
            respond(500, 'Internal Server Error (4)');
        }

        // Send an e-mail to the customer

        $mail = createEmail();
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject = 'Thank you for your interest : SMYTH\'S KASET-NAWAMIN';
        $mail->Body = '<center><img src="https://residential.singhaestate.co.th/privateestate/smyths/images/smyth_thnkyou_bn_ks.jpg" style="width: 100%;max-width:500px;"/></center><br/>';
        if($mail->Send()) {
            //echo "Email send";
        } else {
            //echo $mail->ErrorInfo;
        }

        // Send an e-mail to staff


        $mail = createEmail();
        foreach ($GLOBALS['STAFF_EMAILS_KSM'] as $staffEmail) {
            $mail->addAddress($staffEmail);
        }
        foreach ($GLOBALS['DEV_EMAILS'] as $devEmail) {
            $mail->addBCC($devEmail);
        }
        //$mail->SMTPDebug  = 1;
        $mail->isHTML(true);
        $mail->Subject = 'เมลจาก droplead โครงการ Smyth Kaset-Navamin';
        $mail->Body = 'รายละเอียดตามด้านล่าง<br/><br/>'
            . "ชื่อลูกค้า: <b>$firstName $lastName</b><br/>"
            . "อีเมล: <b>$email</b><br/>"
            . "โทรศัพท์: <b>$phoneNumber</b><br/>"
            . 'งบประมาณ: <b>' . ($budget ?: '-') . '</b><br/>'
            . "อำเภอ: <b>$district</b><br/>"
            . "จังหวัด: <b>$province</b><br/>";
        if($mail->Send()) {
            //echo "Email send";
        } else {
            //echo $mail->ErrorInfo;
        }
    }

    if($mail->Send()) {
        //respond(200, 'OK');
    } else {
        //echo "There was a problem sending the form.: " . $mail->ErrorInfo;
        //respond(200, 'OK');
    }
}
sendMail();
exit(0);