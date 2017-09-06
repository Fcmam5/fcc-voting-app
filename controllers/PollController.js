var PollModel = require('../models/PollModel.js');

/**
 * PollController.js
 *
 * @description :: Server-side logic for managing Polls.
 */
module.exports = {

    /**
     * PollController.list()
     */
    list: function (req, res) {
        PollModel.find(function (err, Polls) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Poll.',
                    error: err
                });
            }
            return res.json(Polls);
        });
    },

    /**
     * PollController.show()
     */
    show: function (req, res) {
        var uid = req.params.uid;
        PollModel.findOne({uid: uid}, function (err, Poll) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Poll.',
                    error: err
                });
            }
            if (!Poll) {
                return res.status(404).json({
                    message: 'No such Poll'
                });
            }
            return res.json(Poll);
        });
    },

    /**
     * PollController.getCreatePage()
     */
    getCreatePage: function (req, res) {
      return res.render('polls/create', {title: "Create poll", message: 'hi'});
    },
    /**
     * PollController.create()
     */
    create: function (req, res) {
      var choiceTextSet = req.body.choiceText || [];
      var choices = choiceTextSet.map(function(choice){
        return {
          'choiceText': choice,
        }
      });

      var Poll = new PollModel({
        uid: new Date().getTime(),
  			author : req.user,
  			text : req.body.text,
  			choices : choices
      });

      Poll.save(function (err, Poll) {
          if (err) {
              return res.status(500).json({
                  message: 'Error when creating Poll',
                  error: err
              });
          }
          return res.redirect('/polls/all') // TODO: Change this
      });
    },
    listUserPolls: function (req, res) {
      PollModel.find({author: req.user }, function (err, Polls) {
        if (err) {
          return res.status(500).json({
              message: 'Error when getting Poll',
              error: err
          });
        }
        res.render('polls/my-list', {'title': 'My polls', 'polls': Polls})
      });
    },
    getPoll: function (req, res) {
      var uid = req.params.uid;
      PollModel.findOne({uid: uid}, function (err, Poll) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting Poll',
                error: err
            });
        }
        if (!Poll) {
            return res.redirect('/polls/all');
        }
        return res.render('polls/poll-detail', {'title': Poll.text, 'poll': Poll})
      });
    },
    voteOnPoll: function (req, res) {
      var uid = req.params.uid;
      var vote = req.body.votes;

      PollModel.findOne({uid: uid}, function (err, Poll) {
        if (err) {
          return res.status(500).json({
              message: 'Error when getting Poll',
              error: err
          });
        } else {
          if (vote.indexOf('__new_option__') === 0) {
            console.log("new vote");
            vote = vote.replace('__new_option__','');
            console.log(vote);
            Poll.choices.push({
              'choiceText': vote,
              'votes': 1
            });
          } else {
            Poll.choices[vote].votes++;
          }

          Poll.save(function (err, Poll) {
              if (err) {
                  return res.status(500).json({
                      message: 'Error when updating Poll.',
                      error: err
                  });
              }

              return res.redirect('/polls/' + uid + '/results');
          });
        }
      });
    },
    deletePoll: function (req, res) {
        var uid = req.params.uid;
        PollModel.findOneAndRemove({'uid': uid, 'author': req.user}, function (err, Poll) {
            if (err || !Poll) {
                return res.status(500).json({
                    message: 'Error when deleting the Poll.',
                    error: err
                });
            }
            return res.redirect('/polls/all');
        });
    },
    pollResults: function (req, res) {
      var uid = req.params.uid;
      PollModel.findOne({uid: uid}, function (err, Poll) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting Poll',
                error: err
            });
        }
        if (!Poll) {
            return res.redirect('/polls/all');
        }
        return res.render('polls/result', {
                                            'title': Poll.text,
                                            'poll': Poll,
                                          });
      });
    }
};
