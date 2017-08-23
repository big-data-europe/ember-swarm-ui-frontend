import Ember from 'ember';

export default Ember.Component.extend({
  // classNameBindings: ['infoModalBind:info-modal'],
  modalClassNames: ['info-modal'],
  actions: {
    agree: function(){
      this.sendAction(this.get('action'));
    },
    closeDialog: function(){
      this.sendAction('closeDialog');
    }
  }
});
