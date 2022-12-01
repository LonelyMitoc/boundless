const returnButtHandler = async (event) => {
    event.preventDefault();

    document.location.replace('/');
};


document
.querySelector('#return')
.addEventListener('click', returnButtHandler);