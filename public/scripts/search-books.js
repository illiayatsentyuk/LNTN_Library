    const searchButton = document.querySelector('#button-search');
    const listItems = document.querySelector('.list-books');
    const searchInput = document.querySelector('#search-input');

    let books=[
        {
            name:'Harry Potter',
            available:true,
            description:'Great book',
            id: (Math.random() * 100000).toString(),
        },
        {
            name:'Dzein Eir',
            available:true,
            description: 'Bad book',
            id: (Math.random() * 100000).toString(),
        },
        {
            name:'Kobzar',
            available:true,
            description: 'Interesting book',
            id: (Math.random() * 100000).toString(),
        },
        {
            name:'History',
            available:true,
            description: 'history book',
            id: (Math.random() * 100000).toString(),
        },
        {
            name:'Chornobyl',
            available:true,
            description: '1986 year book',
            id: (Math.random() * 100000).toString(),
        }
    ]
    function updateList(content) {
        listItems.innerHTML = content; 
    }
    function converter() {
    const textInput = document.getElementById("search-input").value.trim().toLowerCase();
    const foundBook = books.filter(book => book.name.toLowerCase().includes(textInput));

    if (foundBook) {
        const booksHTML = foundBook.map(book => `
            <li class="list-item">
                <div class="div-in-item">
                    <img src="" alt="" class="img-book">
                    <h3 class="name-book">${book.name}</h3>
                    <p class="description-book">${book.description}</p>
                </div>
            </li>
        `).join('');
        updateList(booksHTML);
    }else if(textInput==='' || textInput===' '){
      const allList=`
                    <li class="list-item" id="harry-potter">
                        <div class="div-in-item">
                            <img src="" alt="" class="img-book">
                            <h3 class="name-book">Harry Potter</h3>
                            <p class="description-book">greate book</p>
                        </div>
                    </li>
                    <li class="list-item" id="dzheyn-eir">
                        <div class="div-in-item">
                            <img src="" alt="" class="img-book">
                            <h3 class="name-book">Dzheyn Eir</h3>
                            <p class="description-book">Wondeful book</p>
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="div-in-item">
                            <img src="" alt="" class="img-book">
                            <h3 class="name-book">Kobzar</h3>
                            <p class="description-book">greate book</p>
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="div-in-item">
                            <img src="" alt="" class="img-book">
                            <h3 class="name-book">history</h3>
                            <p class="description-book">greate book</p>
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="div-in-item">
                            <img src="" alt="" class="img-book">
                            <h3 class="name-book">chornobyl</h3>
                            <p class="description-book">greate book</p>
                        </div>
                    </li>
      `
      updateList(allList);
    }else if(foundByP){
        const foundByP=books.filter(book=>book.description.toLowerCase().includes(textInput));
        const booksHTMLbyP = foundByP.map(book => `
            <li class="list-item">
                <div class="div-in-item">
                    <img src="" alt="" class="img-book">
                    <h3 class="name-book">${book.name}</h3>
                    <p class="description-book">${book.description}</p>
                </div>
            </li>
        `).join('');
        updateList(booksHTMLbyP);
    }
    else {
        updateList('<p>Книгу не знайдено</p>');
    }
}

    searchButton.addEventListener("click", converter);
    searchInput.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
            converter();
        }
    });