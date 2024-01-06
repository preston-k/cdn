document.getElementById('uploadButton').addEventListener('click', function() {
    let password = document.getElementById('passwordInput').value;
    if (password === 'YOUR_PASSWORD') {  // Replace YOUR_PASSWORD with your actual password
        document.getElementById('fileInput').click();
    } else {
        alert('Incorrect password!');
    }
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function() {
        let content = btoa(reader.result);
        let fileName = generateRandomString(10) + '.' + file.name.split('.').pop();
        uploadToGitHub(fileName, content);
    };
    reader.readAsBinaryString(file);
});

function generateRandomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function uploadToGitHub(fileName, content) {
    let repo = 'cdn';
    let username = 'preston-k';
    let path = 'files/' + fileName;
    let message = 'Upload file ' + fileName;
    let apiURL = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;

    let data = {
        message: message,
        content: content
    };

    fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Authorization': 'token YOUR_GITHUB_TOKEN',  // Replace YOUR_GITHUB_TOKEN with your actual GitHub token
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
        console.log('File uploaded successfully:', data.content.download_url);
    }).catch(error => console.error('Error:', error));
}
