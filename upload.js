const newFileName = ''
document.getElementById('uploadButton').addEventListener('click', function() {
  const fileInput = document.getElementById('fileInput');
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const uuid = crypto.randomUUID();
    newFileName = `${uuid}.png`;

    uploadToGitHub(file, newFileName);
  }
});

function uploadToGitHub(file, fileName) {
  const reader = new FileReader();
  reader.onload = function() {
    const content = reader.result.split(',')[1];
    fetch('https://api.github.com/repos/preston-k/cdn/contents/' + fileName, {
      method: 'PUT',
      headers: {
        'Authorization': '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',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `uploading ${fileName}`,
        content: content
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('File uploaded successfully! You can access it at cdn.prestonkwei.com/'+newFileName);
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred!');
    });
  };
  reader.readAsDataURL(file);
}
