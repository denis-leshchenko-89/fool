import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './CardsApp.scss';
import { shuffleArray, ArrayOfObjectsFindSameProperty, minFindValue } from "./Utility/Utility";
import User from './User/User';
import Nav from './Nav/Nav';
import Computer from './Computer/Computer';
import Deck from './Deck/Deck';
import Game from './Game/Game';
import Message from './Message/Message';

class CardsApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      computer: [],
      user: [],
      cards: [],
      trumpCard: {},
      game: [],
      message: "",
      messageWhoseTurn: "Ходит пользователь"
    }
  }

  //Ходит пользователь 1, Ходит коюмпьютер 2
  messageWhoseTurn = "Ходит пользователь";
  message = "";
  whoseTurn = 1;
  game = [];
  computer = [];
  user = [];
  cards = []

  componentDidMount() {
    this.generateCardsDeck();
    this.giveOutCards();
    this.getRandomTrump();
  }


  /* Случайная  карта */
  getRandomCard() {
    if (this.cards.length > 0) {
      let randomNumber = Math.floor(Math.random() * this.cards.length);
      let randomCard = this.cards[randomNumber];
      this.cards.splice(randomNumber, 1);
      return randomCard;
    }
  }

  /* Сгенерировал  колоду  карт */
  generateCardsDeck() {
    let suit = ["heard", "diamonds", "spades", "clubs"];
    let id = 0;
    for (let i = 0; i < suit.length; i++) {
      for (let j = 6; j <= 14; j++) {
        let card = {
          id: 0,
          suit: "",
          rang: null,
          classNameRang: "",
        };
        card.id = id++
        card.suit = suit[i]
        card.rang = j;
        card.classNameRang = j === 11 ? "cardJ" : j === 12 ? "cardQ" : j === 13 ? "cardK" : j === 14 ? "cardA" : "card" + j
        this.cards.push(card);
      }
    }
    shuffleArray(this.cards);
    this.setState({ cards: this.cards });
  }

  /* Раздал карты */
  giveOutCards() {
    for (let index = 0; index < 6; index++) {
      this.user.push(this.getRandomCard());
      this.computer.push(this.getRandomCard());
    }
    this.setState({ user: this.user, computer: this.computer, game: this.game, cards: this.cards });
  }

  /* Добрать карты */
  getTheCard() {
    if (this.cards.length > 0) {
      for (let index = 0; index < 6; index++) {
        if (this.cards.length && this.user.length < 6) {
          let firstCard = this.cards.shift();
          this.user.push(firstCard);
        }
      }
      for (let index = 0; index < 6; index++) {
        if (this.cards.length && this.computer.length < 6) {
          let firstCard = this.cards.shift();
          this.computer.push(firstCard);
        }
      }
    }
  }
  /* Получил козырь */
  getRandomTrump() {
    let trumpCard = this.cards[this.cards.length - 1];
    this.setState({ trumpCard: trumpCard });
  }


  /* Метод отвечает как  будет пользователь ходить */
  handleUser = (index) => {
    /* Ходит пользвователь */
    if (this.whoseTurn === 1) {
      document.querySelector(".take-away").style.display = "block"
      if (this.game.length === 0) {
        this.game.push(this.user[index]);
        let userCard = this.user.splice(index, 1);
        this.setState({ user: this.user, computer: this.computer, game: this.game });
        this.handleComputer(userCard[0]); //Комп думает, чем отбиться
      } 
      else if (this.game.length > 0) {
        let hasRangCardInGame = false;
        this.game.forEach((element) => {
          if (element.rang === this.user[index].rang) {
            hasRangCardInGame = true;
          }
        });
        if (hasRangCardInGame) {
          this.game.push(this.user[index]);
          let userCard = this.user.splice(index, 1);
          this.setState({ user: this.user, computer: this.computer, game: this.game });
          this.handleComputer(userCard[0]);
        }
      }
    }
    /* Пользвователь отбиваеться */
    else {
      /*  Если есть  чем отбиться  то заходим в if . Если нечем отбиваться то отбиваемся козырями else if*/
      if (this.user[index].suit === this.game[this.game.length - 1].suit && this.user[index].rang > this.game[this.game.length - 1].rang) {
        this.game.push(this.user[index]);
        this.user.splice(index, 1);
        this.setState({ user: this.user, computer: this.computer, game: this.game });
        this.whoseTurn = 2;
        this.handleComputer();
      }
      /*  Если не козырем и не могу отбит (то отбиваюсь любым козырем). Если с козыря  то проверяю  ранг   */

      else if ((this.user[index].suit === this.state.trumpCard.suit && this.game[this.game.length - 1].suit === this.state.trumpCard.suit) && this.user[index].rang > this.game[this.game.length - 1].rang) {
        this.game.push(this.user[index]);
        this.user.splice(index, 1);
        this.setState({ user: this.user, computer: this.computer, game: this.game });
        this.whoseTurn = 2;
        this.handleComputer();
      }

      else if (this.user[index].suit === this.state.trumpCard.suit && this.game[this.game.length - 1].suit !== this.state.trumpCard.suit) {
        this.game.push(this.user[index]);
        this.user.splice(index, 1);
        this.setState({ user: this.user, computer: this.computer, game: this.game });
        this.whoseTurn = 2;
        this.handleComputer();
      }
    }

    /*  Если пользователь выграл */
    if (this.state.computer.length > 0 && this.state.cards.length === 0 && this.state.user.length === 0) {
      this.message = "Пользователь выграл"
      this.game = [];
      this.user = [];
      this.computer = [];
      document.querySelector(".take-away").style.display = "none";
      this.setState({ user: this.user, game: this.game, computer: this.computer, message: this.message });
    }
    if (this.state.computer.length === 0 && this.state.cards.length === 0 && this.state.user.length === 0) {
      this.message = "Ничия"
      this.game = [];
      this.user = [];
      this.computer = [];
      document.querySelector(".take-away").style.display = "none";
      this.setState({ user: this.user, game: this.game, computer: this.computer, message: this.message });
    }
  }

  handleComputer(userCard) {
    /*  Ходит компьютер */
    if (this.whoseTurn === 2) {
      document.querySelector(".take-away").style.display = "block";
      if (this.game.length === 0) {
        let randomNumber = Math.floor(Math.random() * this.computer.length);
        let randomCard = this.computer[randomNumber];
        if (randomCard) {
          this.computer.splice(randomNumber, 1);
          this.game.push(randomCard);
        }
        this.setState({ user: this.user, computer: this.computer, game: this.game, messageWhoseTurn: this.messageWhoseTurn });
      }
      /*  Подкидывает компьютер */
      else if (this.game.length > 0) {
        let throwCard = ArrayOfObjectsFindSameProperty(this.computer, this.game, "rang");
        if (throwCard.length > 0) {
          this.game.push(throwCard[0]);
          this.computer = this.computer.filter((element) => {
            return element.id !== throwCard[0].id
          })
          this.setState({ user: this.user, computer: this.computer, game: this.game, messageWhoseTurn: this.messageWhoseTurn });
        }
        /*  Если нечем подкидывать  то  */
        else {
          this.game = [];
          this.whoseTurn = 1;
          this.messageWhoseTurn = "Отбой"
          setTimeout(() => {
            if (this.whoseTurn === 1) {
              this.messageWhoseTurn = "Ходит пользователь";
            }
            else {
              this.messageWhoseTurn = "Ходит комьютер";
            }
            this.setState({ user: this.user, computer: this.computer, game: this.game, messageWhoseTurn: this.messageWhoseTurn });
          }, 1000);
          this.getTheCard();
          this.setState({ user: this.user, computer: this.computer, game: this.game, messageWhoseTurn: this.messageWhoseTurn });
        }
      }
    }
    /* Компьютер отбиваеться */
    else 
    {
      let resulCardArray = [];
      /*  Проверка карт по масти  и по  рангу. Если не пусто массив то выполнять ,если  нет то преходим в else if */
      if (this.computer.filter(computerCard => computerCard.suit === userCard.suit && computerCard.rang > userCard.rang).length > 0) {
        /*  Получаем  карты чем можно отбиться в массив resulCardArray */
        resulCardArray = this.computer.filter((computerCard) => computerCard.suit === userCard.suit && computerCard.rang > userCard.rang);
        /*  Если карт в массив resulCardArray больше одной то выполняем  if  и выбираем наименшую  карту,  которой можно  отбиться */
        if (resulCardArray.length > 1) {
          let minElement = minFindValue(resulCardArray);
          let computerArray = this.computer.filter((element) => {
            return element.id !== minElement.id
          })
          this.game.push(minElement);
          this.computer = [...computerArray]
          this.setState({ computer: this.computer, game: this.game });
        }
        else {
          let computerArray = this.computer.filter((element) => {
            return element.id !== resulCardArray[0].id
          })
          this.game.push(...resulCardArray);
          this.computer = [...computerArray]
          this.setState({ computer: this.computer, game: this.game });
        }
      }
      /*  Если нечем отбиться , то выбираем козыря */
      else if (this.computer.filter(computerCard => computerCard.suit === this.state.trumpCard.suit).length > 0) {
        /*  Если походили  c  козырей то выполняем if   */
        if (userCard.suit === this.state.trumpCard.suit) {
          if (this.computer.filter(computerCard => (computerCard.suit === this.state.trumpCard.suit && computerCard.rang > userCard.rang)).length > 0) {
            resulCardArray = this.computer.filter(computerCard => (computerCard.suit === this.state.trumpCard.suit && computerCard.rang > userCard.rang))
            /*  Если карт в массив resulCardArray больше одной то выполняем  if  и выбираем наименшую  карту,  которой можно  отбиться */
            if (resulCardArray.length > 1) {
              let minElement = this.min(resulCardArray);
              let computerArray = this.computer.filter((element) => {
                return element.id !== minElement.id
              })
              this.game.push(minElement);
              this.computer = [...computerArray]
              this.setState({ computer: this.computer, game: this.game });
            }
            else {
              let computerArray = this.computer.filter((element) => {
                return element.id !== resulCardArray[0].id
              })
              this.game.push(...resulCardArray);
              this.computer = [...computerArray]
              this.setState({ computer: this.computer, game: this.game });
            }
          }
          /*  Если нечем  отбиться  то забираем карты */
          else {
            this.computer = [...this.computer, ...this.game]
            this.messageWhoseTurn = "Компютер забрал карты"
            setTimeout(() => {
              if (this.whoseTurn === 1) {
                this.messageWhoseTurn = "Ходит пользователь";
              }
              else {
                this.messageWhoseTurn = "Ходит комьютер";
              }
              this.setState({ messageWhoseTurn: this.messageWhoseTurn });
            }, 1000);
            this.game = [];
            this.setState({ user: this.user, computer: this.computer, game: this.game, messageWhoseTurn: this.messageWhoseTurn });
            this.getTheCard();
          }
        }
        else {
          resulCardArray = this.computer.filter(computerCard => computerCard.suit === this.state.trumpCard.suit);
          if (resulCardArray.length > 1) {
            let minElement = minFindValue(resulCardArray);
            let computerArray = this.computer.filter((element) => {
              return element.id !== minElement.id
            })
            this.game.push(minElement);
            this.computer = [...computerArray]
            this.setState({ computer: this.computer, game: this.game });
          }
          else {
            let computerArray = this.computer.filter((element) => {
              return element.id !== resulCardArray[0].id
            })
            this.game.push(...resulCardArray);
            this.computer = [...computerArray]
            this.setState({ computer: this.computer, game: this.game });
          }
        }
      }
      /*  Если нечем отбиться то забираем карты */
      else {
        this.computer = [...this.computer, ...this.game]
        this.messageWhoseTurn = "Компютер забрал карты"
        setTimeout(() => {
          if (this.whoseTurn === 1) {
            this.messageWhoseTurn = "Ходит пользователь";
          }
          else {
            this.messageWhoseTurn = "Ходит комьютер";
          }
          this.setState({ user: this.user, computer: this.computer, game: this.game, messageWhoseTurn: this.messageWhoseTurn });
        }, 1000);
        this.game = [];
        this.getTheCard();
        this.setState({ user: this.user, computer: this.computer, game: this.game, messageWhoseTurn: this.messageWhoseTurn });
      }
    }
      /*  Если компьютер выграл */
    if (this.state.user.length > 0 && this.state.cards.length === 0 && this.state.computer.length === 0) {
      this.message = "Компьютер выграл"
      this.game = [];
      this.user = [];
      this.computer = [];
      document.querySelector(".take-away").style.display = "none";
      this.setState({ user: this.user, game: this.game, computer: this.computer, message: this.message });
    }
    if (this.state.computer.length === 0 && this.state.cards.length === 0 && this.state.user.length === 0) {
      this.message = "Ничия"
      this.game = [];
      this.user = [];
      this.computer = [];
      document.querySelector(".take-away").style.display = "none";
      this.setState({ user: this.user, game: this.game, computer: this.computer, message: this.message });
    }
  }

  /* Метод обработки  кнопки отобой , взять карты*/
  handleUserButton = (event) => {
    /* Отбой */
    if (this.whoseTurn === 1) {
      this.game = [];
      this.whoseTurn = 2;
      this.messageWhoseTurn = "Отбой";
      setTimeout(() => {
        if (this.whoseTurn === 1) {
          this.messageWhoseTurn = "Ходит пользователь";
        }
        else {
          this.messageWhoseTurn = "Ходит комьютер";
        }
        this.setState({ messageWhoseTurn: this.messageWhoseTurn });
      }, 1000);
      this.getTheCard();
      this.user = this.user.filter(el => el && el.classNameRang && el.classNameRang.length);
      this.computer = this.computer.filter(el => el && el.classNameRang && el.classNameRang.length);
      this.handleComputer();
      this.setState({ user: this.user, computer: this.computer, game: this.game, message: this.message, messageWhoseTurn: this.messageWhoseTurn });
    }
    /* Взять карты */
    else {
      this.user.push(...this.game);
      this.game = [];
      this.whoseTurn = 2;
      this.messageWhoseTurn = "Вы взяли карты";
      setTimeout(() => {
        if (this.whoseTurn === 1) {
          this.messageWhoseTurn = "Ходит пользователь";
        }
        else {
          this.messageWhoseTurn = "Ходит комьютер";
        }
        this.setState({ user: this.user, computer: this.computer, game: this.game, messageWhoseTurn: this.messageWhoseTurn });
      }, 1000);
      this.setState({ user: this.user, computer: this.computer, game: this.game, message: this.message, messageWhoseTurn: this.messageWhoseTurn });
      this.getTheCard();
      this.handleComputer();
    }
  }

    /* Метод обработки  кнопки новая игра*/
  handleNewGameButton = () => {
    this.game = [];
    this.user = [];
    this.cards = [];
    this.computer = [];
    this.messageWhoseTurn = "Новая игра";
    this.message = "";
    document.querySelector(".take-away").style.display = "none";
    this.whoseTurn = 1;
    this.messageWhoseTurn = "Ходит пользователь";
    this.setState({ user: this.user, computer: this.computer, game: this.game, cards: this.cards, messageWhoseTurn: this.messageWhoseTurn, message: this.message });
    this.generateCardsDeck();
    this.giveOutCards();
    this.getRandomTrump();
  }

  render() {
    return (
      <div className="cards-app">
        <Message message={this.state.message} />
        <Computer computer={this.state.computer} />
        <Game game={this.state.game} />
        <Deck cards={this.state.cards} messageWhoseTurn={this.state.messageWhoseTurn} trumpCard={this.state.trumpCard} />
        <User onClickCard={this.handleUser} onClickButton={this.handleUserButton} user={this.state.user} whoseTurn={this.whoseTurn} />
        <Nav onNewGame={this.handleNewGameButton} />
      </div>
    );
  }
}
export default CardsApp;
