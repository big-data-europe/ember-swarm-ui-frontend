import Ember from 'ember';

export default Ember.Component.extend({
  modalClassNames: Ember.computed('dialogClasses', function() {
    return [this.get('dialogClasses')];
  }),
  actions: {
    agree: function(){
      this.sendAction(this.get('action'));
    },
    closeDialog: function(){
      this.sendAction('closeDialog');
    }
  }
});
