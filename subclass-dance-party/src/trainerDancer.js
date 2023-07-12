var TrainerDancer = function(top, left, timeBetweenSteps) {
  console.log('second one', top, left, timeBetweenSteps);
  Dancer.call(this, top, left, timeBetweenSteps);
  var trainerImgs = ['trainer1.gif', 'trainer2.gif'];
  var randomTrainer = trainerImgs[Math.floor(Math.random() * 2)];
  this.$node = $(`<img src="../assets/${randomTrainer}" alt="trainer"/>`);
};

TrainerDancer.prototype = Object.create(Dancer.prototype);
TrainerDancer.prototype.constructor = TrainerDancer;

TrainerDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  console.log(this.$node.css('top'));
};