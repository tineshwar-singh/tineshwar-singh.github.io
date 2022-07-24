//github repo api
const BASE_URL = `https://api.github.com/users/tineshwar-singh/repos`;

fetch(BASE_URL).then((data) => {
    data.json().then((portfolio_data) => {
        console.log(portfolio_data);

        let output = [];

            portfolio_data.forEach( repo => {
                if(repo.has_pages) { 

                    let projectUpdatedDate = new Date(repo.updated_at);
                    let currentDate = new Date();
                    let aDay = 24*60*60*1000;
                    const AGO_DATE = (currentDate, projectUpdatedDate) =>{
                        let difference = currentDate.getTime() - projectUpdatedDate.getTime();
                        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                        return TotalDays;
                    }

                    const no_days = new Date(Date.now()-aDay*AGO_DATE(currentDate, projectUpdatedDate));

                    output +=`
                    <div class="project_content grid swiper-slide">
                        <img src="https://raw.githubusercontent.com/tineshwar-singh/${repo.name}/main/project-img/${repo.name}.PNG" alt="${repo.name}" class="project_img">
                        <div class="project_data">
                            <div class="project_details">
                                <h3 class="project_title">${repo.name.replace(/-/g,' ')}</h3>
                                <p class="project_description">${repo.description}</p>
                                <p class="project_date">Last Updated : ${timeSince(no_days)}</p>
                            </div>
                            <div class="project_buttons-section">
                                <a href="https://tineshwar-singh.github.io/${repo.name}" target="_blank" class="button button-flex button-small project_button">
                                    View 
                                    <i class="uil uil-arrow-right button_right_icon"></i>
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


// <a href="${repo.html_url}" target="_blank" class="button button-flex button-small project_button"> 
//     <i class="uil uil-arrow-left button_left_icon"></i>
//     Source Code 
// </a>


function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

