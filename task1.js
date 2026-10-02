async function loadUsers() {
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const usersContainer = document.getElementById("usersContainer");

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
            //"https://jsonplaceholder.typicode.com/userstest"رابط الخطا 
        );

        const users = await response.json();

        loading.classList.add("d-none");

        users.forEach(user => {
            usersContainer.innerHTML += `
                <div class="col-md-4 mb-3">
                    <div class="card p-3">
                        <h5>${user.name}</h5>
                        <p>Email: ${user.email}</p>
                        <p>City: ${user.address.city}</p>
                        <p>Company: ${user.company.name}</p>
                    </div>
                </div>
            `;
        });

    } catch (err) {
        loading.classList.add("d-none");
        error.classList.remove("d-none");
    }
}

loadUsers();
