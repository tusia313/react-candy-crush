//stała szer planszy
export const width = 8
// tworzymy ścisłą listę naszych cukierków (dzięki 'as const' TS wie, że to stałe wartości, a nie byle jakie stringi)
export const candyColors = [
    '/images/blue-candy.png',
    '/images/green-candy.png',
    '/images/red-candy.png',
    '/images/orange-candy.png',
    '/images/yellow-candy.png',
    '/images/purple-candy.png'
] as const
//Wyciągamy z tej tablicy TYP dla pojedynczego cukierka (plus dodajemy pusty string '' dla pustego pola, kiedy cukierek zniknie)
export type CandyColor = typeof candyColors[number] | ""