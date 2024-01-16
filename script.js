function sendTextMessage(mobileNumber, selectedOption) {
    var data = {
        mobileNumber: mobileNumber,
        message: selectedOption
    };

    fetch('http://localhost:3000/sendTextMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Text message sent successfully:', data);
    })
    .catch((error) => {
        console.error('Error sending text message:', error);
    });
}

function submitForm() {
    var fullName = document.getElementById('fullName').value;
    var mobileNumber = document.getElementById('mobileNumber').value;
    var address = document.getElementById('address').value;

    console.log('Submitting form with data:', { fullName, mobileNumber, address });

    var data = {
        fullName: fullName,
        mobileNumber: mobileNumber,
        address: address
    };

    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Successfully submitted the information.');
        document.getElementById('options').style.display = 'block';

        // Get the selected option using radio buttons
        var selectedOptionElement = document.querySelector('input[name="options"]:checked');

        if (selectedOptionElement) {
            var selectedOption = selectedOptionElement.value;
            var selectedTextMessage = getSelectedOptionText(selectedOption);
            console.log('Selected Option:', selectedOption);

            sendTextMessage(mobileNumber, selectedTextMessage);
        } else {
            console.error('No option selected');
            // Handle the case where no option is selected
        }

    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error submitting the form. Please try again.');
    });
}

function getSelectedOptionText(selectedOption) {
    switch (selectedOption) {
        case 'option1':
            return 'Scanning QR Code...';
        case 'option2':
            return 'Generating QR Code...';
        case 'option3':
            return 'Welcome...';
        case 'option4':
            return 'Hello...';
        case 'option5':
            return 'Good Morning...';
        default:
            return '';
    }
}
