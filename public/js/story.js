const returnButtHandler = async (event) => {
    event.preventDefault();

    document.location.replace('/homepage');
};


document
.querySelector('#fav-butt')
.addEventListener('click', returnButtHandler);