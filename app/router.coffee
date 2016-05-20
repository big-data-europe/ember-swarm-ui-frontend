`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend
  location: config.locationType


Router.map ->
  @route 'dashboard'
  @route 'repositories', ->
    @route 'show', path: ":repository_id"


`export default Router`
