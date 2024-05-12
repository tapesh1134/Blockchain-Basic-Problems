function lookup() {
    // Get the user's address from the input field
    const address = document.getElementById("address").value;
    const c_address = document.getElementById("c_address").value;

    // Make an API request to BSCscan to get the user's token balances
    const apiKey = "CZ68G1688TJ8G6WE7Q8881SXKHQFTMYNEQ";
    const apiUrl = `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${c_address}&address=${address}&tag=latest&apikey=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Clear any existing token list
            const tokenList = document.getElementById("t_list");
            tokenList.innerHTML = `<tr>
  <td>${c_address}</td>
  <td>${address}</td>
  <td>${data.result / 10 ** 18}</td>
</tr>`;
        });
}