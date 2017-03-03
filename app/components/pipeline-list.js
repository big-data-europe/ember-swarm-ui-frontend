import Ember from 'ember';

export default Ember.Component.extend({
  editable: true,
  manageButtonText: Ember.computed('editable', function(){
    if(this.get('editable')){
      return "Cancel";
    }
    return "Manage";
  }),
  actions: {
    manage:  function() {
      this.toggleProperty('editable');
    }
  }
});
