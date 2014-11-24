// Individual Views //////////////////////////

// Render individual Square view
game.SquareView = Backbone.View.extend({
  className: 'square',
  template: _.template($('#board-template').html()),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },
  events: {
    'keyup .edit' : 'update',
    'dblclick .edit' : 'checkAnswer',
    'click .remove' : 'destroy'
  },
  update: function(){
    this.input = this.$('.edit');
    var value = this.input.val();

    this.model.save({letter: value});
    // this.checkAnswer(this);

    if(this.model.attributes.letter.toUpperCase() === this.model.attributes.solution.toUpperCase() && this.model.attributes.letter !== ""){
        // if checkAnswer highlight is still on, leave it on.
    } else {
      $(this.el).removeClass('highlight');
    }
  },
  checkAnswer: function(){
    // checking updated letter & position
    console.log("Updated letter: ", this.model.attributes.letter);
    console.log("Updated position: ", this.model.attributes.position);
    // checking if guess letter matches solution letter
    if(this.model.attributes.letter.toUpperCase() === this.model.attributes.solution.toUpperCase() && this.model.attributes.letter !== ""){
      console.log("Correct. Letter matches solution: " + this.model.attributes.solution);
      $(this.el).addClass('highlight');
      console.log("to highlight");
      console.log(this);
    } else {
      console.log("Not correct letter. This is letter " + this.model.attributes.letter);
      $(this.el).removeClass('highlight');
    }
  },
  destroy: function(){
    this.model.destroy();
  }
});
// var view = new game.SquareView({model: game.Square});

// Render individual Clue view
game.ClueView = Backbone.View.extend({
  tagName: 'li',
  className: 'editing',
  template: _.template($('#clues-template').html()),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },
  events: {
    'keyup .add-clue li input' : 'update',
    'click .remove' : 'destroy'
  },
  update: function(e){
    if(e.which === 13){
      this.cnumber = this.$('.cnumber')[1].value;
      this.ctext = this.$('.ctext')[1].value;
      this.clength = this.$('.clength')[1].value;
      this.model.save({cnumber: this.cnumber, ctext: this.ctext, clength: this.clength});
      console.log("Clue updated");
      this.save();
    }
    else{
      //nothing
    }
  },
  save: function(){
    console.log('saving...');
    console.log(this);
    this.$el.removeClass('editing');
  },
  destroy: function(){
    this.model.destroy();
  }
});
