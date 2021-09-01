/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let ledger= new Map();

    for (let i =0; i <this.words.length; i +=1)
      {let firstWrd = this.words[i];
        let secondWrd = this.words[i+1] || null;

      if (ledger.has(firstWrd)) ledger.get(firstWrd).push(secondWrd);
      else ledger.set(firstWrd, [secondWrd]);
}
  this.ledger = ledger;
}


  /** return random text from chains */

  makeText(numWords = 100) {
    // select a random key
    let firstKey = Array.from(this.ledger.keys());
    let key = MarkovMachine.choice(firstKey);
    let fin = [];

    //create a chain until reaching the end
    while(fin.length < numWords && key !== null){
      fin.push(key);
      key = MarkovMachine.choice(this.ledger(key));
    }
    return fin.join(" ");
    }
}

module.exports= {
  MarkovMachine,
};


