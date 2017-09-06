var express = require('express');
var router = express.Router();
var PollController = require('../controllers/PollController.js');
var helper = require('./helperFunctions');

/*
* Create new poll
*/
router.get('/create', helper.isLoggedIn, PollController.getCreatePage);
router.post('/create', helper.isLoggedIn, PollController.create);
/*
 * GET
 */
router.get('/all', helper.isLoggedIn, PollController.listUserPolls);
router.get('/:uid', PollController.getPoll);
router.post('/:uid', PollController.voteOnPoll);
router.get('/:uid/results', PollController.pollResults);
router.get('/delete/:uid', helper.isLoggedIn, PollController.deletePoll);



/*
 * api
 */
router.get('/get/:uid', PollController.show);
router.get('/', PollController.list);

module.exports = router;
