import React, { Component } from "react";
import { Picker, Emoji } from "emoji-mart";

const customEmojis = [
  {
    name: "Octocat",
    short_names: ["octocat"],
    text: "",
    emoticons: [],
    keywords: ["github"],
    imageUrl: "https://assets-cdn.github.com/images/icons/emoji/octocat.png?v7"
  }
];

export default class EmojiWrap extends Component {
  state = {
    selectedEmoji: {}
  };
  onSelectPicker = emoji => {
    this.setState({ selectedEmoji: emoji });
  };
  render() {
    const IS_BROWSER = process.browser;
    return (
      <div>
        {IS_BROWSER && (
          <Picker
            title="pick your emoji"
            set="twitter"
            onSelect={this.onSelectPicker}
            custom={customEmojis}
            color="#ff0000"
            perLine={10}
          />
        )}
        {this.state.selectedEmoji.id && (
          <div>
            <Emoji
              set={"twitter"}
              emoji={this.state.selectedEmoji.colons}
              size={64}
              tooltip
            />
            <h1>{this.state.selectedEmoji.name}</h1>
            <p>{this.state.selectedEmoji.text}</p>
          </div>
        )}
      </div>
    );
  }
}
