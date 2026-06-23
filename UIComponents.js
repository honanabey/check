export const Logo = () => `
    <header class="header">
        <div class="brand">
            <div class="brandText">
                Корпус текстов<br>
                уральского рока
            </div>

            <img
                src="UrFULogo_U.png"
                alt="логотип урфу"
                class="logo"
            >
        </div>
    </header>
`;

export const Header = () => `
    <aside class="sidebarNav">
        <nav class="nav">

            <a href="#clouds">
                Облака слов
            </a>

            <a href="#lexicText">
                Лексические особенности
            </a>

            <div class="groupNav">

                <div class="groupTrigger" id="groupButton">
                    <span>Группы</span>
                    <span class="arrow">▼</span>
                </div>

                <div class="groupMenu">

                    <div
                        class="groupOption"
                        data-group="смысловые-галлюцинации"
                    >
                        Смысловые галлюцинации
                    </div>

                    <div
                        class="groupOption"
                        data-group="чичерина"
                    >
                        Чичерина
                    </div>

                </div>
            </div>

            <a href="#about">
                О проекте
            </a>

        </nav>
    </aside>
`;

export const CorpusSearch = () => `
    <section class="corpusSearch" id="corpus">
        <div class="searchLine">
            <input id="lemmaInput" type="text" placeholder="Введите лемму...">
        </div>
        <div class="searchLine">
            <button id="filtersToggle" class="orangeBtn">Фильтры <span>▼</span></button>
            <button id="findBtn" class="orangeBtn">Найти</button>
        </div>

        <p class="miniHelp">
            Для поиска определенного слова в текстах уральского рока установите необходимые фильтры, находящиеся под поисковой строкой.
        </p>

        <div id="filtersPanel" class="filtersPanel hidden">
            <label>Группа
                <select id="bandFilter">
                    <option value="all">Все группы</option>
                </select>
            </label>

            <label>Часть речи
                <select id="posFilter">
                    <option value="all">Любая</option>
                </select>
            </label>
            
            <label>Признак
                <select id="signsFilter" disabled>
                    <option value="all">Любые</option>
                </select>
            </label>
        </div>

        <div id="activeFilters" class="activeFilters"></div>
        <div id="results" class="resultsText"></div>
    </section>
`;

export const BandCard = (band, showHistory = false, showLexic = false) => `
    <article class="bandCard">
        <img src="${band.picture}" alt="картинка группы" class="bandPhoto">
        <div class="bandInfo">
            <h3>${band.name}</h3>
            <p>${showHistory ? (showLexic ? band.lexic : band.history) : (showLexic ? band.lexic : band.history)}</p>
        </div>
    </article>
`;

export const BandCardAll = (band) => `
    <article class="bandCard">
        <img src="${band.picture}" alt="картинка группы" class="bandPhoto">
        <div class="bandInfo">
            <h3>${band.name}</h3>
            <div>
                <p>${band.description}</p>
            </div>
            <h4>История</h4>
            <div>
                <p>${band.history}</p>
            </div>
            <h4>Лексические особенности</h4>
            <div>
                <p>${band.lexic}</p>
            </div>
        </div>
    </article>
`;

export const BandsSection = () => `
    <section class="textSection" id="bands">
        <h2>Группа</h2>
        <div id="bandsList"></div>
    </section>
`;

export const InfoSections = () => `
    <section class="textSection" id="about">
        <h2>О проекте</h2>
        <p>
            Над проектом работали студенты группы УГИ-243504
        </p>
        <h3>Участники проекта:</h3>
        <ul class="membersList">
            <li>Бессонова Арина Алексеевна</li>
            <li>Булатова Анастасия Леонидовна</li>
            <li>Дроздач Елизавета Викторовна</li>
            <li>Серебрякова Алёна Дмитриевна</li>
            <li>Смирнова Софья Дмитриевна</li>
        </ul>
        <p>
            Екатеринбург, 2026
        </p>
    </section>
`;

export const CloudsSection = () => `
    <section class="textSection" id="clouds">
        <h2>Облака слов</h2>
        <div>
             <h3>Cмысловые галлюцинации</h3>
            <img src="СГ.png" alt="Облако слов смысловые галлюцинации">
        </div>
        <div>
            <h3>Чичерина</h3>
            <img src="чичерина.png" alt="Облако слов смысловые галлюцинации">
        </div>
    </section>
`;

export const LexicSpecialties = (bands) => `
    <section class="textSection" id="lexicText">
    <h2>Лексические особенности</h2>
    <h3> Морфологический анализ</h3>
    <p>
        Первое, что бросается в глаза при анализе облаков слов - это преобладание имен существительных. Использование существительных в именительном падеже позволяет слушателю сразу понимать ключевые концепты: любовь, небо, жизнь, смерть.
        В облаках слов не представлены глаголы или прилагательные как частотные единицы. Это говорит о том, что для авторов важнее создать статичную «картину мира», обозначить ключевые образы-символы, чем описывать действия или качества.
        Если говорить про списки слов из песен, то кроме существительных, в обеих выборках активно используются местоимения «я», «мы», «ты». Высокая частотность местоимений первого и второго лица создает эффект прямого разговора со слушателем и позволяет легче погрузиться в написанное. 
        Для текстов обеих групп характерно употребление глаголов в настоящем времени - у слушателя создается ощущение, что всё происходит здесь и сейчас. Чичерина часто использует глаголы движения и действия: уходим, иди, улетай, лечу. У «Смысловых галлюцинаций» больше глаголов состояния и размышлений: быть, буду, будет, хочется, боялся, любить. 
    </p>         
    <h3>Тематические группы лексики</h3>
    <p>
        В текстах обеих групп можно выделить несколько устойчивых тематических полей:
        <div>
            <h4>1. Космос и природные образы</h4>
            В обеих выборках часто встречаются слова «небо», «звёзды», «луна», «ветер», «вода», «море». Подобные образы помогают создать ощущение пространства, свободы и эмоциональной глубины.
            У «Смысловых галлюцинаций» природные образы чаще используются для передачи внутреннего состояния человека. Например, небо и море становятся частью размышлений о жизни и одиночестве.
            У «Чичериной» природа воспринимается материально и динамично. Ветер, солнце и земля становятся частью движения и действия.
        </div>
        <div>
        <h4>2. Эмоциональная лексика</h4>
        Самым частотным словом в обеих выборках является «любовь». Это показывает, что тема личных отношений остается центральной для обеих групп. Однако у «Смысловых галлюцинаций» любовь часто соседствует со словами «страх», «слёзы», «смерть». Из-за этого возникает ощущение внутреннего конфликта и тревоги.
        У «Чичериной» любовь связана со словами «сердце», «солнце», «ветер». Такие сочетания делают эмоциональный фон более открытым и экспрессивным.
        </div>
        <div>
        <h4>3. Лексика жизни и смерти</h4>
        В обеих группах важную роль играют слова «жизнь» и «смерть». Это особенно заметно у «Смысловых галлюцинаций», где противопоставление жизни и смерти становится одной из центральных тем.
        Подобная экзистенциальная лексика характерна для русского рока в целом, так как жанр часто обращается к вопросам смысла существования и внутреннего кризиса. 
        </div>
    </p>
    <div class="bands">
            ${bands.map(band => BandCard(band, false, true)).join("")}
        </div>
    </div>
    </section>
`;
