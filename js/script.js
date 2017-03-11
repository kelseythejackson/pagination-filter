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

// Iterate over the the each student in studentList
for (let i = 0; i < studentListItems.length; i++) {
    // assigns a 'page number' to the the numberOfPages variable
    numberOfPages = Math.floor(i / 10) + 1;
    let page = 'page-';

    // appends the page & number of pages variables to each student's li class
    studentListItems[i].classList.add(page + numberOfPages.toString());
}


// This adds the class 'pagination' to the pagination div
pagination.classList.add('pagination');


// this for loop iterates over the numberOfPages variable (6)
// it constructs the the list item then adds it to the paginationList variable
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

// These two lines append the paginationList to the pagination div
// then the pagination div to the page div
pagination.appendChild(paginationList);
page.appendChild(pagination);

// selects all the links in the pagination div
let links = document.querySelectorAll('ul li a');
// iterates over the links and adds an event listener to them
// the links will add the hide class to the, unless it corresponds to the link that is clicked
for(let k = 0; k < links.length; k++) {
    links[k].addEventListener('click', () => {
        for(student of studentListItems) {
            student.classList.add('hide');
            if(student.classList.contains('page-' + links[k].innerText)) {
                student.classList.remove('hide');
            }
        }
        // selects the link with the active class
        let lastPage = document.querySelector('.pagination ul li a.active');
        // remove the active class from the link
        lastPage.classList.remove('active');
        // add the 'active' class to the link that was clicked
        links[k].classList.add('active');
    }, false);
}

// starts the search functionality
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
    // creates the unordered list to house the results of the search
    const results = document.createElement('ul');
    results.classList.add('results');
    console.log(results);
    let listItem = '';
    // iterates over the students and builds new list items to add to the results list
    for(student of studentListItems) {
        if(student.children[0].children[1].innerText.includes(searchInput.value)) {

            listItem += `<li class="student-item cf"><div class="student-details"><img class="avatar" src="${student.children[0].children[0].src}"><h3>${student.children[0].children[1].innerText}</h3><span class="email">${student.children[0].children[2].innerText}</span></div><div class="joined-details"><span class="date">${student.children[1].children[0].innerText}</span></div></li>`;
            // console.log(listItem);
            console.log(student.children[0].children[1].innerText);
            console.log(listItem.length);

        }

    }


    // checks to see if there is anything in the listItem variable
    if(listItem.length > 0) {
        // if there is, append the list item to the results list
        // remove the current student list and the pagination
        // append the results list to the page
        results.innerHTML = listItem;
        page.removeChild(studentList);
        page.removeChild(pagination);
        page.appendChild(results);
        clearSearch();
    } else  {
        // if it isn't, display the 'results not found' message
        page.removeChild(studentList);
        page.removeChild(pagination);
        page.appendChild(noResults);
        console.log('Nothing Jack!');
        clearSearch();
    }



};

// This function clears the search and reload the orginal list of students
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



// call the getResults function when the search button is clicked
searchButton.addEventListener('click', getResults);
// call the getResults function when the user hits the 'enter' key
searchInput.addEventListener('keypress', (e) => {
   let key = e.which || e.keyCode;
   if(key === 13) {
       getResults();

   }

});



// removes the disabled attribute and class of the search button
searchInput.addEventListener('focus', ()=> {
   searchButton.disabled = false;
   searchButton.classList.remove('disabled');
});

// adds the disabled attribute and class of the search button
searchInput.addEventListener('blur', ()=> {
    if(searchInput.value === '') {
        searchButton.disabled = true;
        searchButton.classList.add('disabled');
    }

});




// starts the page with the first 10 students
window.onload = links[0].click();










