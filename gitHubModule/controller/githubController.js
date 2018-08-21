const GitHub = require('github-api');
const _ = require('lodash');

class githubController {

  constructor () {

  }

  getGithubRepository (req,res) {
    let userName = req.params.userName;
    const gh = new GitHub();
    let user = gh.getUser(userName);
    var reposName = [];
    user.listRepos(function(err, repos) {
      _.forEach(repos, function(repo) {
        reposName.push(repo.name);
      });
      res.send(reposName);
    });
  }

}

module.exports = githubController;
