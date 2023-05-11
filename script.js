window.onload = () => {
  const btn = document.getElementById('continue');
  btn.addEventListener('click', validateCreditCard2);

  function validateCreditCard2() {
    // Get credit card details from the form
    const cardNumber = document.getElementById("cardNumber").value;
    const expMonth = document.getElementById("expMonth").value;
    const expYear = document.getElementById("expYear").value;
    const cvvCode = document.getElementById("cvvCode").value;

    // Last 4 digits of Card Number appear in the success page
    const last_four = cardNumber.substr(-4);
    localStorage.setItem("storageName",last_four);
    
    // Regular expressions for validation for card number and cvv
    const cardNumberRegex = /^(5[1-5]\d{14})$/; // Starts with 51-55, total 16 digits
    const cvvCodeRegex = /^\d{3,4}$/; // Three or four digits

    // function to check if expiry date is in the past
    function isExpired(expMonth, expYear) {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      return (expYear < currentYear) || (expYear == currentYear && expMonth < currentMonth);
    }

    // check credit card number, expiry date, and CVV code using regular expressions
    if (!cardNumberRegex.test(cardNumber)) {
      alert("Please enter a valid Mastercard number.");
    } else if (isExpired(expMonth, expYear)) {
      alert("Please check the expiry date on your credit card and try again.");
    } else if (!cvvCodeRegex.test(cvvCode)) {
      alert("Please enter a valid CVV code.");
    } else {
      // if all checks pass, send a POST request to the server with credit card details
      // Send POST (adds new data) request to the server

      const data = {
        "master_card": cardNumber,
        "exp_month": expMonth,
        "exp_year": expYear,
        "cvv_code": cvvCode
      };

      let url = "http://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";
    
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      .then((response) => {
        if(response.status === 201) {
          return response.json();
        }
        else if(response.status === 400) {
          throw "Wrong data was sent to the server";
        }
        else if(response.status === 200) {

        }
      })

      .then((resJson) => {

        // let message = resJson["message"];
        // alert(message);

        const message_confirmation = {
          "message" : "Thank you for your payment."
        }

        alert(message_confirmation["message"]);

        window.location.href = 'success.html';
      })
      .catch((error) => {
        alert(error);
      })
    }
  }
}