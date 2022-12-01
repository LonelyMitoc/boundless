const returnButtHandler = async (event) => {
    event.preventDefault();

    document.location.replace('/homepage');
};


document
.querySelector('#return')
.addEventListener('click', returnButtHandler);