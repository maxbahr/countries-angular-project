import { Component, OnInit } from '@angular/core';
import { Country } from '../country.interface';
import { CountriesService } from '../countries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'game-flag',
  templateUrl: './game-flag.component.html',
  styleUrls: ['./game-flag.component.css']
})
export class GameFlagComponent implements OnInit {
  countries: Country[];
  country: Country;
  height: number = 150;
  answers: Country[];
  correct: number = 0;
  incorrect: number = 0;
  level: number = 0;
  levelCompleted: boolean = false;
  gameOver: boolean = false;
  youWon: boolean = false;
  numInCorrectAnswers: number = 3;
  numCorrectAnswers: number;
  numLevels: number;
  startGame: boolean = false;
  oldCountryQuestions: Country[] = [];

  constructor(private countriesService: CountriesService, private router: Router) { }

  ngOnInit() {
    this.getCountries();
  }

  getCountries(): void {
    this.countriesService.getCountries()
      .subscribe(countries => {
        this.countries = countries;
        this.prepareTest(this.countries);
      });
  }

  prepareTestAnswers(country: Country, countries: Country[]): void {
    this.answers = [];
    this.answers.push(country);
    for (let i = 0; i < 3; i++) {
      let anotherCountry: Country;
      do {
        anotherCountry = countries[this.getRandomCountryIndex(countries)];
      } while (anotherCountry === country || this.answers.indexOf(anotherCountry) > -1)
      this.answers.push(anotherCountry);
    }
    this.answers = this.shuffleArray(this.answers);
  }

  prepareTest(countries: Country[]) {
    countries = this.sortCountriesByLevel(countries, this.level);
    do {
      const index = this.getRandomCountryIndex(countries);
      this.country = countries[index];
    } while (this.oldCountryQuestions.indexOf(this.country) > -1)
    this.oldCountryQuestions.push(this.country);
    console.log(this.country.name);
    this.prepareTestAnswers(this.country, countries);
  }

  sortCountriesByLevel(countries: Country[], level: number): Country[] {
    return countries.filter(x => {
      if (level == 0) { return x.area > 2000000 }
      else if (level == 1) { return x.area > 1000000 && x.area <= 2000000 }
      else if (level == 2) { return x.area > 500000 && x.area <= 1000000 }
      else if (level == 3) { return x.area > 200000 && x.area <= 500000 }
      else if (level == 4) { return x.area > 100000 && x.area <= 200000 }
      else if (level == 5) { return x.area > 50000 && x.area <= 100000 }
      else if (level == 6) { return x.area > 10000 && x.area <= 50000 }
      else { return x.area <= 10000 }
    })
  }

  getRandomCountryIndex(countries: Country[]): number {
    return this.getRandomInt(0, countries.length - 1)
  }

  getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shuffleArray(unshuffle) {
    return unshuffle
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
  }

  checkAnswer(country: Country): void {
    if (country === this.country) {
      this.correct++;
    } else {
      this.incorrect++;
    }

    if (this.incorrect > this.numInCorrectAnswers) {
      this.gameOver = true;
    } else {
      if (this.correct >= this.numCorrectAnswers) {
        this.level++;
        if (this.level >= this.numLevels) {
          this.youWon = true;
          return;
        } else {
          this.levelCompleted = true;
          setTimeout(() => this.levelCompleted = false, 2500);
        }
        this.correct = 0;
        this.incorrect = 0;
      }
      this.prepareTest(this.countries);
    }
  }

  setDifficulty(arr: number[]): void {
    this.numCorrectAnswers = arr[0];
    this.numLevels = arr[1];
    this.startGame = true;
  }

  restartGame() {
    this.redirectTo('/game');
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

}
