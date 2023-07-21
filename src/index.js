document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/ramens")
      .then(response => response.json())
      .then(ramens => {
        const ramenMenu = document.querySelector("#ramen-menu");
        ramens.forEach(ramen => {
          const img = document.createElement('img');
          img.src = ramen.image;
          img.dataset.id = ramen.id;
          ramenMenu.appendChild(img);
        });
      });
  });

  document.querySelector("#ramen-menu").addEventListener('click', event => {
    if (event.target.tagName === 'IMG') {
      fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`)
        .then(response => response.json())
        .then(ramen => {
          const ramenDetail = document.querySelector("#ramen-detail");
          ramenDetail.querySelector('.detail-image').src = ramen.image;
          ramenDetail.querySelector('.name').textContent = ramen.name;
          ramenDetail.querySelector('.restaurant').textContent = ramen.restaurant;
          document.querySelector('#rating-display').textContent = ramen.rating;
          document.querySelector('#comment-display').textContent = ramen.comment;
        });
    }
  });

  document.querySelector("#new-ramen").addEventListener('submit', event => {
    event.preventDefault();
    
    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target.new-comment.value
    };
    
    const img = document.createElement('img');
    img.src = newRamen.image;
    document.querySelector("#ramen-menu").appendChild(img);
    
    event.target.reset();
  });