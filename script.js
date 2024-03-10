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
  let ts = new Date().toString();
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
        message: `Uploaded ${fileName} at ${ts}`,
        content: content
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Not Found') {
        alert('File not found. Make sure your repository exists and the token is correct.');
      } else {
        console.log('Success:', data);
        navigator.clipboard.writeText('https://cdn.prestonkwei.com/' + fileName)
        alert('File uploaded successfully! You can access it at cdn.prestonkwei.com/'+ fileName + '\n \n Files should take 1-2 minutes to propagate everywhere. Please be patient!');
        
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred!');
    });
  };
  reader.readAsDataURL(file);
}