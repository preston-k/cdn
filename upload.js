document.getElementById('uploadButton').addEventListener('click', function() {
  let myToken = prompt("Please enter your password:");
  const fileInput = document.getElementById('fileInput');
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const uuid = crypto.randomUUID();
    let newFileName = `${uuid}.png`;

    uploadToGitHub(file, newFileName, myToken);
  }
});

function uploadToGitHub(file, fileName, token) {
  const reader = new FileReader();
  reader.onload = function() {
    const content = reader.result.split(',')[1];
    fetch('https://api.github.com/repos/preston-k/cdn/contents/' + fileName, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `uploading ${fileName}`,
        content: content
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Not Found') {
        alert('File not found. Make sure your repository exists and the token is correct.');
      } else {
        console.log('Success:', data);
        alert('File uploaded successfully! You can access it at cdn.prestonkwei.com/'+ fileName);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred!');
    });
  };
  reader.readAsDataURL(file);
}
