const page = document.querySelector('.page'),
    studentList = document.querySelector('.student-list'),
    studentListItems = studentList.children,
    pageHeader = document.querySelector('.page-header');
let numberOfPages = 0,
    pagination = document.createElement('div'),
    paginationList = document.createElement('ul'),
    searchDiv = document.createElement('div'),
    searchInput = document.createElement('input'),
    searchButton = document.createElement('button'),
    noResults = document.createElement('div');

for (let i = 0; i < studentListItems.length; i++) {
    numberOfPages = Math.floor(i / 10) + 1;
    let page = 'page-';
    studentListItems[i].classList.add(page + numberOfPages.toString());
}



pagination.classList.add('pagination');

for (let x = 1; x <= numberOfPages; x++) {
    let paginationListItem = document.createElement('li'),
        link = document.createElement('a');

    link.href = '#';
    link.innerText = x;
    if(x === 1) {
        link.classList.add('active');
    }
    paginationListItem.appendChild(link);
    paginationList.appendChild(paginationListItem);
}

pagination.appendChild(paginationList);
page.appendChild(pagination);

let links = document.querySelectorAll('ul li a');
for(let k = 0; k < links.length; k++) {
    links[k].addEventListener('click', () => {
        for(student of studentListItems) {
            student.classList.add('hide');
            if(student.classList.contains('page-' + links[k].innerText)) {
                student.classList.remove('hide');
            }
        }

        let lastPage = document.querySelector('.pagination ul li a.active');
        lastPage.classList.remove('active');
        links[k].classList.add('active');
    }, false);
}


searchDiv.classList.add('student-search');
searchInput.placeholder = 'Search for students...';
searchButton.innerText = 'Search';
searchButton.type = 'submit';
searchButton.disabled = true;
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
pageHeader.appendChild(searchDiv);
noResults.classList.add('no-results');
noResults.innerText = 'Sorry, no results...';


const getResults = () => {
    const results = document.createElement('ul');
    results.classList.add('results');
    console.log(results);
    let listItem = '';
    for(student of studentListItems) {
        if(student.children[0].children[1].innerText.includes(searchInput.value)) {

            listItem += `<li class="student-item cf"><div class="student-details"><img class="avatar" src="${student.children[0].children[0].src}"><h3>${student.children[0].children[1].innerText}</h3><span class="email">${student.children[0].children[2].innerText}</span></div><div class="joined-details"><span class="date">${student.children[1].children[0].innerText}</span></div></li>`;
            // console.log(listItem);
            console.log(student.children[0].children[1].innerText);
            console.log(listItem.length);

        }

    }


    if(listItem.length > 0) {
        results.innerHTML = listItem;
        page.removeChild(studentList);
        page.removeChild(pagination);
        page.appendChild(results);
        clearSearch();
    } else  {
        page.removeChild(studentList);
        page.removeChild(pagination);
        page.appendChild(noResults);
        console.log('Nothing Jack!');
    }



};

const clearSearch = () => {
  const clear = document.createElement('span'),
      results = document.querySelector('.results');
  clear.classList.add('clear-search');
  clear.innerText = 'Clear Search X';
  searchDiv.appendChild(clear);

  clear.addEventListener('click', ()=> {
      // searchDiv.removeChild(clear);
      // page.removeChild(results);
      location.reload();

    });

};


searchButton.addEventListener('click', getResults);

searchInput.addEventListener('keypress', (e) => {
   let key = e.which || e.keyCode;
   if(key === 13) {
       getResults();

   }

});




searchInput.addEventListener('focus', ()=> {
   searchButton.disabled = false;
   searchButton.classList.remove('disabled');
});

searchInput.addEventListener('blur', ()=> {
    if(searchInput.value === '') {
        searchButton.disabled = true;
        searchButton.classList.add('disabled');
    }

});





window.onload = links[0].click();










