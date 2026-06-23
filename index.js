import { bands } from './corpusData.js';
import { grammarSigns } from './grammarSigns.js';
import {
    Header, CorpusSearch, BandsSection, InfoSections, BandCard, CloudsSection, LexicSpecialties,
    BandCardAll, Logo
} from './UIComponents.js';
import {songsFirst, songsSecond} from "./corpusTexts.js";

const indexContainer = document.getElementById('index');
indexContainer.innerHTML = `
    <div class="pageWrapper">
        ${Header()}
        <div class="page">
            <div class="mainBlock">
                ${Logo()}
                <main class="content">
                    ${CorpusSearch()}
                    <div class="divider"></div>
                    ${CloudsSection()}
                    ${LexicSpecialties(bands)}
                    ${BandsSection()}
                    ${InfoSections()}
                </main>
            </div>
        </div>
    </div>
`;

const filtersToggle = document.getElementById('filtersToggle');
const filtersPanel = document.getElementById('filtersPanel');
const bandFilter = document.getElementById('bandFilter');
const posFilter = document.getElementById('posFilter');
const signsFilter = document.getElementById('signsFilter');
const lemmaInput = document.getElementById('lemmaInput');
const findBtn = document.getElementById('findBtn');
const results = document.getElementById('results');

const bandsList = document.getElementById('bandsList');
let selectedGroupId = 'смысловые-галлюцинации';
const button = document.getElementById('groupButton');
const menu = document.querySelector('.groupMenu');
const options = document.querySelectorAll('.groupOption');



posFilter.addEventListener('change', renderSignsFilter);
button.addEventListener('click', () => {
    menu.classList.toggle('active');
    button.querySelector('.arrow').classList.toggle('rotate');
});

function renderSignsFilter() {
    const selectedPos = posFilter.value;

    if (selectedPos === 'all') {
        signsFilter.innerHTML = '<option value="all">Любые</option>';
        signsFilter.disabled = true;
        return;
    }

    const signs = grammarSigns[selectedPos] || [];

    signsFilter.disabled = signs.length === 0;

    signsFilter.innerHTML = `
    <option value="all">Любые</option>
    ${signs.map(sign => `
        <option value="${sign}">${sign}</option>
    `).join('')}
`;
}

renderSignsFilter();

options.forEach(option => {
    option.addEventListener('click', () => {
        selectedGroupId = option.dataset.group;

        bandFilter.value = selectedGroupId;
        renderSelectedBand();

        menu.classList.remove('active');
        button.querySelector('.arrow').classList.remove('rotate');

        document.getElementById('bands').scrollIntoView({
            behavior: 'smooth'
        });
    });
});


function renderSelectedBand() {
    const selectedBand = bands.find(band => band.id === selectedGroupId) || bands[0];
    bandsList.innerHTML = BandCardAll(selectedBand);
    document.querySelectorAll('.detailsBtn').forEach(button => {
        button.addEventListener('click', () => {
            bandFilter.value = button.dataset.band;
            document.getElementById('corpus').scrollIntoView({ behavior: 'smooth' });
            renderResults();
        });
    });
}

bands.forEach(band => {

    band.words = band.words.map(word => {

        const rawSigns = word['Грамматические признаки'];

        let parsedSigns = [];

        if (
            rawSigns &&
            rawSigns !== '-' &&
            rawSigns !== '—'
        ) {
            parsedSigns = rawSigns
                .split(',')
                .map(sign => sign.trim())
                .filter(Boolean);
        }

        return {
            ...word,
            'Грамматические признаки': parsedSigns
        };
    });

    const option = document.createElement('option');
    option.value = band.id;
    option.textContent = band.name;
    bandFilter.appendChild(option);
});

const partsOfSpeech = [...new Set(bands.flatMap(band => band.words.map(word => word['Часть речи']).filter(Boolean)))].sort();
partsOfSpeech.forEach(pos => {
    const option = document.createElement('option');
    option.value = pos;
    option.textContent = pos;
    posFilter.appendChild(option);
});

filtersToggle.addEventListener('click', () => {
    filtersPanel.classList.toggle('hidden');
});

findBtn.addEventListener('click', renderResults);

bandFilter.value = selectedGroupId;
renderSelectedBand();

// Функция поиска контекстов
function findLinesForWord(bandName, wordForm) {
    let songsData;

    if (bandName === 'all') {
        songsData = { ...songsFirst, ...songsSecond };
    } else if (bandName === 'Чичерина') {
        songsData = songsFirst;
    } else {
        songsData = songsSecond;
    }

    if (!songsData || !wordForm) return [];

    const target = String(wordForm).toLowerCase();
    const result = [];

    for (const songName in songsData) {
        const lines = songsData[songName];
        for (const line of lines) {
            const wordsInLine = line.toLowerCase().match(/[а-яёa-z0-9]+/gi) || [];
            if (wordsInLine.includes(target)) {
                result.push({
                    songName: songName,
                    line: line
                });
            }
        }
    }

    return result;
}


function renderResults() {
    const lemma = lemmaInput.value.trim().toLowerCase();
    const selectedBand = bandFilter.value;
    const selectedPos = posFilter.value;
    const selectedSign = signsFilter.value;

    const sourceBands = selectedBand === 'all'
        ? bands
        : bands.filter(band => band.id === selectedBand);

    const found = sourceBands.flatMap(band =>
        band.words
            .filter(word =>
                !lemma ||
                String(word['Начальная форма']).toLowerCase().includes(lemma) ||
                String(word['Слово']).toLowerCase().includes(lemma)
            )
            .filter(word =>
                selectedPos === 'all' ||
                word['Часть речи'] === selectedPos
            )
            .filter(word => {
                if (selectedSign === 'all') return true;

                const signs = word['Грамматические признаки'];

                if (Array.isArray(signs)) {
                    return signs.includes(selectedSign);
                }

                return String(signs).includes(selectedSign);
            })
            .map(word => {
                const contexts = findLinesForWord(band.name, word['Слово']);
                return {
                    ...word,
                    bandName: band.name,
                    contexts: contexts
                };
            })
    );

    if (!found.length) {
        results.innerHTML = 'ничего не найдено';
        return;
    }

    // НОВАЯ ТАБЛИЦА: порядок столбцов изменен
    results.innerHTML = `
    <table>
        <thead>
            <tr>
                <th>Слово</th>
                <th>Лемма</th>
                <th>Признаки</th>
                <th>Песня</th>
                <th>Контекст</th>
                <th>Частота</th>
            </tr>
        </thead>
        <tbody>
            ${found.slice(0, 10).map(word => {
        const signs = Array.isArray(word['Грамматические признаки'])
            ? word['Грамматические признаки'].join(', ')
            : word['Грамматические признаки'];

        // ПОКАЗЫВАЕМ ВСЕ КОНТЕКСТЫ (а не только первый)
        const contextsHtml = word.contexts && word.contexts.length > 0 
            ? word.contexts.map(ctx => `
                <div class="context-item">
                    <span class="song-name">${ctx.songName}</span>
                    <span class="line-text">${ctx.line}</span>
                </div>
            `).join('')
            : '—';

        return `
                    <tr>
                        <td>${word['Слово'] ?? ''}</td>
                        <td>${word['Начальная форма'] ?? ''}</td>
                        <td>${signs ?? ''}</td>
                        <td>${word.contexts && word.contexts.length > 0 
                            ? word.contexts.map(c => c.songName).join(', ') 
                            : '—'}</td>
                        <td>${contextsHtml}</td>
                        <td>${word['Частота'] ?? ''}</td>
                    </tr>
                `;
    }).join('')}
        </tbody>
    </table>
`;
}
