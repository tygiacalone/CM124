/**
 * Created by tygiacalone on 5/19/16.
 */
var Generator = require('./generator');
var async = require('async');
var fs = require('fs');
var big = require('big-decimal');
var math = require('mathjs');

math.config({
  number: 'BigNumber',
  precision: 128
});

function getLines(filename, callback) {
  fs.readFile(filename, 'utf-8', function (err, data) {
    //console.log(data);
    if (err) throw err;

    var lines = data.toString('utf-8').split('\n');
    //console.log(lines);
    callback(null, lines);
  });
}

var Experiment = {
  execute: function() {
    var _this = this;
    var lengths = [10, 50, 100, 250, 500, 1000, 2000];
    var frequency = 0.40;
    var passFrequency = frequency * 100;
    var relStat10 = 0.0;
    var relStat50 = 0.0;
    var relStat100 = 0.0;
    var relStat250 = 0.0;
    var relStat500 = 0.0;
    var relStat1000 = 0.0;
    var relStat2000 = 0.0;

    var indStat10 = 0.0;
    var indStat50 = 0.0;
    var indStat100 = 0.0;
    var indStat250 = 0.0;
    var indStat500 = 0.0;
    var indStat1000 = 0.0;
    var indStat2000 = 0.0;

    Generator.setProbabilityTables(frequency);
    console.log(Generator.probabilityTableRelated);
    console.log(Generator.probabilityTableIndependent);

    console.log('The experiment has begun!');

    async.series([
      function (cb) {
        for (var x in lengths) {
          var length = lengths[x];
          Generator.generateSNPSequence(length, passFrequency);
        }
        setTimeout(function(){
          cb();
        }, 1000);

      },
      function (cb) {
        for (var x in lengths) {
          var length = lengths[x];
          Generator.generateRelatedSNPSequence(length);
        }
        setTimeout(function(){
          cb();
        }, 1000);
      }
    ], function(err){

        var numTrials = 50;
        async.series([
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(10, true, function (val) {
                relStat10 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }

          },
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(50, true, function (val) {
                relStat50 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }
          },
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(100, true, function (val) {
                relStat100 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }
          },
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(250, true, function (val) {
                relStat250 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }
          },
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(500, true, function (val) {
                relStat500 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }
          },
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(1000, true, function (val) {
                relStat1000 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }
          },
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(2000, true, function (val) {
                relStat2000 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }
          },
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(10, false, function (val) {
                indStat10 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }
          },
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(50, false, function (val) {
                indStat50 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }
          },
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(100, false, function (val) {
                indStat100 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }
          },
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(250, false, function (val) {
                indStat250 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }
          },
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(500, false, function (val) {
                indStat500 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }
          },
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(1000, false, function (val) {
                indStat1000 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }
          },
          function (cb) {
            var replies = 0;
            for (var i = 0; i < numTrials; i++) {
              _this.run(2000, false, function (val) {
                indStat2000 += val;
                replies += 1;
                if (replies >= numTrials) {
                  cb();
                }
              });
            }
          },
          function (cb) {
            console.log('starting trials');
            relStat10 /= numTrials;
            relStat50 /= numTrials;
            relStat100 /= numTrials;
            relStat250 /= numTrials;
            relStat500 /= numTrials;
            relStat1000 /= numTrials;
            relStat2000 /= numTrials;

            indStat10 /= numTrials;
            indStat50 /= numTrials;
            indStat100 /= numTrials;
            indStat250 /= numTrials;
            indStat500 /= numTrials;
            indStat1000 /= numTrials;
            indStat2000 /= numTrials;

            cb();
          }], function (err) {
            console.log('rel10, ' + relStat10);
            console.log('rel50, ' + relStat50);
            console.log('rel100, ' + relStat100);
            console.log('rel250, ' + relStat250);
            console.log('rel500, ' + relStat500);
            console.log('rel1000, ' + relStat1000);
            console.log('rel2000, ' + relStat2000);

            console.log('ind10, ' + indStat10);
            console.log('ind50, ' + indStat50);
            console.log('ind100, ' + indStat100);
            console.log('ind250, ' + indStat250);
            console.log('ind500, ' + indStat500);
            console.log('ind1000, ' + indStat1000);
            console.log('ind2000, ' + indStat2000);
        });
    });
  },
  run: function(length, lookingAtRelated, callback) {
    var personA = {};
    var personB = {};
    var filename;

    var related = [];
    var independent = [];
    var independent_total, related_total;

    if (lookingAtRelated) {
      filename = 'related' + length + '.txt';
    } else {
      filename = 'sequence' + length + '.txt';
    }
    //console.log(filename);
    var randomA = Math.floor(Math.random() * 98) + 1;
    var randomB = Math.floor(Math.random() * 98) + 1;

    var sumD = 1.0, sumI = 1.0;

    async.series([
        function (cb) {
          getLines(filename, function (err, lines) {
            personA.top = lines[randomA];
            personA.bottom = lines[randomA + 1];

            personB.top = lines[randomB];
            personB.bottom = lines[randomB + 1];

            independent_total = math.bignumber(1.0);
            related_total = math.bignumber(1.0);

            setTimeout(function(){cb();}, 1000);
          });
        },
        function (cb) {
          var replies = 0;
          for (var i = 0; i < length; i++) {
            function generateStats(variant, callback) {
              callback(Generator.probabilityTableIndependent[variant].toPrecision(20),
                Generator.probabilityTableRelated[variant].toPrecision(20));
            }
            var SNPA = personA.top[i] + personA.bottom[i];
            var SNPB = personB.top[i] + personB.bottom[i];
            var variant = SNPA + SNPB;

            generateStats(variant, function(ind, rel) {
              independent.push(ind);
              related.push(rel);
              replies += 1;
              if (replies >= length) {
                cb();
              }
            });
          }
        },
        function (cb) {
          var replies = 0;
          for (var i = 0; i < length; i++) {
            //if (independent_total[i] === undefined || related_total[i] === undefined)
            //console.log(independent_total);
            //console.log(related_total);
            //console.log(independent[i]);

            function getSum (arr, iter, callback){
              callback(arr[iter]);
            }
            getSum(independent, i, function(val) {
              sumI *= val;
              sumI.toPrecision(20);
              replies += 1;
              //console.log('sumI: ' + sumI);
              if (replies >= (length*2) ) {
                cb();
              }
            });

            getSum(related, i, function(val) {
              sumD *= val;
              sumD.toPrecision(20);
              if (sumD < 5e-224 || sumI < 5e-224) {
                sumD += 1e5;
                sumI += 1e5;
              }
              //console.log('sumD: ' + sumD);
              replies += 1;
              if (replies >= (length*2) ) {
                cb();
              }
            });
            //console.log(sumD);
            /*
            math.multiply(math.bignumber(independent[i]), math.bignumber(independent_total));
            math.multiply(math.bignumber(related[i]), math.bignumber(related_total));
            console.log('related : ' + related_total);
            console.log('independent : ' + independent_total);
            */
          }
        }], function (err, results) {
        //console.log(sumD);
        //console.log(sumI);
        //console.log(results.related + results.independent);
        //console.log('related: ' + related_total);
        //console.log('independent: ' + independent_total);
        //if (lookingAtRelated) {
        //  console.log('LOOKING AT RELATED: \n');
        //  console.log(filename);
        //}
        //else {
        //  console.log('NOT AT RELATED: \n');
        //  console.log(filename);
        //}
        //console.log('D: ' + sumD);
        //console.log('I: ' + sumI + '\n');
        if (sumD >= sumI) {
          //console.log('related is bigger: ' + sumD + ' > ' + sumI);
          callback(1);
        } else {
          //console.log('independent is bigger: ' + sumI + ' > ' + sumD);
          callback(0);
        }
      }
    );
  }
};

module.exports = Experiment;