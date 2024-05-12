fetch('https://jsonplaceholder.typicode.com/users').then((data) => {
  return data.json();
}).then((objectData) => {
  console.log(objectData[0].title);
  let tableData = "";
  objectData.map((values) => {
    tableData += `<tr>
    
    <td>${values.id}</td>
    <td>${values.name}</td>
    <td>${values.username}</td>
    <td>${values.email}</td>
    <td>${Object.values(values.address).slice(0, -2).join(",  ")}</td>
    <td>${values.phone}</td>
    <td>${values.website}</td>
    <td>${Object.values(values.company).join(",  ")}</td>
   </tr>
    `;
  });
  document.getElementById("table_body").innerHTML = tableData;
}).catch((Err)=>{
  console.log(err);
})
