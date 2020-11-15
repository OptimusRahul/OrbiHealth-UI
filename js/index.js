const defaultObj = {
    title: 'Deep dive: How do React hooks really',
    author: 'swyx',
    source: 'netlify.com',
    text: 'Hooks are fundamentally simpler way to encapsulate stateful behaviour and side effects',
    tags: ['react', 'react16', 'functional-programming', 'functional-js'],
    link: ''
};

const filterTags = [
    'All', 'react', 'react16',
    'functional-programming', 'react-hook', 'javascript',
    'functional-js', 'golang', 'concurrency', 'parallelism', 'programming'
];

const pagination = 5;

function constructDefaultData(n = 1) {
    var defaultData = [];
    for(var i=0; i<n; i++) {
        defaultData.push(defaultObj);
    }

    return defaultData;
}

function addFilterTags() {
    const fragment = document.createDocumentFragment();

    filterTags.forEach((item, index) => {
        let input = document.createElement('div');
        input.className = "filter__radio--div";
        input.innerHTML = `
            <input type="radio" name="radio" class="filter__radio" id="radio-${index}" />
            <label class="filter__radio--text" for="radio-${index}">${item}</label>
        `;

        fragment.appendChild(input);
    });

    document.getElementById("filter").innerHTML = '';
    document.getElementById("filter").appendChild(fragment);
    document.getElementById("radio-0").setAttribute("checked", "checked")
}

function createCard() {
    var currentScreenWidth = window.screen.availWidth;
    let data;
    if(currentScreenWidth < 1024) {
        data = constructDefaultData(3);
    } else {
        data = constructDefaultData(6);
    }
    const fragment = document.createDocumentFragment();
    data.map((item, index) => {
        const div = document.createElement('div');
        div.className = "main__content--card--box"
        div.innerHTML = `
            <div class="main__content--card--box" id="main__content--card--box">
                <div class="main__content--card--box--block">
                </div>
                <div class="main__content--card--box--text" = constructDefaultData(6);>
                    <h3>${index+1}. ${item.title}</h3>
                    <span>Author: ${item.author} || Source: ${item.source}</span>
                    <h4>${item.text}</h4>
                    <span> Tags: ${item.tags.map((tag) => (
                        `${tag}`
                    ))}
                    </span>
                    <button class="card__content--btn">Read Now</button>
                </div>
            </div> `;
        fragment.appendChild(div);
    });
    document.getElementById("main__content--card").appendChild(fragment);
}

function createPaginationIndex() {
    const fragment = document.createDocumentFragment();
    let activeIndex = 1, active = false;
    for(var i=0; i<pagination; i++) {
        const btn = document.createElement('button');
        btn.className = "main__content--pagination--index";
        btn.id = `btn-${i}`
        btn.innerText = (i+1);
        fragment.appendChild(btn);
    }

    document.getElementById("main__content--pagination--index").appendChild(fragment);
    document.getElementById("main__content--pagination--index").children[0].className = "main__content--pagination--index active"
    for(var i=0; i<pagination; i++) {
        document.getElementById(`btn-${i}`).addEventListener("click", function(id) {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}

function loadMoreData() {
    const data = constructDefaultData(3);
    const fragment = document.createDocumentFragment();
    const previousIndex = document.getElementById("main__content--card").childElementCount;
    const maxIndex = 9;

    
    if(previousIndex < maxIndex) {
        document.getElementById("loadBtn").innerText = 'Loading...'
        data.map((item, index) => {
            const div = document.createElement('div');
            div.className = "main__content--card--box"
            div.innerHTML = `
                <div class="main__content--card--box" id="main__content--card--box">
                    <div class="main__content--card--box--block">
                    </div>
                    <div class="main__content--card--box--text" = constructDefaultData(6);>
                        <h3>${previousIndex+index+1}. ${item.title}</h3>
                        <span>Author: ${item.author} || Source: ${item.source}</span>
                        <h4>${item.text}</h4>
                        <span> Tags: ${item.tags.map((tag) => (
                            `${tag}`
                        ))}
                        </span>
                        <button class="card__content--btn">Read Now</button>
                    </div>
                </div> `;
            fragment.appendChild(div);
        });

        setTimeout(() => {
            document.getElementById("main__content--card").appendChild(fragment);
            document.getElementById("loadBtn").innerText = 'Load More'
        }, 2000);
    } else {
        window.alert("Nothing to load");
        document.getElementById("loadBtn").style = "disabled"
        document.getElementById("loadBtn").innerText = 'Nothing To Load'
    }
}

addFilterTags();
createCard();
createPaginationIndex();