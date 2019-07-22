// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.
const cards = document.querySelector('.cards-container');

axios.get(`https://lambda-times-backend.herokuapp.com/articles`)
    .then(data => {
        // console.log(data);
        const articles = Object.keys(data.data.articles)
        // console.log(articles);
        articles.forEach(art => {
            // console.log(art, data.data.articles[art])
            data.data.articles[art].forEach(article => {
            cards.appendChild(createCard(article.headline, article.authorPhoto, article.authorName))})  
        })            
    })   
        .catch(error => {
            console.log("Something is broken", error);
    });

function createCard(headlineString, imageUrl, authorString) {
    // Create Elements
    const card = document.createElement('div');
    const headline = document.createElement('div');
    const author = document.createElement('div');
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    const span = document.createElement('span');

    // Create Structure
    card.appendChild(headline);
    card.appendChild(author);
    author.appendChild(imgContainer);
    imgContainer.appendChild(img);
    author.appendChild(span);

    // Add Classes
    card.classList.add('card');
    headline.classList.add('headline');
    author.classList.add('author');
    imgContainer.classList.add('img-container');

    // Add Text Content and Images
    headline.textContent = headlineString;
    img.src = `${imageUrl}`;
    span.textContent = `By ${authorString}`;

    // console.log(card);
    return card;
}