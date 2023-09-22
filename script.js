const postsPerPage = 18;
        
        let currentPage = 1;

        async function getNews() {
            const apiKey = '02a61449202f49289326c4b776288439'; 

            try {
                const response = await fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`);
                const data = await response.json();

                if (data.articles) {
                   
                    const articles = data.articles;

                    
                    const newsContainer = document.getElementById('news-container');

                    
                    const totalPages = Math.ceil(articles.length / postsPerPage);

                    const pagination = document.getElementById('pagination');

                    
                    for (let i = 1; i <= totalPages; i++) {
                        const pageButton = document.createElement('span');
                        pageButton.className = 'page-button';
                        pageButton.textContent = i;
                        pageButton.addEventListener('click', () => {
                            currentPage = i;
                            renderNews(articles);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        });
                        pagination.appendChild(pageButton);
                    }

                    renderNews(articles);
                } else {
                    console.log('No articles found.');
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }

        
        function renderNews(articles) {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const newsToShow = articles.slice(startIndex, endIndex);

            
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = '';

            newsToShow.forEach(article => {
            const cardItem = document.createElement('div');
            cardItem.className = 'card-item';

            const image = document.createElement('img');
            image.style.width = '500px';
            image.style.height = '175px';

            image.src = article.urlToImage || 'cricket.jpg';

                    
            image.onerror = function() {
            image.src = 'cricket.jpg';
            };

            const authorTimestamp = document.createElement('p');
            authorTimestamp.className = 'author-timestamp';

            const author = document.createElement('span');
            author.className = 'author';
            author.textContent = `Author: ${article.author || 'Unknown'}`;

                    
            const dateAndTime = document.createElement('span');
            dateAndTime.className = 'date-time';
            dateAndTime.textContent = new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });

            authorTimestamp.appendChild(author);
            authorTimestamp.appendChild(dateAndTime);

            const lines = document.createElement('div');
            lines.className = 'lines';

            const title = document.createElement('p');
            title.className = 'title';

            const words = article.title.split(' ');
            title.textContent = words.slice(0, 6).join(' ');

            const description = document.createElement('p');
            description.className = 'description';
            description.textContent = article.description;

            const link = document.createElement('a');
            link.href = 'https://www.google.com/';
            link.className = 'text-center';
            link.textContent = 'Read More';

            lines.appendChild(authorTimestamp);
            lines.appendChild(title);
            lines.appendChild(description);
            lines.appendChild(link);

            cardItem.appendChild(image);
            cardItem.appendChild(lines);

            newsContainer.appendChild(cardItem);
            });
                const paginationButtons = document.querySelectorAll('.page-button');
                paginationButtons.forEach((button, index) => {
                if (index + 1 === currentPage) {
                button.classList.add('active-page');
                } else {
                button.classList.remove('active-page');
                }
                });
            }

            getNews();