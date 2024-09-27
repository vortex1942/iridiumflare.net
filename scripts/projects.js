function processRequest() {
    const xhrObject = new XMLHttpRequest();

    xhrObject.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        processResponse(this.responseXML);
      }
    }
    xhrObject.open("get", "../xml/projects.xml", true);

    xhrObject.send();
}

function processResponse(xmlTree) {
    document.getElementById('projects').innerHTML = '';
    var projects = xmlTree.getElementsByTagName("project");

    for (let i = 0; i < projects.length; i++) {
        let project = projects[i];
        
        const status = project.getAttribute("status");
        const title = project.getElementsByTagName('title')[0].childNodes[0].nodeValue;
        const description = project.getElementsByTagName('description')[0].childNodes[0].nodeValue;
        const image = project.getElementsByTagName('image')[0].childNodes[0].nodeValue;
        const url = project.getElementsByTagName('url')[0].childNodes[0].nodeValue;
        const categories = project.getElementsByTagName('categories')[0].children;
        const pinned = project.getAttribute("pinned");

        var processed_categories = "";
        for (let j = 0; j < categories.length; j++) {
          var category = categories[j].getAttribute("category");

          const colors = {
            "Horology": "red",
            "Programming": "green",
            "Networking": "orange",
            "Design": "purple",
            "Misc": "gray",
            "Security": "blue"
          }
          processed_categories += `<p class='category ${colors[category]}'>${category}</p>`;
        }

        var processed_status = "";
        if (status == "Ongoing") {
            processed_status = "<div class='status-bar pastel-orange'>" + status + "</div>";
        } else if (status == "Finished") {
            processed_status = "<div class='status-bar pastel-green'>" + status + "</div>";
        };

        let header = `
        <header>
            <h2>${title}</h2>
        </header>
        `;

        if (pinned == "true") {
          header = `
          <header>
            <i class="pin fa-solid fa-thumbtack"></i>    
            <h2>${title}</h2>
          </header>
        `
        };


        let card = `
        <article class="card">
            ${header}

            <img src="${image}" alt="Project image" />
            ${processed_status}

            <div class="content">
                <p class="p-content">${description}</p>
            </div>

            <div class="content">
                ${processed_categories}
            </div>

            <a href="${url}">
                <footer>
                    See More
                </footer>
            </a>
        </article>
      `;

      // Insert the card into the DOM
      if (pinned == "true") {
        document.getElementById('projects').innerHTML = card + document.getElementById('projects').innerHTML;
      } else {
      document.getElementById('projects').innerHTML += card;
      }
    }
}