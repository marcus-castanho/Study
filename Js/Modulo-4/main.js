
axios.get('https://api.github.com/users/marcus-castanho')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.warn(error);
    })