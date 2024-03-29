/**
 * Created by shi.pengyan on 2015-10-09.
 */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var HammerTouchEmulator = require('hammer-touchemulator');


var Item = require('./components/Item');
var articles = require('./data');

var {Surface, ListView, Text, Group} = ReactCanvas;

HammerTouchEmulator();

var App = React.createClass({

  render: function () {

    // ListView被下拉时，Text才可以看到，bug？
    var size = this.getSize();
    return (
      <Surface top={0} left={0} width={size.width} height={size.height}>
        <Text style={this.getTextStyle()}>asdfasdf</Text>

        <ListView
          style={this.getListViewStyle()}
          numberOfItemsGetter={this.getNumberOfItems}
          itemHeightGetter={Item.getItemHeight}
          itemGetter={this.renderItem}/>
      </Surface>
    );
  },

  renderItem: function (itemIndex, scrollTop) {
    var article = articles[itemIndex % articles.length];
    return (
      <Item
        width={this.getSize().width}
        height={Item.getItemHeight()}
        imageUrl={article.imageUrl}
        title={article.title}
        itemIndex={itemIndex}/>
    );
  },

  getSize: function () {
    return document.getElementById('main').getBoundingClientRect();
  },


  getTextStyle: function () {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: 20
    };
  },

  // ListView
  // ========

  getListViewStyle: function () {
    return {
      top: 20,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },

  getNumberOfItems: function () {
    return 1000;
  }

});

React.render(<App />, document.getElementById('main'));
