//github repo api
const BASE_URL = `https://api.github.com/users/tineshwar-singh/repos`;

fetch(BASE_URL).then((data) => {
    data.json().then((portfolio_data) => {
        console.log(portfolio_data);

        let output = [];

            portfolio_data.forEach( repo => {
                if(repo.has_pages) {output += `
                    <div class="project_content grid swiper-slide">
                        <img src="https://raw.githubusercontent.com/tineshwar-singh/${repo.name}/main/project-img/${repo.name}.PNG" alt="${repo.name}" class="project_img">
                        <div class="project_data">
                            <h3 class="project_title">${repo.name.replace(/-/g,' ')}</h3>
                            <p class="project_description">${repo.description}</p>
                            <div class="project_buttons-section">
                                <a href="https://tineshwar-singh.github.io/${repo.name}" target="_blank" class="button button-flex button-small project_button">
                                    View 
                                    <i class="uil uil-arrow-right button_right_icon"></i>
                                </a>
                                <a href="${repo.html_url}" target="_blank" class="button button-flex button-small project_button"> 
                                    <i class="uil uil-arrow-left button_left_icon"></i>
                                    Source Code
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }
            });
            console.log(portfolio_data);
        document.querySelector('.github-repo').innerHTML = output;
    });
});
