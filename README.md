<<<<<<< HEAD
# 🍬 Candy Crush TS 🍬

Klon popularnej gry logicznej typu "Match-3", zbudowany całkowicie od zera przy użyciu Reacta i TypeScriptu. Projekt skupia się na zarządzaniu złożonym stanem aplikacji, obsłudze zdarzeń Drag & Drop oraz implementacji własnych algorytmów skanujących siatkę.

![Zrzut ekranu z gry](public/images/screen_1.png)

## ✨ Funkcjonalności

Zaimplementowałam w pełni działający "silnik" gry, który obsługuje:
* **Generowanie planszy:** Dynamiczna siatka 8x8 (64 elementy) wypełniona losowymi cukierkami.
* **Mechanika Drag & Drop:** Wykorzystanie natywnego API HTML5 do przeciągania elementów.
* **Walidacja ruchów:** Ograniczenie możliwości zamiany cukierków tylko do bezpośrednich sąsiadów (góra, dół, lewo, prawo).
* **Skanowanie dopasowań:** Algorytmy na bieżąco przeszukujące rzędy i kolumny w celu znalezienia 3 takich samych kolorów.
* **Grawitacja:** Puste przestrzenie po zbitych cukierkach są dynamicznie wypełniane przez elementy spadające z góry, a na samej górze losowane są nowe.
* **Tablica wyników:** Zliczanie punktów na żywo za każdą ułożoną trójkę.

## 🛠️ Technologie

* **React (Hooks):** `useState` (do przechowywania planszy, wyników i trzymanych cukierków) oraz `useEffect` (działający jako główna pętla/silnik gry odświeżający planszę co 100ms).
* **TypeScript:** Silne typowanie stanu, definiowanie własnych typów (`CandyColor`), bezpieczne rzutowanie (`as`) i obsługa typów unijnych (`| null`).
* **CSS:** Wykorzystanie `CSS Grid` do stworzenia responsywnej, idealnie wymierzonej planszy, radzenie sobie z `Box Model` i responsywnym paddingiem.

## 🚀 Jak uruchomić projekt lokalnie

1. Sklonuj to repozytorium na swój dysk.
2. Otwórz terminal w folderze projektu.
3. Zainstaluj zależności:
   ```bash
   npm install
||||||| a687a3e
# react-candy-crush
Having the similar project in JS, now I want to try code it in React and feel the diffrence :) Never enough of logic, of course.
=======
# 🍊 Candy Crush in React  🍊
Having the similar project in JS, now I want to try code it in React and feel the diffrence :) Never enough of logic, of course.

## 🍋 First look 

![first page](./src/images/screen_1.png)

## 🍋 Technologies

+ finally React !

## 🍋 Inspiration
My youtube angel  ♥ Ania Kubow ♥. Love this women, her sense of humor and ability to explain hard code-things in a way that I finally understand. 🏆


***
>>>>>>> 7d8b4456856b2593ac4160f89eb1623ef5c6e655
