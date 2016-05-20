/**
 * Created by tygiacalone on 5/19/16.
 */
var fs = require('fs');
var async = require('async');


function setParents(filename, callback) {
  fs.readFile(filename, 'utf-8', function (err, data) {
    //console.log(data);
    if (err) throw err;

    var lines = data.toString('utf-8').split('\n');
    //console.log(lines);
    callback(null, lines);
  });
}

var Generator = {

  generateSNPSequence: function(length, frequency) {
    var stream = fs.createWriteStream('sequence' + length + '.txt');
    stream.once('open', function (fd) {

      // Write
      for (var i = 0; i < 100; i++) {
        for (var j = 0; j < length; j++) {
          var random = Math.floor(Math.random() * 99) + 1;
          if (random < frequency) {
            stream.write('A');
          } else {
            stream.write('a');
          }
        }
        stream.write('\n');
      }
      stream.end();
    });
  },
  generateRelatedSNPSequence: function (length) {
    var mother = {};
    var father = {};

    var filename = 'sequence' + length + '.txt';

    setParents(filename, function(err, lines) {
      mother.top = lines[0];
      mother.bottom = lines[1];
      father.top = lines[2];
      father.bottom = lines[3];
      //console.log(mother_top, mother_bottom, father_top, father_bottom + '\n');
      setTimeout(function() {

        var random = Math.floor(Math.random() * 99) + 1;
        var stream = fs.createWriteStream('related' + length + '.txt');
        stream.once('open', function (fd) {

          // Write
          for (var i = 0; i < 100; i++) {
            async.series([
              function(cb) {
                for (var j = 0; j < mother.top.length; j++) {
                  var random = Math.floor(Math.random() * 99) + 1;
                  if (random < 50) {
                    stream.write(mother.top[j]);
                  } else {
                    stream.write(mother.bottom[j]);
                  }
                }
                stream.write('\n', function(err) {cb();});
              },
              function(cb) {
                for (var j = 0; j < father.top.length; j++) {
                  var random = Math.floor(Math.random() * 99) + 1;
                  if (random < 50) {
                    stream.write(father.top[j]);
                  } else {
                    stream.write(father.bottom[j]);
                  }
                }
                stream.write('\n', function(err) {cb();});
              }
            ]);
          }
          setTimeout(function(){stream.end();}, 1000);
        });
      }, 500);
    });


  },
  setProbabilityTables: function (p) {
    this.probabilityTableIndependent['AAAA'] = p*p*p*p;
    this.probabilityTableIndependent['AAAa'] = 2*p*p*p*(1-p);
    this.probabilityTableIndependent['AAaA'] = 2*p*p*p*(1-p);
    this.probabilityTableIndependent['AAaa'] = p*p*(1-p)*(1-p);

    this.probabilityTableIndependent['AaAA'] = 2*p*(1-p)*p*p;
    this.probabilityTableIndependent['aAAA'] = 2*p*(1-p)*p*p;
    this.probabilityTableIndependent['AaAa'] = 4*p*(1-p)*p*(1-p);
    this.probabilityTableIndependent['AaaA'] = 4*p*(1-p)*p*(1-p);
    this.probabilityTableIndependent['aAaA'] = 4*p*(1-p)*p*(1-p);
    this.probabilityTableIndependent['aAAa'] = 4*p*(1-p)*p*(1-p);
    this.probabilityTableIndependent['aAaa'] = 2*p*(1-p)*(1-p)*(1-p);
    this.probabilityTableIndependent['Aaaa'] = 2*p*(1-p)*(1-p)*(1-p);

    this.probabilityTableIndependent['aaAA'] = (1-p)*(1-p)*p*p;
    this.probabilityTableIndependent['aaAa'] = 2*(1-p)*(1-p)*p*(1-p);
    this.probabilityTableIndependent['aaaA'] = 2*(1-p)*(1-p)*p*(1-p);
    this.probabilityTableIndependent['aaaa'] = (1-p)*(1-p)*(1-p)*(1-p);

    this.probabilityTableRelated['AAAA'] = p*p*p*p + p*p*p*(1-p) + (0.25)*p*(1-p)*p*(1-p);
    this.probabilityTableRelated['AAAa'] = p*p*p*(1-p) + (0.5)*p*(1-p)*p*(1-p);
    this.probabilityTableRelated['AAaA'] = p*p*p*(1-p) + (0.5)*p*(1-p)*p*(1-p);
    this.probabilityTableRelated['AAaa'] = (0.25)*p*p*(1-p)*(1-p);

    this.probabilityTableRelated['AaAA'] = p*p*p*(1-p) + (0.5)*p*(1-p)*p*(1-p);
    this.probabilityTableRelated['aAAA'] = p*p*p*(1-p) + (0.5)*p*(1-p)*p*(1-p);
    this.probabilityTableRelated['AaAa'] = 3*p*(1-p)*p*(1-p) + p*(1-p)*p*p + p*(1-p)*(1-p)*(1-p);
    this.probabilityTableRelated['aAAa'] = 3*p*(1-p)*p*(1-p) + p*(1-p)*p*p + p*(1-p)*(1-p)*(1-p);
    this.probabilityTableRelated['aAaA'] = 3*p*(1-p)*p*(1-p) + p*(1-p)*p*p + p*(1-p)*(1-p)*(1-p);
    this.probabilityTableRelated['AaaA'] = 3*p*(1-p)*p*(1-p) + p*(1-p)*p*p + p*(1-p)*(1-p)*(1-p);
    this.probabilityTableRelated['Aaaa'] = p*(1-p)*(1-p)*(1-p) + (0.5)*p*(1-p)*(1-p)*p;
    this.probabilityTableRelated['aAaa'] = p*(1-p)*(1-p)*(1-p) + (0.5)*p*(1-p)*(1-p)*p;


    this.probabilityTableRelated['aaAA'] = (0.25)*(1-p)*(1-p)*p*p;
    this.probabilityTableRelated['aaaA'] = (1-p)*(1-p)*p*(1-p) + (0.5)*(1-p)*(1-p)*p*p;
    this.probabilityTableRelated['aaAa'] = (1-p)*(1-p)*p*(1-p) + (0.5)*(1-p)*(1-p)*p*p;
    this.probabilityTableRelated['aaaa'] = (1-p)*(1-p)*(1-p)*(1-p) + p*(1-p)*(1-p)*(1-p) + (0.25)*(1-p)*p*(1-p)*p;
  },
  probabilityTableIndependent: {},
  probabilityTableRelated: {},
};

module.exports = Generator;