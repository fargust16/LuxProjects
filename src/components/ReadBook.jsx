import React, { Component } from 'react';

import './ReadBook.scss';

export default class ReadBook extends Component {

  componentDidMount() {
    this.setState(fillTheBook());
  }

  render() {
    const {author, title, text} = this.state || [];

    return (
      <main className="read-book other-pages__block">
        <section className="main-header">
          <span className="main-header__text book__title">{ title }</span>
          <br />
          <span className="main-header__text book__author">{ author }</span>
        </section>
        <section className="read-book__content">
          <p>
            { text }
          </p>
        </section>
      </main>
      );
  }
}

var fillTheBook = () => {
  let text = 'The boy`s name was Santiago. Dusk was falling as the boy arrived with his herd at an abandoned church. The roof had fallen in long ago, and an enormous sycamore had grown on the spot where the sacristy had once stood. He decided to spend the night there. He saw to it that all the sheep entered through the ruined gate, and then laid some planks across it to prevent the flock from wandering away during the night. There were no wolves in the region, but once an animal had strayed during the night, and the boy had had to spend the entire next day searching for it. He swept the floor with his jacket and lay down, using the book he had just finished reading as a pillow. He told himself that he would have to start reading thicker books: they lasted longer, and made more comfortable pillows. It was still dark when he awoke, and, looking up, he could see the stars through the half-destroyed roof. wanted to sleep a little longer, he thought. He had had the same dream that night as a week ago, and once again he had awakened before it ended. He arose and, taking up his crook, began to awaken the sheep that still slept. He had noticed that, as soon as he awoke, most of his animals also began to stir. It was as if some mysterious energy bound his life to that of the sheep, with whom he had spent the past two years, leading them through the countryside in search of food and water. "They are so used to me that they know my schedule," he muttered. Thinking about that for a moment, he realized that it could be the other way around: that it was he who had become accustomed to their schedule. But there were certain of them who took a bit longer to awaken. The boy prodded them, one by one, with his crook, calling each by name. He had always believed that the sheep were able to understand what he said. So there were times when he read them parts of his books that had made an impression on him, or when he would tell them of the loneliness or the happiness of a shepherd in the fields. Sometimes he would comment to them on the things he had seen in the villages they passed. But for the past few days he had spoken to them about only one thing: the girl, the daughter of a merchant who lived in the village they would reach in about four days. He had been to the village only once, the year before. The merchant was the proprietor of a dry goods shop, and he always demanded that the sheep be sheared in his presence, so that he would not be cheated. A friend had told the boy about the shop, and he had taken his sheep there.'

  return {
    author: 'Paulo Coelho',
    title: 'The Alchemist',
    text: text
  };
}
