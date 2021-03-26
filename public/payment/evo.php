<?php 

function getDataEvoPayment($amount){
    $postFields = "apiOperation=CREATE_CHECKOUT_SESSION&apiPassword=4543096394cdf0b0adb29cf2b02e1926&apiUsername=merchant.TEST1140019&merchant=TEST1140019&order.currency=MXN&order.id=".$amount."&interaction.operation=PURCHASE";

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://evopaymentsmexico.gateway.mastercard.com/api/nvp/version/57",
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30000,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $postFields,
            CURLOPT_HTTPHEADER => array(
                "cache-control: no-cache",
                "content-type: application/x-www-form-urlencoded"
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);
        
        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            return  $response;
        }
}